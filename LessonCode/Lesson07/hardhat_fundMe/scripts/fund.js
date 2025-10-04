const { getNamedAccounts, deployments, ethers} = require("hardhat");

async function main() {
    //获取账户
    const deployer = (await getNamedAccounts()).deployer;
    
    //获取合约
    const fundMeAddress = await deployments.get("FundMe")
    const fundMe = await ethers.getContractAt("FundMe",fundMeAddress.address);
    console.log("Its funding...");
    const transactionResponse = await fundMe.fund({value:ethers.parseEther("2")});
    await transactionResponse.wait(1);
    console.log("Funded");
}

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.log(`process is error`, error);
    process.exit(1);
})