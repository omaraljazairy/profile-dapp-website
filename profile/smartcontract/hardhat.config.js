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
      accounts: ['8790d43a3d77c0ab384a95878d3e007b2f35029670ca470c511ade3d839d6f4a']
    }
  }
};
