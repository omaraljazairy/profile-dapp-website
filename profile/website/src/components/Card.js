import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { shortenAddress } from '../utils/shortenAddress';
import { Input } from '.';


const Card = ({data, refreshAction, handleSubmit, handleChange}) => {
    const [campaigns, setCampaigns] = useState(data);

    useEffect(() => {
      setCampaigns(data);
    }, [data]);
    
    return (
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-4 mx-auto sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {campaigns.map((campaign, index) => (
              <div key={index} className="relative group">
                <h2 className="text-2xl font-bold tracking-tight text-blue-900">{campaign.campaignName}</h2>
                <p>Minimum Contribution:
                  <span className="mt-1 text-sm text-blue-500"> {campaign.minimumContribution}</span>
                </p>
                <p>Campaign Address: 
                  <span className="mt-1 text-sm text-blue-500"> {shortenAddress(campaign.address)}</span>
                </p>
                <p>Status: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.campaignStatus}</span>
                </p>
                <p>Balance: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.balance}</span>
                </p>
                <p>Created At: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.created_at}</span>
                </p>
                <p>Last Contributed At: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.lastcontribution_at}</span>
                </p>
                <p>Total Contributors: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.contributersCount}</span>
                </p>
                <p>Manager Address: 
                  <span className="mt-1 text-sm text-blue-500"> {shortenAddress(campaign.manager)}</span>
                </p>
                <p>Closed At: 
                  <span className="mt-1 text-sm text-blue-500"> {campaign.closed_at}</span>
                </p>
                {/* <div> */}
                  <Input placeholder="Contribution Amount (ETH)" name="contribution" type="number" handleChange={handleChange} />
                  <Button onClick={(e) => handleSubmit(e, campaign.address)} variant="contained">
                    Contribute
                  </Button>
                {/* <div> */}
                <hr></hr>
              </div>
              
            ))}
            <div></div>
          <Button onClick={() => refreshAction()} variant="contained">
            Refresh
          </Button>
          </div>
        </div>
      </div>
    )
  }

  export default Card;