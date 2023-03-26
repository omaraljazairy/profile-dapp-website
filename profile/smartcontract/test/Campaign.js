const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");
  
  describe("Campaign", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
        console.log("going to deploy contract");
  
      // Contracts are deployed using the first signer/account by default
      const [owner, account1, account2] = await ethers.getSigners();
      console.log("account1 => ", account1.address);
      console.log("account2 => ", account2.address);
      const Contract = await ethers.getContractFactory("Campaign");
      const contract = await Contract.deploy(1, owner.address);
    //   console.log("contract instance => ", campaign.deployTransaction.hash);
  
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
      it("Should deploy the Campaign", async function () {
        const { contract, owner } = await deployContract();
        console.log("owner => ", owner.address);
        // console.log("transaction => ", campaign);
        expect(contract.deployTransaction.hash).to.be.a('string');
      });
    });
    describe("contribute ", function () {
      it("contributer should have a record, contributersCount should increase.", async function () {
          const { contract, owner } = await deployContract();
          const manager = await contract.manager();
          const amount = 2
          console.log("owner => ", owner.address);
          console.log("contract instance => ", contract.deployTransaction.hash);
          const transactionBlock = await contract.contribute({value: amount});
          console.log("transfer transactionBlock=> ", getTransactionData(transactionBlock));
          const count = await contract.contributersCount();
          const contribution = await contract.getContribution(owner.address);
          console.log("contributers Count => ", count);
          console.log("contribution => ", contribution);
          console.log("manager => ", manager);
          expect(count.toNumber()).to.equal(1);
          expect(contribution.toNumber()).to.equal(2);
          expect(manager).to.equal(owner.address);
      });
      it("use different accounts to contribute.", async function () {
          const { contract, owner, account1, account2 } = await deployContract();
          const amount = 3;
          const amount2 = 5;
          const contributer = account1.address;
          console.log("owner => ", contributer);
          console.log("contract instance => ", contract.deployTransaction.hash);
          const transactionBlock = await contract.connect(account1).contribute(
              {
                value: amount,
                from: contributer
              }
          );
          const transactionBlock2 = await contract.connect(account2).contribute(
            {
              value: amount2,
              from: account2.address
            }
          );
          console.log("transfer transactionBlock => ", getTransactionData(transactionBlock));
          console.log("transfer transactionBlock2 => ", getTransactionData(transactionBlock2));          
          const count = await contract.contributersCount();
          const contribution = await contract.getContribution(contributer);
          const contribution2 = await contract.getContribution(account2.address);
          const not_contributor = await contract.getContribution(owner.address);
          console.log("approvers Count => ", count);
          console.log("contribution => ", contribution);
          console.log("contribution2 => ", contribution2);
          console.log("not contributer => ", not_contributor);
          expect(count.toNumber()).to.equal(2);
          expect(contribution.toNumber()).to.equal(3);
          expect(contribution2.toNumber()).to.equal(5);
          expect(not_contributor.toNumber()).to.equal(0);
      });      
    });
    describe("createRequest ", function () {
        it("request created value < contributedAmount.", async function () {
            const { contract, owner, account1 } = await deployContract();
            const receiver = account1.address;
            const value = 2;
            const contributeAmount = 5;
            const description = "send to foo";
            console.log("contract instance created => ", contract.deployTransaction.hash);
            const contributeBlock = await contract.contribute({value: contributeAmount});
            console.log("transfer contributeBlock=> ", getTransactionData(contributeBlock));
            const transactionBlock = await contract.createRequest(description, value, receiver);
            console.log("transfer transactionBlock=> ", getTransactionData(transactionBlock));
            const requests = await contract.requests(0);
            console.log("requests => ", requests);
            expect(requests.value).to.equal(2);
        });
        it("request created value > contributedAmount error.", async function () {
            const { contract, owner, account1 } = await deployContract();
            const receiver = account1.address;
            const value = 5;
            const contributeAmount = 2;
            const description = "send to foo";
            console.log("contract instance created => ", contract.deployTransaction.hash);
            const contributeBlock = await contract.contribute({value: contributeAmount});
            console.log("transfer contributeBlock=> ", getTransactionData(contributeBlock));
            try{
                const transactionBlock = await contract.createRequest(description, value, receiver);
                console.log("transfer transactionBlock=> ", getTransactionData(transactionBlock));    
            } catch (error) {
                console.log("error => ", error.message);
                expect(error.message).to.be.a('string');
            }
        });        
    });
    describe("finalize", function () {
        it("create a request and finalize it. expect receiver to get the money", async function () {
            const { contract, owner, account1, account2 } = await deployContract();
            const contributer1 = account1.address;
            const receiver = account2.address;
            const amount = 4;
            console.log("contributer1 => ", contributer1);
            console.log("contributer2 => ", receiver);
            console.log("contract instance => ", contract.deployTransaction.hash);
            const transactionBlock1 = await contract.contribute(
                {
                  value: 2,
                  from: owner.address
                }
            );
            const transactionBlock2 = await contract.connect(account1).contribute(
                {
                  value: 3,
                  from: contributer1
                }
            );
            console.log("transfer transactionBlock1 => ", getTransactionData(transactionBlock1));
            console.log("transfer transactionBlock2 => ", getTransactionData(transactionBlock2));

            const requestBlock = await contract.createRequest("request 1", amount, receiver);
            console.log("transfer requestBlock => ", getTransactionData(requestBlock));

            const request = await contract.requests(0);
            const contributersCount = await contract.contributersCount();
            console.log("request 0 => ", request);
            console.log("contributersCount => ", contributersCount);
            receiveralanceBefore = await ethers.provider.getBalance(receiver); //9999999918244950532690
            console.log("receiveralanceBefore => ", ethers.utils.formatEther(receiveralanceBefore));

            const finalizeBlock = await contract.finalizeRequest(0);
            console.log("finalizeBlock => ", getTransactionData(finalizeBlock));

            receiveralanceAfter = await ethers.provider.getBalance(receiver); //9999999918244950532690
            console.log("receiveralanceAfter => ", ethers.utils.formatEther(receiveralanceAfter));

            const isReceived = (ethers.utils.formatEther(receiveralanceAfter) > ethers.utils.formatEther(receiveralanceBefore));
            console.log("isReceived => ", isReceived);

            const finalRequest = await contract.requests(0);
            console.log("request 0 after finalize => ", finalRequest);

            expect(contributersCount.toNumber()).to.equal(2);
            expect(finalRequest.completed).to.equal(true);
            expect(isReceived).to.equal(true);
        });
    });
    describe("getCampaignBalance", function () {
        it("contribute to the campaign and expect the balance to be 5", async function () {
            const { contract, owner, account1, account2 } = await deployContract();
            const contributer1 = account1.address;
            const contributer2 = account2.address;
            const transactionBlock1 = await contract.connect(account1).contribute(
                {
                  value: 2,
                  from: contributer1
                }
            );
            const transactionBlock2 = await contract.connect(account2).contribute(
                {
                  value: 3,
                  from: contributer2
                }
            );
            console.log("transfer transactionBlock1 => ", getTransactionData(transactionBlock1));
            console.log("transfer transactionBlock2 => ", getTransactionData(transactionBlock2));

            const campaignBalance = await contract.currentContractBalance();
            console.log("campaignBalance => ", campaignBalance);

            expect(campaignBalance.toNumber()).to.equal(5);
        });
    });
});

/**
 * functions: {
    'approveRequest(uint256)': [Function (anonymous)],
    'approvers(address)': [Function (anonymous)],
    'approversCount()': [Function (anonymous)],
    'contribute()': [Function (anonymous)],
    'contributed()': [Function (anonymous)],
    'createRequest(string,uint256,address)': [Function (anonymous)],
    'finalizeRequest(uint256)': [Function (anonymous)],
    'getContribution(address)': [Function (anonymous)],
    'manager()': [Function (anonymous)],
    'minimumContribution()': [Function (anonymous)],
    'requests(uint256)': [Function (anonymous)],
    approveRequest: [Function (anonymous)],
    approvers: [Function (anonymous)],
    approversCount: [Function (anonymous)],
    contribute: [Function (anonymous)],
    contributed: [Function (anonymous)],
    createRequest: [Function (anonymous)],
    finalizeRequest: [Function (anonymous)],
    getContribution: [Function (anonymous)],
    manager: [Function (anonymous)],
    minimumContribution: [Function (anonymous)],
    requests: [Function (anonymous)]
  },
  transfer transactionBlock=>  {
  hash: '0xf7bc2dc5cc8166a9838a08c3119b75359d25665f244aa4516cc043041cd8ea35',
  type: 2,
  accessList: [],
  blockHash: '0x73f4d4301dbd8c0ba868e2b47323e6ff2959ad2238fbda719384fe2ecda4f4c5',
  blockNumber: 5,
  transactionIndex: 0,
  confirmations: 1,
  from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  gasPrice: BigNumber { value: "1528671604" },
  maxPriorityFeePerGas: BigNumber { value: "1000000000" },
  maxFeePerGas: BigNumber { value: "2057343208" },
  gasLimit: BigNumber { value: "29021272" },
  to: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  value: BigNumber { value: "3" },
  nonce: 0,
  data: '0xd7bb99ba',
  r: '0x4b3cf9899a0821587f1984f93ec3ac65818c6db81863d41ce0b18863f5a3f2a8',
  s: '0x25c2143ece30ba2c027808a5b5dd51821b444535b4344a25daa436857489282d',
  v: 0,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
 */