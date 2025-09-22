const { ethers, run } = require("hardhat");
 
async function main(){
    /* -----合约部署------ */
    //部署合约
    const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    console.log("Deploying constract...");
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment(5);
    console.log(`Deployed contract to: ${simpleStorage.target}`);
    //console.log(`Deployed contract to: ${simpleStorage.getAddress()}`);
    /* -----合约验证------ */
    //如果是测试网络就验证合约
    if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        await new Promise(resolve => setTimeout(resolve, 30000)); // 等待30秒
        await verify(simpleStorage.target, []);
    }
    /* -----合约交互------ */
    //与合约交互 simpleStorage是合约部署后的示例对象
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);
    //更新数据
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
} 

async function verify(contractAddress, args){
    console.log("Verifying contract...");
    try{
        await run("verify:verify",{
            address: contractAddress,
            constructorArguments: args,
        });
    }catch(e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already verified!");       
        }else{
            console.log(e);
        }
    }
}

main().then(()=>{
    process.exit(0);
}).catch((error)=>{
    console.log(`process is error`, error);
    process.exit(1);
})