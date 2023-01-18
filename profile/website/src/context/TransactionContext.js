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
     return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem('transactionCount'));

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

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Pleas install metamask");
            const { addressTo, amount, keyword, message} = formData;
            const parsedValue = ethers.utils.parseEther(amount); // convert to GWEI
            const transaction = getEthereumContract();
            await ethereum.request(
                {
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: connectedAccount,
                            to: addressTo,
                            gas: '0x5208', // 21000 GWEI
                            value: parsedValue._hex, // 0.00001
                        }
                    ]
                }
            )

            // add to blockchain
            const transactionHash = await transaction.addToBlockchain(addressTo, parsedValue, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transaction.wait()
            setIsLoading(false);
            console.log(`Finished - ${transactionHash.hash}`);

            const transactionCount = transaction.getTransactionCount();
            setTransactionsCount(transactionCount.toNumber());
            console.log("transactionCount = ", transactionsCount);

        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        isWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}