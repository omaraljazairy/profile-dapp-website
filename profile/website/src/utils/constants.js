import abi from './Transactions.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
export const contractABI = abi.abi;
export const contractAddress = CONTRACT_ADDRESS;