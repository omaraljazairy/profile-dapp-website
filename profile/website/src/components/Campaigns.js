import React from 'react';
import { useParams } from 'react-router-dom';
import { CampaignsCreate } from '.';
import { CampaignsView } from '.';
import { CampaignDetails } from '.';

const Campaigns = () => {
  const props = useParams();
  console.log("Campaigns props ", props);
    return (
      <>
        <CampaignsCreate />
        <CampaignsView />
        <CampaignDetails />
      </>
    );
  };

export default Campaigns;