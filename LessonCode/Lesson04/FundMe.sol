// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe{
	//使用mapping记录收款账户
	mapping (address => uint256) public fundersToAcount;
	//
	AggregatorV3Interface internal dataFeed;
	
	//现在收款最低额度
	uint256 constant MINMUM_VALUE = 100 * 10 ** 18;//最少现在100USD
	//目标额度 constant 为常量关键字
	uint256 constant TARGET = 1000 *10 ** 18;//筹集目标为1000USD
	//合约所有权
	address public onwner;
	//时间锁
	uint256 deploymentTimesTamp;
	uint256 lockTime;
	//记录ERC20地址
	address _addressERC20;
	//当前合约是否结束
	bool public isOver = false;

	constructor(uint256 _lockTime) {
		//sepolia测试网 ETH->USD 的地址
        dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
		//获取部署合约地址的人的地址用作身份验证
		onwner = msg.sender;
		//获取当前合约部署时间戳
		deploymentTimesTamp = block.timestamp;
		lockTime = _lockTime;
    }

	//收款函数 这样这个FundMe合约即可实现收款，类似一个钱袋子了
	function fund() external payable{
		require(convertEthToUsd(msg.value) >= MINMUM_VALUE, "Send more ETH");
		require(block.timestamp < deploymentTimesTamp + lockTime,"Timeout");
		//存入mapping，使用账户地址作为key
        fundersToAcount[msg.sender] = msg.value;
	}
	//获取eth->usd的当前价格
	function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore 
        (
            /* uint80 roundId */,
            int256 answer,
            /*uint256 startedAt*/,
            /*uint256 updatedAt*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
		//answer是当前eth对usd的价格
        return answer;
    }

	//转换函数ETH->USD
	function convertEthToUsd(uint256 ethAmount) internal view returns (uint256) {
		//这个类似是查询ETH对USD的汇率 单位是USD
		uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
		//ethAmount * ethPrice 为eth是多少usd的价格
		return ethAmount * ethPrice / (10 ** 8 );
		// ETH / USD 的精度是10^8  ethAmount是单位是wei即10^-18eth
	}

	//修改地址
	function transferOwnerShip(address newAddress) public {
		require(msg.sender == onwner, "Only Owners can do");
		require(block.timestamp < deploymentTimesTamp + lockTime,"Timeout");
		onwner = newAddress;
	}

	//从智能合约中提款
	function getFund() external windowClose{
		require(convertEthToUsd(address(this).balance) >= TARGET , "Target is not reached");
		require(msg.sender == onwner, "Not owner of the contract");
		//转账---transfer写法 如果失败会revert
		//payable(onwner).transfer(address(this).balance);
		//转账---send写法 如果失败不会revert，会返回一个bool状态，可以根据这个状态判断交易是否成功
		//bool success = payable(onwner).send(address(this).balance);
		//转账---call写法 transfer with data return value of function  格式：(bool , result) = address.call{value:value}("传递的数据")
		(bool success, ) = payable(onwner).call{value:address(this).balance}("");
		require(success,"transfer tx failed");
		fundersToAcount[msg.sender] = 0;
		isOver = true;
	}

	//退款函数
	function reFund() external windowClose{
		require(convertEthToUsd(address(this).balance) < TARGET , "Target is reached");
		require(uint256(fundersToAcount[msg.sender]) != 0,"there is not fund for you");
		(bool success,) = payable(msg.sender).call{value:fundersToAcount[msg.sender]}("");
		require(success,"transfer tx failed");
		//把记录中提款的账户 数额清零
		fundersToAcount[msg.sender] = 0;
	}

	//修改器
	modifier windowClose(){
		require(block.timestamp >= deploymentTimesTamp + lockTime,"Timeout");
		_;
	}
	modifier onlyOwner(){
		require(msg.sender == onwner, "Not owner of the contract");
		_;
	}
	//ERC20地址调用
	//当ERC20生产相应的凭证之后需要给ERC20一个方法去更新账户的代币
	function setFundertoAmount (address funder,uint256 amount) external {
		require(msg.sender == _addressERC20,"you do not have permisson to call this function");
		fundersToAcount[funder] = amount;
	}
	function setERC20Address(address _NewERC20Address) public onlyOwner{
		_addressERC20 = _NewERC20Address;
	}

	receive() external payable {
		fund();
	}
	fallback() external payable {
		fund();
	}
}