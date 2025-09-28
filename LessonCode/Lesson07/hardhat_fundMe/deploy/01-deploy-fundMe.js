const {networkConfig,developmentChains} = require("../hleper-hardhat-config")
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
    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:['300000000',ethUsdPriceFeedAddress],//
        log:true
    })
} 

module.exports.tags = ["all","fundme"];