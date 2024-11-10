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
npx hardhat mintToken --contract contractAddressOnSepoloa --voter voterAddressOnSepolia  --mint 10 --network sepolia
npx hardhat getVotingPower --contract contractAddressOnSepoloa --voter voterAddressOnSepolia  --network sepolia
```
