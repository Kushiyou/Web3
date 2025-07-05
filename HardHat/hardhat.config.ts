import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
/* import envEnc from "@chainLink/env-enc";
console.log("env_enc", envEnc); */
require("@chainLink/env-enc").config();

const {SEPOLIA_URL,PRIVATE_KEY} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia:{
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY as `string`],
    }
  }
};

export default config;
