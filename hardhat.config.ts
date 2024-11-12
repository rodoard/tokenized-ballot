import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { deployerPrivateKey, providerApiKey, sepoliaAddress } from "./conf";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `${process.env.RPC_ENDPOINT}${providerApiKey}`,
      accounts: [deployerPrivateKey],    }
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.viem.getWalletClients();
  for (const account of accounts) {
    console.log(account.account.address);
  }
});

import deployTokenizedBallot from "./scripts/deployTokenizedBallot"

task("deployTokenizedBallot", "Deploys tokenized ballot")
  .addParam("proposals", "List of proposals")
  .addParam("token", "Tokenized Vote Token address")
  .setAction(async (taskArgs, hre) => {
    const {proposals, token}  = taskArgs
    await deployTokenizedBallot({
      proposals:proposals.split(','), token, hre
  })
  });

import mintTokens from "./scripts/mintTokens"
import { Hex, parseEther } from "viem";
  
task("mintToken", "Mints tokens")
.addParam("contract", "Voting token contract address") 
  .addParam("voter", "Voter address")
  .addParam("mint", "Mint Value")
.setAction(async (taskArgs, hre) => {
  const {contract, voter, mint}  = taskArgs
  await mintTokens({
    contractAddress:contract, hre, voter, mintValue:parseEther(mint.toString())
   })
});

import getVotingPower from "./scripts/getVotingPower"
  
task("getVotingPower", "Gets voter voting power")
.addParam("contract", "Voting token contract address") 
.addParam("voter", "Voter address")
.setAction(async (taskArgs, hre) => {
  const {contract, voter}  = taskArgs
  await getVotingPower({hre,
    voter, contractAddress:contract  
  })
});

import getBlockNumber from "./scripts/getBlockNumber"
  
task("getBlockNumber", "Gets latest block number")
.setAction(async (taskArgs, hre) => {
  const {contract}  = taskArgs
  await getBlockNumber({viem:hre.viem});
});

import getBallotVotingPower from "./scripts/getBallotVotingPower"

task("getBallotVotingPower", "Gets voter available voting power")
.addParam("contract", "Tokenized ballot contract address") 
.addParam("voter", "Voter address")
.setAction(async (taskArgs, hre) => {
  const {contract, voter}  = taskArgs
  await getBallotVotingPower({hre,
    voter, contractAddress:contract  
  })
});

import setTargetBlockNumber from "./scripts/setTargetBlockNumber"
  
task("setBallotTargetBlockNumber", "Sets target block number")
.addParam("contract", "Tokenized ballot contract address") 
.addParam("target", "Target block number")
.setAction(async (taskArgs, hre) => {
  const {contract, target}  = taskArgs
  await setTargetBlockNumber({hre,
    target, contractAddress:contract  
  })
});

import getVoteResults from "./scripts/getVoteResults"
  
task("getVoteResults", "Displays vote results")
  .addParam("contract", "Tokenized ballot contract address")
  .setAction(async (taskArgs, hre) => {
    const { contract, target } = taskArgs
    await getVoteResults({
      hre,
      contractAddress: contract
    })
})

import getProposals from "./scripts/getProposals"
  
task("getProposals", "Displays available proposals")
.addParam("contract", "Tokenized ballot contract address") 
.setAction(async (taskArgs, hre) => {
  const {contract, target}  = taskArgs
  await getProposals({hre,
   contractAddress:contract  
  })
});


import delegateVotingPower from "./scripts/delegateVotingPower"

task("delegateVotingPower", "self delegate voting power")
  .addParam("contract", "Voting token contract address")
  .setAction(async (taskArgs, hre) => {
    const { contract } = taskArgs;
    const delegator = sepoliaAddress as Hex;
    const delegatee = delegator
    const privateKey = `0x${deployerPrivateKey}` as Hex
    await delegateVotingPower({
      hre,
      privateKey,
      delegator,
      delegatee,
      contractAddress: contract
    })
  })
  
 import castVote from "./scripts/castVote";

task("castVote", "self cast  vote")
  .addParam("contract", "Voting token contract address") 
  .addParam("power", "Voting power to consume") 
  .addParam("proposal", "Proposal index") 

.setAction(async (taskArgs, hre) => {
  const { contract, power, proposal } = taskArgs;
  const privateKey = `0x${deployerPrivateKey}` as Hex;
  await castVote({
    hre,
    privateKey,
    votePower: power,
    proposalIndex: proposal,
    contractAddress: contract
  });
});

export default config;
