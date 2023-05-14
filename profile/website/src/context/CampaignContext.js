import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { campaignFactoryABI, campaignFactoryAddress, campaignABI } from '../utils/constants';

export const CampaignContext = React.createContext();

const { ethereum } = window;
let provider; // init it here because i need to use it in other unctions


const getEthereumContract = () => {
    provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(campaignFactoryAddress, campaignFactoryABI, signer);

     console.log({
        provider,
        signer,
        transactionContract
     });

     return transactionContract;
}


export const CampaignProvider = ({ children }) => {
    const [formData, setFormData] = useState({ minimumContribution: '', campaignName: ''});
    const [connectedAccount, setConnectedAccount] = useState('');
    const [campaignsList, setCampaingsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);


    const isWalletConnected = async () => {
        console.log("isWallerConnected");
        try {
            if(!ethereum) {
                console.log("no ethereum object found");
                return
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
                console.log("connectedAccount ", accounts[0]);
                await getAllCampaignsList();
                // await getCampaignsFromContract();   
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const handleChange = (event, name) => {
        console.log("event = ", event, " name ", name);
        setFormData((prevState) => ({ ...prevState, [name]: event}));
    }

    const createCampaign = async () => {
        console.log("createCampaign with minimumContribution = ", formData.minimumContribution, " name = ", formData.campaignName);
        try{
            setIsLoading(true)
            const contractInstance = getEthereumContract();
            const parsedValue = ethers.utils.parseEther(formData.minimumContribution);
            const createdCampaignAddress = await contractInstance.createCampaign(
                parsedValue,
                formData.campaignName,
                {
                    from: connectedAccount
                }
            );
            console.log("createdCampaignAddress => ", createdCampaignAddress);
            setIsLoading(false)
            // getAllCampaignsList();
            window.location.reload(true);

        } catch (error){
            console.log("Error creating campaign: ", error.message);
            setIsLoading(false);
        }

    }

    const getAllCampaignsList = async () => {
        // get all the campaigns addresses, from the address get the campaign contract instance and
        // store it in the a list.
        try {
            const contractInstance = getEthereumContract();
            const campaignsList = await contractInstance.getDeployedCampaigns();
            console.log("campaignsList = ", campaignsList);
            let campaignsInfo = [];
            if (campaignsList) {
                setIsTableLoading(true);
                for (let i=0; i < campaignsList.length; i++) {
                    console.log("details => ", campaignsList[i]);
                    const details = await getCampaignDetails(campaignsList[i]);
                    campaignsInfo.push(details)
                    console.log("details => ", details);
                }
            }
            setCampaingsList(campaignsInfo);
            console.log("campaignsInfo => ", campaignsInfo);
            setIsTableLoading(false);
        } catch (error) {
            console.log("error: ", error.message);
            setIsTableLoading(false);
        }
    }

    const getCampaignDetails = async (campaignAddress) => {
        // get an instance of the campaign contract.
        console.log("received campaignAddress => ", campaignAddress);
        if (!campaignAddress) {
            return;
        }
        provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(campaignAddress, campaignABI, signer);
    
        console.log("campaign ", campaignAddress," has contract transaction =>", transactionContract);
        const campaignSummary = await transactionContract.getSummary();
        console.log("campaignSummary => ", campaignSummary);
        let created_at = new Date(campaignSummary[6].toNumber() * 1000).toLocaleString();
        let lastcontribution_at = new Date(campaignSummary[7].toNumber() * 1000).toLocaleString();
        let closed_at = new Date(campaignSummary[8].toNumber() * 1000).toLocaleString();

        return {
            address: campaignAddress, 
            minimumContribution: ethers.utils.formatEther(campaignSummary[0]),
            balance: ethers.utils.formatEther(campaignSummary[1]),
            contributersCount: parseInt(campaignSummary[2]),
            manager: campaignSummary[3],
            campaignName: campaignSummary[4],
            campaignStatus: !String(campaignSummary[5]) ? "Closed": "Open",
            created_at: new Date(campaignSummary[6].toNumber() * 1000).toLocaleString(),
            lastcontribution_at: lastcontribution_at > created_at ? lastcontribution_at : "",
            closed_at: closed_at > created_at ? created_at : ""
        }
    }

    useEffect(() => {
        isWalletConnected();
    }, []);

    return (
        <CampaignContext.Provider value={
            { 
                formData, 
                handleChange,
                createCampaign,
                connectedAccount,
                campaignsList,
                isLoading,
                getAllCampaignsList,
                isTableLoading
            }
        }>
            {children}
        </CampaignContext.Provider>
    )
}