// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ITokenizedToken {
    function getPastVotes(
        address voter,
        uint256 targetBlockNumber
    ) external view returns (uint256);
}

contract TokenizedBallot is Ownable {
    ITokenizedToken public tokenizedToken;
    uint256 public targetBlockNumber;
    mapping(address => uint256) votePowerSpent;
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }
    modifier validProposal(uint proposal) {
        require(proposal >0 &&proposal<= proposals.length, "Proposal index out of range");
        _;
    }

    Proposal[] public proposals;
   
    constructor(
        bytes32[] memory proposalNames,
        ITokenizedToken _tokenizedToken
    ) Ownable(msg.sender) {
        tokenizedToken = _tokenizedToken;
        proposals.push(Proposal({
            name:"",
            voteCount:0
        }));
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function setTargetBlockNumber(uint256 _targetBlockNumber) external onlyOwner {
        require(
            isPastBlock(_targetBlockNumber),
            "block number should be in the past"
        );
        targetBlockNumber = _targetBlockNumber;
    }

    function vote(uint proposal, uint256 amount) public validProposal(proposal) {
        uint256 votePower = getVotePower(msg.sender);
        require(votePower >= amount, "Not enough vote power");
        proposals[proposal].voteCount += amount;
        votePowerSpent[msg.sender] += amount;
    }

   function voteAllIn(uint proposal) external validProposal(proposal) {
        uint256 votePower = getVotePower(msg.sender);
        vote(proposal, votePower);
    }

   function proposalName(uint proposal) external view validProposal(proposal) returns(bytes32) {
     return proposals[proposal].name;
    }

   function numProposals() external view  returns(uint ) {
     return proposals.length;
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

    function getVotePower(address voter) public view returns (uint256) {
        return
            tokenizedToken.getPastVotes(voter, targetBlockNumber) -
            votePowerSpent[voter];
    }

    function isPastBlock(uint blockNumber) public view returns (bool) {
        return blockNumber < block.number;
    }
}
