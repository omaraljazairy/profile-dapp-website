import abi from './Transactions.json';
import campaignFactory from './CampaignFactory.json';
import campaign from './Campaign.json';

// Transaction smartcontract
export const contractABI = abi.abi;
export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// CampaignsFactory smartcontract
export const campaignFactoryABI = campaignFactory.abi;
export const campaignFactoryAddress = process.env.REACT_APP_CAMPAIGNFACTORY_ADDRESS;

// Campaigns smartcontract
export const campaignABI = campaign.abi;