import React, { useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import { Card } from '.';
import { DeviceTypeContext } from '../context/DeviceTypeContext';
import { Table } from '.';
import { shortenAddress } from '../utils/shortenAddress';
import { Box, Typography, Button } from '@mui/material';
import { deviceTypes } from '../utils/enums';
import { Input } from '.';


const CampaignsView = () => {
    const { campaignsList, getAllCampaignsList, isTableLoading, handleChange, submitContribution, formData } = useContext(CampaignContext);
    const { deviceType } = useContext(DeviceTypeContext);

    const handleSubmit = (e, campaignAddress) => {
      console.log("submit formData ", formData);
      const { contribution } = formData;
      e.preventDefault();

      if(!contribution || !campaignAddress) return;

      submitContribution(campaignAddress);
    }

    // console.log("campaings list received => ", campaignsList);
    // console.log("isTableLoading received => ", isTableLoading);
    console.log("Device type => ", deviceType);
    // DESKTOP VIEW TABLE
    const columns =  [
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
          header: 'Last Contribution',
          accessorKey: 'lastcontribution_at',
          muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
        },
        {
          header: 'Contributions',
          accessorKey: 'contributersCount',
          muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
        },
        {
          header: 'Closed At',
          accessorKey: 'closed_at',
          muiTableHeadCellProps: { sx: { fontSize: 12, fontWeight: 'bold' } },
        },
      ];
    
      const detailPanel = ({ row }) => (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          <Box>
            <Typography>Campaign Address: {shortenAddress(row.original.address)}</Typography>
            <Typography>Manager: {shortenAddress(row.original.manager)}</Typography>
            <Typography>Minimum Contribution: {row.original.minimumContribution}</Typography>
            <Typography>Total Contributors: {row.original.contributersCount}</Typography>
          </Box>
            <Box>
              <Typography>
                <Input placeholder="Contribution Amount (ETH)" name="contribution" type="number" handleChange={handleChange} />
              </Typography>
              <Typography>
                <Button onClick={(e) => handleSubmit(e, row.original.address)} variant="contained">
                  Contribute
                </Button>
              </Typography>
            </Box>
        </Box>
      )

    const loadComponent = (deviceType === deviceTypes.MOBILE) ? 
      <Card 
        data={campaignsList} 
        refreshAction={getAllCampaignsList}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      /> :
      <Table 
        data={campaignsList}
        refreshAction={getAllCampaignsList}
        loading={isTableLoading}
        columnHeaders={columns}
        detailPanel={detailPanel}
    />
    return (
        <div className="flex flex-col px-4 py-6 md:p-3">
            {loadComponent}
        </div>
      )
}

export default CampaignsView;