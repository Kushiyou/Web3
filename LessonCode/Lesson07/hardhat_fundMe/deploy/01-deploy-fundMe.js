const { network } = require("hardhat");
const {networkConfig,developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../Utils/verify")
/* 
    {getNamedAccounts, deployments} 是从hardhat环境变量her中结构出来的
*/
module.exports = async ({getNamedAccounts, deployments})=>{
    const {deploy, log, get} = deployments;
    const {deployer} = await getNamedAccounts();//获取deployer账户
    const chainId = network.config.chainId;
    //log(networkConfig)//打印所有网络配置
    log("-----------------------------------");
    log(network.name)
    log("-----------------------------------");

    let ethUsdPriceFeedAddress;//保存喂价合约地址
    if(developmentChains.includes(network.name)){
        //获取本地喂价合约的地址
        const ethUsdAggregator = await get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    }else{
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    const args = [300000000000000,ethUsdPriceFeedAddress] //fundMe合约构造函数参数
    //部署FundMe合约
    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:args,//
        log:true,
        waitComfirmations:network.config.blockComfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`);
    if(!developmentChains.includes(network.name) && process.env.ETHSCAN_API_KEY){
        await verify(fundMe.address,args);
    }
} 

module.exports.tags = ["all","fundme"];