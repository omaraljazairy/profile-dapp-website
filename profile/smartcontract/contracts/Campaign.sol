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

    function getContractBalance(address contractAddress) public view returns(uint){
        return contractAddress.balance;
    }

}

contract Campaign {
    
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

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address user) {
        minimumContribution = minimum;
        manager = user;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "the amount should be greater than the minimum contribution");

        contributersCount++;
        contributers[msg.sender] = msg.value;
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
    }
    
    function currentContractBalance() public view returns (uint) {
        return address(this).balance;
    }

}