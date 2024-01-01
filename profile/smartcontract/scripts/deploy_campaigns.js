// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

// The gas price (in wei)...
  const gasPrice = await waitForGasPriceBelow(hre.ethers.utils.parseUnits('190', 'gwei'));
  const Contract = await hre.ethers.getContractFactory("CampaignFactory");
  const [owner] = await ethers.getSigners();
  const contract = await Contract.deploy({gasPrice});

  await contract.deployed();

  console.log(
    `Contract deployed to ${contract.address}`
  );
}

async function waitForGasPriceBelow(max) {
    console.log('Waiting for gas price below', hre.ethers.utils.formatUnits(max, 'gwei'), 'gwei');
    while (true) {
      const price = await hre.ethers.provider.getGasPrice();
      console.log(new Date().toLocaleString(), 'Gas Price:', hre.ethers.utils.formatUnits(price, 'gwei'), 'gwei');
      if (price.lte(max)) {
        console.log('Good enough!');
        return price;
      }
      await new Promise((resolve) => setTimeout(resolve, 30_000));
    }
  }
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3