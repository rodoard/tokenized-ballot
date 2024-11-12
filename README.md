# Tokenized Ballot

Explore tokenized ballot where voters need to own
voting tokens in order to have voting power.  Ballot
only considers votes made up to a specific point 
in the past.  

Two contracts are provided TokenizedBallot and VotingToken

With scripts under scripts directory to interact with 
ballot and voting token on a test network

Try running some of the following tasks:

```shell
//install dependencies
yarn install 

#deploy tokenized voting token
npx hardhat run scripts/deployTokenizedVote.ts --network sepolia

# voter will own 10 units
npx hardhat mintToken --contract contractAddressOnSepolia --voter voterAddressOnSepolia  --mint 10 --network sepolia

#but voting power is 0
npx hardhat getVotingPower --contract contractAddressOnSepolia --voter voterAddressOnSepolia  --network sepolia

#depends on env variable SEPOLIA_PRIVATE_KEY on metamask wallet and SEPOLIA_WALLET_ADDRESS 
#you can create a second address and switch private key and wallet address for different voters
#script implements self delegate
npx hardhat delegateVotingPower --contract contractAddressOnSepolia  --network sepolia

#voting power should now update
npx hardhat getVotingPower --contract contractAddressOnSepolia --voter voterAddressOnSepolia  --network sepolia

#deploy tokenized ballot
npx hardhat deployTokenizedBallot --proposals commaSeparatedListOfStrings like  "Apple, Banana, Chocolate, Pumpkin"  --token tokenizedVoteTokenAddressOnSepolia  --network sepolia

#get available ballot voting power formatted in ether units should be 0 so far
npx hardhat getBallotVotingPower --contract ballotContractAddressOnSepolia --voter voterAddressOnSepolia  --network sepolia

#gets latest block number on chain
npx hardhat getBlockNumber  --network sepolia

#set ballot target block number 
npx hardhat setBallotTargetBlockNumber --contract ballotContractAddressOnSepolia  --target targetBlockNumberOnSepolia  --network sepolia 

#get available ballot voting power should not be 0 
npx hardhat getBallotVotingPower --contract ballotContractAddressOnSepolia --voter voterAddressOnSepolia  --network sepolia

#get available ballot voting power should be less 
npx hardhat getBallotVotingPower --contract ballotContractAddressOnSepolia --voter voterAddressOnSepolia  --network sepolia

#display available proposals
npx hardhat getProposals --contract ballotContractAddressOnSepolia --network sepolia

#display vote results no winners since votes not yet cast
npx hardhat getVoteResults --contract ballotContractAddressOnSepolia --network sepolia

#self castVote 
npx hardhat castVote --contract ballotContractAddressOnSepolia --proposal proposalIndex --power votingPowerToConsume  --network sepolia

#display vote results
npx hardhat getVoteResults --contract ballotContractAddressOnSepolia --network sepolia
```
