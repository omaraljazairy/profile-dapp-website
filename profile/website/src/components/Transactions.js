import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Table } from '.';
import { shortenAddress } from '../utils/shortenAddress';
import { Box, Typography } from '@mui/material';


const Transactions = () => {
    const { 
        connectedAccount,
        transactions,
        getAllTransactionsFromContract,
        isTableLoading 
    } = useContext(TransactionContext);
    const columns =  [
        {
          accessorKey: 'transactionHash',
          header: 'Transaction',
          Cell: ({ cell, row }) => (
            <a href={"https://goerli.etherscan.io/tx/" + cell.getValue()} target="_blank" rel="noreferrer">{shortenAddress(cell.getValue())}</a>
          ),
        },
        {
          header: 'From',
          accessorKey: 'addressFrom',
        },
        {
          header: 'To',
          accessorKey: 'addressTo',
        },
        {
          header: 'Message',
          accessorKey: 'message',
        },
        {
          header: 'Amount (ETH)',
          accessorKey: 'amount',
        },
        {
          header: 'Sent',
          accessorKey: 'timestamp',
        },      
      ]
    const detailPanel = ({ row }) => (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          <Typography>Campaign Address: {shortenAddress(row.original.address)}</Typography>
          <Typography>Manager: {shortenAddress(row.original.manager)}</Typography>
          <Typography>Minimum Contribution: {row.original.minimumContribution}</Typography>
          <Typography>Last Contribution at: {row.original.lastcontribution_at}</Typography>
          <Typography>Total Contributors: {row.original.contributersCount}</Typography>
        </Box>
      )

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
                    <Table 
                        data={transactions}
                        columnHeaders={columns}
                        refreshAction={getAllTransactionsFromContract}
                        loading={isTableLoading} 
                    />
                </div>
            </div>
    );
}

export default Transactions;