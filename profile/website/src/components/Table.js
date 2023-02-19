import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import { shortenAddress } from '../utils/shortenAddress';

const Table = ({ transactions }) => {
  // console.log("all transactions received => ", transactions);
  const columns = useMemo(
    () => [
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
    ],
    [],
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={transactions}
      enableRowSelection={false}
      enableColumnOrdering
      enableGlobalFilter={true}
      enableColumnFilterModes
      muiTableHeadRowProps={{
        sx: {
          backgroundColor: '#f5f5f5',
          borderColor: '#3351DB',
        }
      }}
    />
  )
}
export default Table;