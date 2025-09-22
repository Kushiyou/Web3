const { ethers } = require("hardhat");
 
async function main(){
    const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    console.log("Deploying constract...");
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment(5);
    console.log(`Deployed contract to: ${simpleStorage.target}`);
} 

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.log(`process is error`, error);
    process.exit(1);
})