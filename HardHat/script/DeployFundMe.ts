const { ethers } = require("hardhat");
//const hre = require("hardhat")

async function main() {
//     const fundMeFactory = await ethers.getContractFactory("FundMe");//传入的文件名字是contract文件夹下的合约的名字
//     console.log("Deploying FundMe contract...");
//     //console.log(ethers);
    
//     // Deploy the contract
//     const fundMe = await fundMeFactory.deploy(300);//这个时候调用fundMe.sol合约的constructor函数
//     await fundMe.waitForDeployment();
//     console.log("FundMe contract deployed to:", await fundMe.getAddress());
//     /* 
//     if(hre.network.chainId = 11155111){
//         //等待五个区块确认
//         await fundMe.deployTransaction().wait(5);
//         console.log("Waiting for 5 blocks confirmation...");
//         //验证sepolia地址
//         await verifyFundMe(fundMe,10) 
//     }else{
//         console.log("verification skipped...")
//     }
//     */
//    //简单的合约交互
//    // init 2 account
//     //ethers.js提供的方法，可以获取配置文件配置的两个account
//     const [firstAccount,secondAccount] = ethers.getSigners()
//     //使用本地的account
//     /* const firstAccount = await ethers.getSigner(0)//获取第一个账户
//     const secondAccount = await ethers.getSigner(1)//获取第二个账户 */

//     //fund contract with first account
//     //语法：合约.fund方法({value:ethers.parseEther("0.5")}) 因为0.5是小数，需要ether来转化
//     const tranxt = await fundMe.fund({value:ethers.parseEther("0.5")})//等待调用fundMe里面的fund函数完成
//     await tranxt.wait();//等待交易完成，已经写入区块

//     //check balance of contract
//     const balanceOfContract = await ethers.provider.getBalance(fundMe.getAddress())//ethers.provider.getBalance(fundMe.target)
//     console.log(`balance of contract is ${balanceOfContract}`)

//     //fund contract with second account 
//     //.connect(secondAccount)用于指明是哪个账户，不写默认第一个
//     const tranxtSecondAccount = await fundMe.connect(secondAccount).fund({value:ethers.parseEther("0.6")})//调用fund
//     await tranxtSecondAccount.wait()//等待入块

//     //check balance of contract
//     const balanceOfContractWithSecondAccount = await ethers.provider.getBalance(fundMe.getAddress())//ethers.provider.getBalance(fundMe.target)
//     console.log(`balance of contract is ${balanceOfContractWithSecondAccount}`)

//     //check mapping fundersToAccount
//     //firstAccount是fundMe里面的mapping结构，查询账户交的钱
//     const firstAccountBalanceInFundMe = await fundMe.fundersToAcount[firstAccount.address]
//     const secondAccountBalanceInFundMe = await fundMe.fundersToAcount[secondAccount.address]
//     console.log(`balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`)
//     console.log(`balance of first account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`)
}
 //if you want to verify the cantract on etherscan,you can use the following function
// async function verifyFundMe(fundMe:any,arg:number){
//     await hre.run("verfy:verify",{
//         address: fundMe.target,
//         constructorArguments:[arg]
//     })
// }

// Execute the main function and handle errors
main().then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying FundMe contract:", error);
        process.exit(1);
    });