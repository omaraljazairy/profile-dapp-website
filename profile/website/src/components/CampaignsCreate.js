import React, { useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import { Loader } from '.';


const Input = ({ placeholder, name, type, handleChange, value }) => (
    <input 
      placeholder={placeholder}
      name={name} 
      type={type} 
      onChange={(event) => handleChange(event.target.value, name)}
      step="0.0001"
      value={value}
      className="w-full p-2 my-2 text-sm text-blue-600 bg-transparent rounded-sm outline-none white-glassmorphism"
      />
)

const CampaignsCreate = () => {
    const { formData, handleChange, createCampaign, isLoading } = useContext(CampaignContext);

    const handleSubmit = (e) => {
        console.log("submit");
        const { minimumContribution, campaignName} = formData;
        e.preventDefault();

        if(!minimumContribution || !campaignName) return;

        createCampaign();        
    }
    return (
        <div className="flex flex-col items-center justify-between w-full p-4 md:justify-center gradient-bg-footer">
            <div className="flex flex-col items-center justify-center w-full my-4 sm:flex-row">
                <div className='flex flex-col items-center justify-start w-full p-5 sm:w-96 blue-glassmorphism'>
                    <Input placeholder="Campaign Name" name="campaignName" type="text" handleChange={handleChange} />
                    <Input placeholder="Minimum Contribution Amount (ETH)" name="minimumContribution" type="number" handleChange={handleChange} />
                    {isLoading ? (
                        <Loader />
                        ) : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#132c6d]  bg-[#2952e3] rounded-full cursor-pointer"
                        >
                            Create a Campaign
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CampaignsCreate;