const {deployments,ethers,getNamedAccounts,network} = require("hardhat")
const { expect, assert } = require("chai");
const {developmentChains} = require("../../helper-hardhat-config")

developmentChains.includes(network.name) ? describe.skip :
describe("FundMe", async()=>{
    let fundMe;
    let deployer;
    beforeEach(async ()=>{
        deployer =( await getNamedAccounts() ).deployer;
        console.log("deployer",deployer)
        const fundMeDeployment = await deployments.get("FundMe")
        console.log("fundMeDeployment",fundMeDeployment.address)
        fundMe = await ethers.getContractAt("FundMe",fundMeDeployment.address);
    })
    it("allows people to fund and withdraw", async()=>{
        console.log("--------------",fundMe.fund)
        await fundMe.fund({value:ethers.parseEther("1")});
        await fundMe.getFund();
        console.log(fundMe.address,"fundMe.address");
         
        //const endBanlance = await ethers.provider.getBalance(fundMe.address);
        assert.equal(endBanlance.toString(),"0");
    })
})