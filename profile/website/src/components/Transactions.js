import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Table } from '.';
// import { MyTest } from '.';


const Transactions = () => {
    const { connectedAccount, transactions } = useContext(TransactionContext);

    return (
            <div className="flex flex-col px-4 py-12 md:p-12">
                {connectedAccount ? (
                    <h3 className="my-2 text-3xl text-center text-blue-600">
                        Latest Transactions.
                    </h3>
                ) : (
                    <h3 className="my-2 text-3xl text-center text-blue-600">
                        Connect your account to see the transactions.
                    </h3>
                )}
                <div>
                        {/* <MyTest transactions={transactions}/> */}
                    <Table transactions={transactions} />
                </div>
            </div>
    );
}

export default Transactions;