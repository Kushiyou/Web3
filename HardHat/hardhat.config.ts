import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
/* import envEnc from "@chainLink/env-enc";
console.log("env_enc", envEnc); */
require("@chainLink/env-enc").config();
//引入deploy-fundMe任务
/* import "./tasks/deploy-fundMe";
import "./tasks/interact-fundMe"; */
import "./tasks/index"; //引入index.ts文件，自动加载所有任务
import "hardhat-deploy";

const {
  SEPOLIA_URL,
  PRIVATE_KEY,
  PRIVATE_KEY_1
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia:{
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY as `string`,PRIVATE_KEY_1 as `string`],
      chainId:11155111,
    }
  },
  namedAccounts:{
    firstAccount:{
      default:0,
    },
    secondAccount:{
      default:1,
    }
  }
};

export default config;
