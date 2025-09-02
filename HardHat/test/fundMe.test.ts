import { ethers } from "hardhat"
import { assert } from "chai"

describe("test fundMe constract",async ()=>{
    it("test if the owner is first account",async ()=>{
        const [firstAccount] = await ethers.getSigners()
    	const fundMeFactory = await ethers.getContractFactory("FundMe")
        const fundMe = await fundMeFactory.deploy(180)//180是constructor接收的locktime
        await fundMe.waitForDeployment()
    	//需要验证的东西是什么
    	assert.equal((await fundMe.owner()),firstAccount.address)//验证部署人的地址合约和第一个账户地址是否一致
	})
})