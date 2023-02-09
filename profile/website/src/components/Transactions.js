import React, { useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Table } from '.';


const Transactions = () => {
    const { connectedAccount, transactions } = useContext(TransactionContext);
    console.log("transactions from Transactions => ", transactions);

    return (
        <div className="flex items-center justify-center w-full 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col px-4 py-12 md:p-12">
                {connectedAccount ? (
                    <h3 className="my-2 text-3xl text-center text-blue-600">
                        Latest Transactions from the contract.
                    </h3>
                ) : (
                    <h3 className="my-2 text-3xl text-center text-blue-600">
                        Connect your account to see the transactions.
                    </h3>
                )}
                <div className="flex flex-wrap items-center justify-center mt-10">
                    <Table transactions={transactions} />
                </div>

            </div>
        </div>
    );
}

export default Transactions;