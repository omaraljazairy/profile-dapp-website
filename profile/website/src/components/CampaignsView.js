import React, { useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import { CampaignsTable } from '.';

const CampaignsView = () => {
    const { campaignsList, getAllCampaignsList, isTableLoading } = useContext(CampaignContext);
    console.log("campaings list received => ", campaignsList);

    return (
        <div className="flex flex-col px-4 py-12 md:p-12">
            <CampaignsTable campaigns={campaignsList} refreshAction={getAllCampaignsList} loading={isTableLoading} />
        </div>
      )
}

export default CampaignsView;