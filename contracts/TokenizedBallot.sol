// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface ITokenizedToken {
    function getPastVotes(
        address voter,
        uint256 targetBlockNumber
    ) external view returns (uint256);
}

contract TokenizedBallot {
    ITokenizedToken public tokenizedToken;
    uint256 public targetBlockNumber;
    mapping(address => uint256) votePowerSpent;
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    Proposal[] public proposals;

    constructor(
        bytes32[] memory proposalNames,
        ITokenizedToken _tokenizedToken,
        uint256 _targetBlockNumber
    ) {
        targetBlockNumber = _targetBlockNumber;
        require(
            isPastBlock(targetBlockNumber),
            "block number should be in the past"
        );
        tokenizedToken = _tokenizedToken;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint proposal, uint256 amount) public {
        uint256 votePower = getVotePower(msg.sender);
        require(votePower >= amount, "Not enough vote power");
        proposals[proposal].voteCount += amount;
        votePowerSpent[msg.sender] += amount;
    }

    function vote(uint proposal) external {
        uint256 votePower = getVotePower(msg.sender);
        vote(proposal, votePower);
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

    function getVotePower(address voter) private view returns (uint256) {
        return
            tokenizedToken.getPastVotes(voter, targetBlockNumber) -
            votePowerSpent[voter];
    }

    function isPastBlock(uint blockNumber) public view returns (bool) {
        return blockNumber < block.number;
    }
}
