require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHSCAN_API_KEY = process.env.ETHSCAN_API_KEY;

module.exports = {
  //solidity: "0.8.28",
  solidity:{
    compilers:[{version:"0.8.28"},{version:"0.8.20"},{version:"0.8.0"}]
  },
  defaultNetwork: "hardhat",
  networks:{
    sepolia:{
      url: SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111,
      blockComfirmations:10,
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId:31337,
    }
  },
  etherscan:{
    apiKey:{
      sepolia: ETHSCAN_API_KEY,
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // 默认情况下，取第一个账户作为 deployer
      1: 0 // 在网络ID为1（主网）时，也取第一个账户作为 deployer
    },
    user: {
      default: 1 // 默认情况下，取第二个账户作为 user
    }
  }
};
