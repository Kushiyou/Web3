import { GasCostPlugin } from "ethers";
import {ethers} from "ethers";
import fs from "fs";
import path from "path";

console.log(ethers);


async function main () {
    //链接到区块链的地址
    const provider = new ethers.JsonRpcProvider("http://0.0.0.0:8545");
    //获取钱包私钥，这里的0x0x需要替换成自己的私钥
    const wallet = new ethers.Wallet("0x0x",provider);
    //读取编译的abi和bin文件
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi','utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin','utf8');
    //创建合约工厂用于部署合约，需要传入abi，bin和钱包信息
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying, please wait...");
    //部署合约并等待返回状态
    //const contract = await contractFactory.deploy();
    //等待合约回执,等待时长为：五个区块确认
    //const transactionReceipt = await contract.waitForDeployment(5);
    //获取这个账户的nonce:这个nonce是这个账户发起的交易数量，唯一值，防止重放攻击
    const nonce = await wallet.getTransactionCount();
    const tx = {
        nonce:nonce,
        gasLimit:1000000,
        gasPrice:2000000000,
        data:"0x" + binary,//合约的二进制数据
        to:null,//to为null表明是在部署合约
        value:0,
        chainId:1337,//区块链的ID
    }
    //发送原生数据，sendTransaction会帮我们签名
    const sendTxResponse = await wallet.sendTransaction(tx);
    //等待2个区块确认
    await sendTxResponse.wait(2);
}

main().then(()=>{
    process.exit(0)
}).catch((error)=>{
    console.error(error);
    process.exit(1);
})