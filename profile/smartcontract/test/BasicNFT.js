const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");
  
  describe("BasicNFT", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
    //   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    //   const ONE_GWEI = 1_000_000_000;
  
    //   const lockedAmount = ONE_GWEI;
    //   const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const Contract = await ethers.getContractFactory("BasicNFT");
      const contract = await Contract.deploy();
  
      return { contract, owner };
    }
  
    describe("Deployment", function () {
      it("Should deploy the Contract", async function () {
        const { contract, owner } = await deployContract();
        console.log("owner => ", owner.address);
        console.log("contract address => ", contract.address);
        // console.log("transaction => ", transaction);
        expect(contract.address);
      });
    });
    describe("mintNFT ", function () {
        it("should return a transaction of the minted nft", async function () {
          const { contract, owner } = await deployContract();
          const receiver = '0xd0Cd56930940855180037C25f819c478a6aAfBbf'
          const tokenURI = "https://fedal.nl/fakenfttoken"
          console.log("owner => ", owner.address);
          console.log("contract => ", contract.address);
          const nftTxn = await contract.mintNFT(receiver, tokenURI);
          await nftTxn.wait();
          console.log("nftTxt => ", nftTxn);
          console.log("nftTxt hash => ", nftTxn.hash);
          expect(nftTxn);
        });
      });
  });