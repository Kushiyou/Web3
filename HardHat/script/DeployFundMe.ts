const { ethers } = require("hardhat");

async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe");//传入的文件名字是contract文件夹下的合约的名字
    console.log("Deploying FundMe contract...");
    //console.log(ethers);
    
    // Deploy the contract
    const fundMe = await fundMeFactory.deploy(10);//这个时候调用fundMe.sol合约的constructor函数
    await fundMe.waitForDeployment();
    console.log("FundMe contract deployed to:", await fundMe.getAddress());
}

// Execute the main function and handle errors
main().then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying FundMe contract:", error);
        process.exit(1);
    });