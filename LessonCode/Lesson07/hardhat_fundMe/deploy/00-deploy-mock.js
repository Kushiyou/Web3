const network = require("hardhat").network;
const {developmentChains,DECIMALS,INITIAL_ANSWER} = require("../hleper-hardhat-config");

module.exports = async ({getNamedAccounts,deployments})=>{
    console.log("Mock deployment script");
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();//获取deployer账户
    const chainId = network.config.chainId;
    if(developmentChains.includes(network.name)){
        //network是全局变量
        log("Local network detected! Deploying mocks...");
        //部署本地喂价合约  
        await deploy("MockV3Aggregator",{
            contract:"MockV3Aggregator",
            from:deployer,  
            log:true,
            args:[DECIMALS,INITIAL_ANSWER]
        })
        log("Mocks deployed!");
        log("----------------------------------------------------");
    }
}

module.exports.tags = ["all","mocks"];