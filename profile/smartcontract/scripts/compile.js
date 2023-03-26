const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

//delete the build if exists
const buildPath = path.resolve("/profile/smartcontract", "artifacts", "contracts", "Campaign.sol");
fs.removeSync(buildPath);

// get and read the source sol file
const campaignPath = path.resolve('/profile/smartcontract', "contracts", "Campaign.sol");
console.log("campaignPath => ", campaignPath);

const source = fs.readFileSync(campaignPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Campaign.sol'
  ];

fs.ensureDirSync(buildPath);

for (let contract in output) {
    console.log("contract => ", contract);
    // console.log("contract data => ", output[contract]);
    fs.outputFileSync(
        path.resolve(buildPath, contract + '.json'),
        JSON.stringify(output[contract])
    );
};
console.log("output => ", output);

