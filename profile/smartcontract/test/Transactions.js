const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");
  
  describe("Transactions", function () {
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
  
      const Transactions = await ethers.getContractFactory("Transactions");
      const transaction = await Transactions.deploy();
  
      return { transaction, owner };
    }
  
    describe("Deployment", function () {
      it("Should deploy the transaction", async function () {
        const { transaction, owner } = await deployContract();
        console.log("owner => ", owner.address);
        // console.log("transaction => ", transaction);
        expect(transaction);
      });
    });
    describe("addToBlockChain ", function () {
        it("should see the getTransactionCount == 1", async function () {
          const { transaction, owner } = await deployContract();
          const receiver = '0xd0Cd56930940855180037C25f819c478a6aAfBbf'
          const amount = 00002
          const message = 'testing message'
          const transactionHash = '0x78b25eee314193ac5b61ec0737ffff1498f399fef07eb3873492cebedb6a3391'
          console.log("owner => ", owner.address);
          const transactionBlock = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
          console.log("transfer transactionBlock=> ", transactionBlock);
          const count = await transaction.getTransactionCount();
          console.log("transactionCount => ", count.toNumber());
          expect(count.toNumber() == 1);
        });
      });
      describe("call the addToBlockChain 3 time and expect the transactionCount to be 3 ", function () {
        it("should see the getTransactionCount == 3", async function () {
          const { transaction, owner } = await deployContract();
          const receiver = '0xd0Cd56930940855180037C25f819c478a6aAfBbf'
          const amount = 00002
          const message = 'testing message'
          const transactionHash = '0x78b25eee314193ac5b61ec0737ffff1498f399fef07eb3873492cebedb6a3391'
          console.log("owner => ", owner.address);
          const transfer1 = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
          const transfer2 = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
          const transfer3 = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
        //   console.log("transfer => ", transfer);
          const count = await transaction.getTransactionCount();
          console.log("transactionCount => ", count.toNumber());
          expect(count.toNumber() == 3);
        });
      });
      describe("make 2 transactions and getAllTransactions", function () {
        it("should see the 2 transactions from getAllTransactions", async function () {
          const { transaction, owner } = await deployContract();
          const receiver = '0xd0Cd56930940855180037C25f819c478a6aAfBbf'
          const amount = 00002
          const message = 'testing message'
          const transactionHash = '0x78b25eee314193ac5b61ec0737ffff1498f399fef07eb3873492cebedb6a3391'
          console.log("owner => ", owner.address);
          const transfer1 = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
          const transfer2 = await transaction.addToBlockchain(receiver, amount, message, transactionHash);
          const count = await transaction.getTransactionCount();
          const allTransactions = await transaction.getAllTransactions();
          console.log("transactionCount => ", count.toNumber());
          console.log("allTransactions => ", allTransactions);
          expect(count.toNumber() == 2);
          expect(allTransactions.length == 2);
        });
      });      
  });