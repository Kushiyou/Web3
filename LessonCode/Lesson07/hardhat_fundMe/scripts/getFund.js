const { getNamedAccounts, deployments, ethers} = require("hardhat");

async function main() {
    const deployer = (await getNamedAccounts()).deployer;
    const fundMeAddress = await deployments.get("FundMe")
    const fundMe = await ethers.getContractAt("FundMe",fundMeAddress.address);
    console.log("Its getting fund..."); 
    const transactionResponse = await fundMe.getFund();
    await transactionResponse.wait(1);
    console.log("getted fund");
}

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.log(`process is error`, error);
    process.exit(1);
})