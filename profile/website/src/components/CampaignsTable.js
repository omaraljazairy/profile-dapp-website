import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';
import { shortenAddress } from '../utils/shortenAddress';
import { Button, Box, Typography } from '@mui/material';



const CampaignsTable = ({ campaigns, refreshAction, loading }) => {

  const columns = useMemo(
    () => [
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
        header: 'Status',
        accessorKey: 'campaignStatus',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
      },
      {
        header: 'Created',
        accessorKey: 'created_at',
        muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
      },
      {
        header: 'Closed At',
        accessorKey: 'closed_at',
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
      defaultColumn={{
        minSize: 20, //allow columns to get smaller than default
        maxSize: 9001, //allow columns to get larger than default
        size: 30, //make columns wider by default
      }}
      renderDetailPanel={({ row }) => (
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
      )}
    />
  )
}
export default CampaignsTable;