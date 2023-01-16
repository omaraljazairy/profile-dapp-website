// https: https://eth-goerli.g.alchemy.com/v2/-0MCa70ck-ESaEb1i-hYDpCMAQwVl0iH
// API: -0MCa70ck-ESaEb1i-hYDpCMAQwVl0iH
// Websocket: wss://eth-goerli.g.alchemy.com/v2/-0MCa70ck-ESaEb1i-hYDpCMAQwVl0iH
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/-0MCa70ck-ESaEb1i-hYDpCMAQwVl0iH',
      accounts: ['5d154997af2a8822a8c05a242673689d0fb146f5b1f73138ecd6894dc50a6909']
    }
  }
};
