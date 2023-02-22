require('dotenv').config();
const ethers = require('ethers');

// alchemy api key
const API_KEY = process.env.ALCHEMY_NFT_APIKEY;
const PRIVATE_KEY = process.env.PK_NFT
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_NFT
// provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY);
console.log("provider => ", provider);
// contract abi
const contract = require("../artifacts/contracts/BasicNFT.sol/BasicNFT.json");
// console.log("contract abi => ", JSON.stringify(contract.abi));
const abi = contract.abi;

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
console.log("signer => ", signer);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
const tokenURI = "https://gateway.pinata.cloud/ipfs/QmUz8BsaeeLit3CAtxegD9LHezvHpdzUKPVkrRLw28UbBL"

const mintNFT = async () => {
    console.log("Minting the NFT")
    let nftTxn = await contractInstance.mintNFT(signer.address, tokenURI);
    await nftTxn.wait();
    console.log(`nft minted => https://goerli.etherscan.io/tx/${nftTxn.hash}`);
}

console.log("going to mint");
mintNFT()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error.message);
    process.exit(1);
});
