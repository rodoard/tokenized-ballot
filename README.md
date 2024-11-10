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
npx hardhat run scripts/deployTokenizedVote.ts --network sepolia

# voter will own 10 units
npx hardhat mintToken --contract contractAddressOnSepoloa --voter voterAddressOnSepolia  --mint 10 --network sepolia

#but voting power is 0
npx hardhat getVotingPower --contract contractAddressOnSepoloa --voter voterAddressOnSepolia  --network sepolia

#depends on env variable SEPOLIA_PRIVATE_KEY on metamask wallet and SEPOLIA_WALLET_ADDRESS 
#you can create a second address and switch private key and wallet address for different voters
#script implements self delegate
npx hardhat delegateVotingPower --contract contractAddressOnSepoloa  --network sepolia

#voting power should now update
npx hardhat getVotingPower --contract contractAddressOnSepoloa --voter voterAddressOnSepolia  --network sepolia

```
