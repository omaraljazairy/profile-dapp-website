// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.9;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimum, string memory name) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender, name);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }

    function getContractBalance(address contractAddress) public view returns(uint){
        return contractAddress.balance;
    }

}

contract Campaign {

    event FinalizeRequestEvent(
        uint index, 
        address recipient, 
        uint amount,
        uint256 closed_at
    );

    event ContributeEvent(
        address from, 
        uint amount, 
        uint256 timestamp,
        uint totalContributors
    );

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool completed;
    }

    Request[] public requests;

    address public manager;
    uint public minimumContribution;
    uint public contributersCount;
    mapping(address => uint) contributers;
    string public campaignName;
    uint256 lastcontribution_at;
    uint256 created_at;
    uint256 closed_at;
    bool campaignStatus;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address user, string memory name) {
        minimumContribution = minimum;
        manager = user;
        campaignName = name;
        campaignStatus = false;
        created_at = block.timestamp;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "the amount should be greater than the minimum contribution");

        contributersCount++;
        contributers[msg.sender] = msg.value;
        lastcontribution_at = block.timestamp;

        emit ContributeEvent(msg.sender, msg.value, lastcontribution_at, contributersCount);
    }

    function getContribution(address contributer) public view returns(uint) {
        return contributers[contributer];
    }

    function createRequest(string calldata description, uint value, address payable recipient) public restricted {
        // require(value > address(this).balance, "Can't withdraw more than the available balance");
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.completed = false;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.completed);

        request.recipient.transfer(request.value);
        request.completed = true;
        campaignStatus = true;
        closed_at = block.timestamp;

        emit FinalizeRequestEvent(index, request.recipient, request.value, closed_at);
    }
    
    function currentContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getSummary() public view returns (uint, uint, uint, address, string memory, bool, uint256, uint256, uint256) {
        return (
            minimumContribution,
            address(this).balance,
            contributersCount,
            manager,
            campaignName,
            campaignStatus,
            created_at,
            lastcontribution_at,
            closed_at
        );
    }
}