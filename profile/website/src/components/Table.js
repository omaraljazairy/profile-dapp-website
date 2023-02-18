import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';

const Table = ({ transactions }) => {
  // console.log("all transactions received => ", transactions);
  const columns = useMemo(
    () => [
      {
        header: 'Transaction',
        accessorKey: 'transactionHash',
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