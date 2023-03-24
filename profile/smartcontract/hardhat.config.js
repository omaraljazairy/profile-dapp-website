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

// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     genache: {
//       url: 'https://192.168.68.110:7545',
//       accounts: ['d59a4b59569bf365f731abba32ff321553c4842590db791b592228b188b81be3']
//     }
//   }
// };


