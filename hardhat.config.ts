import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.SEPOLIA_PRIVATE_KEY || "";
const sepoliaAddress = process.env.SEPOLIA_WALLET_ADDRESS

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
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
  .addParam("target", "Target block number")
  .setAction(async (taskArgs, hre) => {
    const {proposals, token, target}  = taskArgs
    await deployTokenizedBallot({
      proposals:proposals.split(','), token, target, hre
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
});

export default config;
