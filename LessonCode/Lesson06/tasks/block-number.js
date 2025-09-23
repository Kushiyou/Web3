const { task } = require("hardhat/config");

task("block-number","Prints the current block number").setAction(
    /* 
        hre: hardhat runtime environment
        taskArrgs:  is an object with the parsed CLI arguments of the task.
    */
    async (taskArrgs,hre)=>{
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number is ${blockNumber}`);
    }
)