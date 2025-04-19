require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apikey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  }

};

