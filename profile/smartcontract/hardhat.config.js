require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.URL,
      accounts: [process.env.ACCOUNT],
    },
    nft_goerli: {
      url: process.env.ALCHEMY_NFT_URL,
      accounts: [process.env.PK_NFT]
    }
  }
};
