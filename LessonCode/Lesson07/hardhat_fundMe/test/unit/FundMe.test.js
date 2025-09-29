const {deployments,ethers,getNamedAccounts} = require("hardhat")
const { expect } = require("chai");

describe("FundMe", async ()=>{
    let fundMe;
    let deployer;
    let MockV3Aggregator;
    beforeEach(async function () {
        //获取部署者
        /* 
            const acconts = await ethers.getSingners();
            deployer = acconts[0];
        */
        deployer = (await getNamedAccounts()).deployer;//获取deployer账户
        
        await deployments.fixture(["all"])//运行所有带有"all"标签的部署脚本

        const fundMeDeployment = await deployments.get("FundMe")//获取已经部署的合约
        const mockV3AggregatorDeployment = await deployments.get("MockV3Aggregator")
        //console.log(fundMeDeployment.address == deployer);
        
        //部署合约
        fundMe = await ethers.getContractAt("FundMe",fundMeDeployment.address);//获取已经部署的合约
        //MockV3Aggregator = await ethers.getContractAt("MockV3Aggregator",mockV3AggregatorDeployment.address);
    })

    describe("constructor",function(){
        // it("get the dataFeed",async function (){
        //     console.log(await fundMe.dataFeed(),"99999");
        // })
        it("test if the datafeed is assigned correctly", async function() {
            //console.log(deployer,"deployer")
            console.log(await fundMe.dataFeed(),"++++++++++++++++++++++++++++")
            // await fundMe.waitForDeployment()
            // assert.equal((await fundMe.dataFeed()), mockV3Aggregator.address)
        })
    })
})

// const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
// const { assert, expect } = require("chai")
// const helpers = require("@nomicfoundation/hardhat-network-helpers")
// const {devlopmentChains} = require("../../helper-hardhat-config")

// describe("test fundme contract", async function() {
//     let fundMe
//     let fundMeSecondAccount
//     let firstAccount
//     let secondAccount
//     let mockV3Aggregator
//     let fundMeDeployment
//     beforeEach(async function() {
//         await deployments.fixture(["all"])
//         firstAccount = (await getNamedAccounts()).deployer
//         fundMeDeployment = await deployments.get("FundMe")
//         mockV3Aggregator = await deployments.get("MockV3Aggregator")
//         fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)//
//         //fundMeSecondAccount = await ethers.getContractAt("FundMe", secondAccount)
//     })
    
//     it("test if the owner is msg.sender", async function() {
//         await fundMe.waitForDeployment()
//         assert.equal((await fundMe.owner()), firstAccount)
//     })

//     it("test if the datafeed is assigned correctly", async function() {
//         console.log(fundMeDeployment.address,firstAccount,"//////")
//         console.log(await fundMe.dataFeed(),"++++++++++++++++++++++++++++")
//         await fundMe.waitForDeployment()
//         assert.equal((await fundMe.dataFeed()), mockV3Aggregator.address)
//     })

//     // fund, getFund, refund
//     // unit test for fund
//     // window open, value greater then minimum value, funder balance
//     // it("window closed, value grater than minimum, fund failed", 
//     //     async function() {
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()
//     //         //value is greater minimum value
//     //         await expect(fundMe.fund({value: ethers.parseEther("0.1")}))
//     //             .to.be.revertedWith("window is closed")
//     //     }
//     // )

//     // it("window open, value is less than minimum, fund failed", 
//     //     async function() {
//     //         await expect(fundMe.fund({value: ethers.parseEther("0.01")}))
//     //             .to.be.revertedWith("Send more ETH")
//     //     }
//     // )

//     // it("Window open, value is greater minimum, fund success", 
//     //     async function() {
//     //         // greater than minimum
//     //         await fundMe.fund({value: ethers.parseEther("0.1")})
//     //         const balance = await fundMe.fundersToAmount(firstAccount)
//     //         await expect(balance).to.equal(ethers.parseEther("0.1"))
//     //     }
//     // )    

//     // // unit test for getFund
//     // // onlyOwner, windowClose, target reached
//     // it("not onwer, window closed, target reached, getFund failed", 
//     //     async function() {
//     //         // make sure the target is reached 
//     //         await fundMe.fund({value: ethers.parseEther("1")})

//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()

//     //         /* await expect(fundMeSecondAccount.getFund())
//     //             .to.be.revertedWith("this function can only be called by owner") */
//     //     }
//     // )

//     // it("window open, target reached, getFund failed", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("1")})
//     //         await expect(fundMe.getFund())
//     //             .to.be.revertedWith("window is not closed")
//     //     }
//     // )

//     // it("window closed, target not reached, getFund failed",
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("0.1")})
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()            
//     //         await expect(fundMe.getFund())
//     //             .to.be.revertedWith("Target is not reached")
//     //     }
//     // )

//     // it("window closed, target reached, getFund success", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("1")})
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()   
//     //         await expect(fundMe.getFund())
//     //             .to.emit(fundMe, "FundWithdrawByOwner")
//     //             .withArgs(ethers.parseEther("1"))
//     //     }
//     // )

//     // // refund
//     // // windowClosed, target not reached, funder has balance
//     // it("window open, target not reached, funder has balance", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("0.1")})
//     //         await expect(fundMe.refund())
//     //             .to.be.revertedWith("window is not closed");
//     //     }
//     // )

//     // it("window closed, target reach, funder has balance", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("1")})
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()  
//     //         await expect(fundMe.refund())
//     //             .to.be.revertedWith("Target is reached");
//     //     }
//     // )

//     // it("window closed, target not reach, funder does not has balance", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("0.1")})
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()  
//     //         /* await expect(fundMeSecondAccount.refund())
//     //             .to.be.revertedWith("there is no fund for you"); */
//     //     }
//     // )

//     // it("window closed, target not reached, funder has balance", 
//     //     async function() {
//     //         await fundMe.fund({value: ethers.parseEther("0.1")})
//     //         // make sure the window is closed
//     //         await helpers.time.increase(200)
//     //         await helpers.mine()  
//     //         await expect(fundMe.refund())
//     //             .to.emit(fundMe, "RefundByFunder")
//     //             .withArgs(firstAccount, ethers.parseEther("0.1"))
//     //     }
//     // )

// })