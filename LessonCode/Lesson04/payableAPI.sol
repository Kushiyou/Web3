//SPDX-Lincense-Identifier: MIT
pragma solidity ^0.8.30;

contract FundMe{

	//从智能合约中提款
	function getFund() external {
		//转账---transfer写法 如果失败会revert
		payable(onwner).transfer(address(this).balance);
		
		//转账---send写法 如果失败不会revert，会返回一个bool状态，可以根据这个状态判断交易是否成功
		bool success = payable(onwner).send(address(this).balance);
		
		//转账---call写法 transfer with data return value of function  格式：(bool(transfer的状态), result(是调用函数返回的结果)) = address.call{value:value}("传递的数据")
		(bool success, result) = payable(onwner).call{value:address(this).balance}("");
        //("")后面传入的是ABI编码后的数据，如果是一个函数，那也是目标地址合约所在的合约的函数
		require(success);
	}
}