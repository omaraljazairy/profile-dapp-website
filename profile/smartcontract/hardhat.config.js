require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      allowUnlimitedContractSize: true,
      chainId: 5,
      gas: 101349953465,
      gasLimit: 101349953465,
      url: process.env.GOERLI_API_KEY_URL,
      accounts: [process.env.GOERLI_1_ACCOUNT_PRIVATE_KEY],
    },
    // nft_goerli: {
    //   url: process.env.ALCHEMY_NFT_URL,
    //   accounts: [process.env.PK_NFT]
    // },
    campaign_sepolia: {
      chainId: 11155111,
      gas: 201349953465,
      gasLimit: 101349953463,
      allowUnlimitedContractSize: true,
      url: process.env.SEPOLIA_API_KEY_URL,
      accounts: [process.env.SEPOLIA_1_ACCOUNT_PRIVATE_KEY]
    },
    transaction_sepolia: {
      chainId: 11155111,
      gas: 201349953465,
      gasLimit: 101349953463,
      allowUnlimitedContractSize: true,
      url: process.env.SEPOLIA_TRANSACTIONS_API_KEY_URL,
      accounts: [process.env.SEPOLIA_TRANSACTIONS_ACCOUNT_PRIVATE_KEY]
    },
    localhost_node: {
      chainId: 5777,
      url: 'http://0.0.0.0:8545',
      accounts: ['0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e']
    },
  }
};
