// 1_Transactions_migration.js

const Migrations = artifacts.require("Transactions");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};