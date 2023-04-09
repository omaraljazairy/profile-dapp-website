import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import { shortenAddress } from '../utils/shortenAddress';
import { Button } from '@mui/material';


const CampaignsTable = ({ campaigns, refreshAction, loading }) => {

  const columns = useMemo(
    () => [
      {
        accessorKey: 'address',
        header: 'Campaign Address',
        Cell: ({ cell, row }) => (
          <a href={"https://goerli.etherscan.io/tx/" + cell.getValue()} target="_blank" rel="noreferrer">{shortenAddress(cell.getValue())}</a>
        ),
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
      },
      {
        header: 'Name',
        accessorKey: 'campaignName',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
      },
      {
        header: 'Balance (ETH)',
        accessorKey: 'balance',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },        
      },
      {
        header: 'Total Contributers',
        accessorKey: 'contributersCount',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },        
      },
      {
        header: 'Min Contribution',
        accessorKey: 'minimumContribution',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },        
      },
      {
        header: 'Manager',
        accessorKey: 'manager',
        Cell: ({ cell, row }) => (
          shortenAddress(cell.getValue())
        ),
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
      },      
    ],
    [],
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={campaigns}
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
      enableStickyHeader={true}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => refreshAction()} variant="contained">
          Refresh
        </Button>
      )}
      state={{ isLoading: loading }}
    />
  )
}
export default CampaignsTable;