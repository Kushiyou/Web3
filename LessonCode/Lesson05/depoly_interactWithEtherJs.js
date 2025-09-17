import {ethers} from "ethers";
import fs from "fs";
import path from "path";

console.log(ethers);


async function main () {
    //链接到区块链的地址
    const provider = new ethers.provider.JsonRpcProvider("http://0.0.0.0:8545");
    //获取钱包私钥，这里的0x0x需要替换成自己的私钥
    const wallet = new ethers.Wallet("0x0x",provider);
    //读取编译的abi和bin文件
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi','utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin','utf8');
    //创建合约工厂用于部署合约，需要传入abi，bin和钱包信息
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying, please wait...");
    //部署合约并等待返回状态
    const contract = await contractFactory.deploy();
    //等待合约回执,等待时长为：五个区块确认
    await contract.deploymentTransaction().wait(5);
    //-------------------一下使用ethers.js与合约进行交互-------------------------------
    /* 
        contract:是已经部署的合约
        相当于我们在调用部署合约里面的retrieve方法
     */
    const currentFavoriteNumber = await contract.retrieve();
    //为什么要toString是因为在solidity中的数很大，js是无法处理的需要转成字符串或者使用BigInt处理
    //currentFavoriteNumber就是当前合约中的favoriteNumber

    console.log(currentFavoriteNumber.toString()); //输出为0

    const transactionResponse = await contract.store(7);//调用合约的store方法，传入7
    const transactionReceipt = transactionResponse.wait(1);//等待一个区块确认
    /* 
    transactionResponse:是交易的响应
    transactionReceipt:是交易的回执
    */
    const newFavoriteNumber1 = await contract.retrieve();
    console.log(newFavoriteNumber1.toString()); //输出为7
}

main().then(()=>{
    process.exit(0)
}).catch((error)=>{
    console.error(error);
    process.exit(1);
})