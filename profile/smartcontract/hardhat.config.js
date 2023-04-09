require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      allowUnlimitedContractSize: true,
      url: process.env.URL,
      accounts: [process.env.ACCOUNT],
    },
    nft_goerli: {
      url: process.env.ALCHEMY_NFT_URL,
      accounts: [process.env.PK_NFT]
    },
    campaign_goerli: {
      chainId: 5,
      gas: 101349953465,
      allowUnlimitedContractSize: true,
      url: process.env.ALCHEMY_CAMPAIGN_URL,
      accounts: [process.env.ACCOUNT]
    },
    campaign_sepolia: {
      chainId: 11155111,
      gas: 101349953465,
      allowUnlimitedContractSize: true,
      url: process.env.ALCHEMY_CAMPAIGN_URL,
      accounts: [process.env.ACCOUNT_SEPOLIA]
    },
  }
};
