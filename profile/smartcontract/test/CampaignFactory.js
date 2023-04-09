const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");
  
  describe("CampaignFactory", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
        console.log("going to deploy contract");
  
      // Contracts are deployed using the first signer/account by default
      const [owner, account1, account2] = await ethers.getSigners();
      console.log("account1 => ", account1.address);
      console.log("account2 => ", account2.address);
      const Contract = await ethers.getContractFactory("CampaignFactory");
      const contract = await Contract.deploy();
    //   console.log("contract instance => ", contract);
  
      return { contract, owner, account1, account2};
    }
    function getTransactionData(transactionBlock) {
        return {
            from: transactionBlock.from,
            to: transactionBlock.to,
            gasPrice: transactionBlock.gasPrice.toNumber()
        }
    }
    describe("Deployment", function () {
      it("Should deploy the CampaignFactory", async function () {
        const { contract, owner } = await deployContract();
        const tranactionBlock = contract.deployTransaction;
        console.log("owner => ", owner.address);
        console.log("transaction => ", getTransactionData(tranactionBlock));
        expect(contract.deployTransaction.hash).to.be.a('string');
      });
    });
    describe("CreateCampaign", function () {
        it("should create a campaign successfully", async function () {
          const { contract, owner } = await deployContract();
          // create a new campaign
          const newCampaignBlock = await contract.createCampaign(1, "temp campaign", {from: owner.address});
          console.log("newCampaignBlock => ", newCampaignBlock);
          // get the deployed campaigns array
          campaigns = await contract.getDeployedCampaigns();
          console.log("campaigns => ", campaigns);

          expect(contract.deployTransaction.hash).to.be.a('string');
          expect(campaigns).to.have.length(1);
        });
        it("get campaign balance by providing the campaign address", async function () {
            const { contract, owner } = await deployContract();
            // create a new campaign
            const newCampaignBlock = await contract.createCampaign(2, "temp campaign", {from: owner.address});
            console.log("newCampaignBlock => ", newCampaignBlock);
            // get the deployed campaigns array
            campaigns = await contract.getDeployedCampaigns();
            console.log("campaigns => ", campaigns);
            campaignAddress = campaigns[0];
            campaignBalance = await contract.getContractBalance(campaignAddress);
            console.log("campaignBalance => ", campaignBalance);

            expect(campaignBalance).to.equal(0);
          });        
      });    
  });

  /**
 * functions: {
    'createCampaign(uint256)': [Function (anonymous)],
    'deployedCampaigns(uint256)': [Function (anonymous)],
    'getDeployedCampaigns()': [Function (anonymous)],
    createCampaign: [Function (anonymous)],
    deployedCampaigns: [Function (anonymous)],
    getDeployedCampaigns: [Function (anonymous)]
  },
 */