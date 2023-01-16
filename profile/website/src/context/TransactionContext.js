import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
     const provider = new ethers.providers.Web3Provider(ethereum);
     const signer = provider.getSigner();
     const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

     console.log({
        provider,
        signer,
        transactionContract
     });
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ address: '', amount: '', keyword: '', message: ''});

    const handleChange = (event, name) => {
        console.log("event => ", event, " name => ", name);
        setFormData((prevState) => ({ ...prevState, [name]: event}));
    }

    const isWalletConnected = async () => {
        try {
            if(!ethereum) return alert("Pleas install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
            }
            console.log("accounts => ", accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Pleas install metamask");
            
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    // const sendTransaction = async () => {
    //     try {
    //         if(!ethereum) return alert("Pleas install metamask");


    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        isWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange }}>
            {children}
        </TransactionContext.Provider>
    )
}