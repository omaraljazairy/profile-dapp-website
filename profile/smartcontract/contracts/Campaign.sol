// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.9;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool completed;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    uint public contributed;
    mapping(address => uint) contributers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address user) {
        minimumContribution = minimum;
        manager = user;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
        uint newContribution = contributed + msg.value;
        contributed = newContribution;
        contributers[msg.sender] = msg.value;
    }

    function getContribution(address contributer) public view returns(uint) {
        return contributers[contributer];
    }

    function createRequest(string calldata description, uint value, address payable recipient) public restricted {
            Request storage newRequest = requests.push();
            newRequest.description = description;
            newRequest.value = value;
            newRequest.recipient = recipient;
            newRequest.completed = false;
            newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > approversCount / 2);
        require(!request.completed);

        request.recipient.transfer(request.value);
        request.completed = true;
    }
}