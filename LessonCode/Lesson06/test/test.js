const { ethers } = require("hardhat");
const { expect } = require("chai");

describe('测试的合约',()=>{
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async ()=>{
        /*
        测试前会调用，一般用于部署合约之类的
        */
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
        console.log("Deploying constract...");
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment(5);
    });
    it('你自己设置的模块测试名称',async ()=>{
        /*
        执行测试的功能
        */
        const transactionResponse = await simpleStorage.store(7);
        await transactionResponse.wait(1);
        const updatedValue = await simpleStorage.retrieve();
        expect(updatedValue).to.equal('7');
    })
})