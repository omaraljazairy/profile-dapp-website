import React, { useEffect, useState } from 'react';
import { shortenAddress } from '../utils/shortenAddress';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;
let provider; // init it here because i need to use it in other unctions

const getEthereumContract = () => {
    provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    //  console.log({
    //     provider,
    //     signer,
    //     transactionContract
    //  });

     return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState(0);

    const handleChange = (event, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: event}));
    }

    const getAccountInfo = async (account) => {
        // get the network name from the provider and set it.
        getEthereumContract();
        let network = await provider.getNetwork();
        setNetwork(network.name);
        const balance = await provider.getBalance(account);
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(balanceInEth);
    }

    const getAllTransactionsFromContract = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask into your browser");
            const contractInstance = getEthereumContract();
            const availableTransactions = await contractInstance.getAllTransactions();
            const structeredTransactions = availableTransactions.map((transaction) => (
                {
                    transactionHash: shortenAddress(transaction.transactionHash),
                    addressTo: transaction.receiver,
                    addressFrom: transaction.from,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }
            ));
            setTransactions(structeredTransactions);
        }catch(error){
            console.error(error.message);
        }
    }

    const isWalletConnected = async () => {
        try {
            if(!ethereum) return alert("Pleas install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
                getAllTransactionsFromContract();
                getAccountInfo(accounts[0]);
            }
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
            getAccountInfo(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const updateTranactionsCount = async () => {
        const contractInstance = getEthereumContract();
        try {
            const count = await contractInstance.getTransactionCount();
            // set the transactions count and store them in the local storage
            setTransactionsCount(count.toNumber());
            window.localStorage.setItem("transactionCount", count);  
            
        }catch(error){
            console.error(error.message);
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Pleas install metamask");
            const { addressTo, amount, message} = formData;
            const parsedValue = ethers.utils.parseEther(amount); // convert to GWEI
            const transaction = getEthereumContract();
            const transactionHash = await ethereum.request(
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

            setIsLoading(true);
            // console.log("transactionHash of sendTransaction => ", transactionHash);
            // add to blockchain
            const transactionBlock = await transaction.addToBlockchain(addressTo, parsedValue, message, transactionHash);
            // console.log(`Loading - ${transactionBlock.hash}`);
            await transactionBlock.wait();
            updateTranactionsCount();
            getAllTransactionsFromContract();
            setIsLoading(false);
            getAccountInfo(connectedAccount);
            // console.log(`Finished - ${transactionBlock.hash}`);

        } catch(error) {
            console.error(error);
            setIsLoading(false);
            alert(error.message);
        }
    }


    useEffect(() => {
        isWalletConnected();
        if(ethereum) {
            ethereum.on('accountsChanged', function (accounts) {
                // Time to reload your interface with accounts[0]!
                setConnectedAccount(accounts[0]);
                getAccountInfo(accounts[0]);
              });
        }
        
    }, []);

    return (
        <TransactionContext.Provider value={
            { 
                connectWallet, 
                connectedAccount, 
                formData, 
                handleChange, 
                sendTransaction, 
                transactionsCount, 
                isLoading,
                transactions,
                balance,
                network
            }
        }>
            {children}
        </TransactionContext.Provider>
    )
}