import React, {useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { shortenAddress } from '../utils/shortenAddress';

import { Loader } from '.';

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-grey-400 text-sm font-light text-white';

const Input = ({ placeholder, name, type, handleChange, value }) => (
    <input 
      placeholder={placeholder}
      name={name} 
      type={type} 
      onChange={(event) => handleChange(event.target.value, name)}
      step="0.0001"
      value={value}
      className="w-full p-2 my-2 text-sm text-white bg-transparent border-none rounded-sm outline-none white-glassmorphism"
      />
)

const Home = () => {
    const { connectWallet, connectedAccount, formData, handleChange, sendTransaction, transactionsCount, isLoading } = useContext(TransactionContext);
    console.log("connectedAccount from context => ", connectedAccount); 
    // const connectWallet = () => {
    //     console.log("Connect to Wallet");
    // }

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message} = formData;
        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    return (
        <div className='flex items-center justify-center w-full gradient-bg-home'>
            <div className='flex flex-col items-start justify-between px-4 py-12 md:flex-row md:p-20'>
                <div className='flex flex-col justify-start flex-1 md:mr-10'>
                    <h1 className='py-1 text-3xl sm:text-5xl text-red text-gradient'>
                        Send Ether 
                    </h1>
                    <p className='w-11/12 mt-5 text-base font-light text-left text-white md:w-9/12'>
                        The Crypto World. Buy & Sell Ether.
                    </p>
                    {!connectedAccount &&
                        <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-green"
                        >
                        <p className='text-base font-semibold text-white'>Connect Wallet</p>
                        </button>
                    }

                    <div className='grid grid-cols-2 mt-10 sm:grid-cols-3'>
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                        <div className={commonStyles}>Low fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-start flex-1 w-full mt-10 md:mt-0'>
                    <div className='flex-col items-start justify-end w-full h-40 p-3 my-5 rounded-xl sm:w-72 eth-card white-glassmorphism'>
                        <div className='flex flex-col justify-between w-full h-full'>
                            <div className='flex items-start justify-between'>
                                <div className='flex items-center justify-center w-10 h-10 border-2 border-white rounded-full'>
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff"/>
                            </div>
                            <div>
                                <p className='text-sm font-light text-white'>{shortenAddress(connectedAccount)}</p>
                                <p className='mt-1 text-lg font-semibold text-white'>Ethereum</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-start w-full p-5 sm:w-96 blue-glassmorphism'>
                        <Input placeholder="Address" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className='h-[1px] w-full bg-gray-400 my-2' />

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send Now

                            </button>
                        )}
                        <div>
                            <h2 className="font-bold text-yellow-200">Total Transactions: {transactionsCount ? transactionsCount : 0}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;