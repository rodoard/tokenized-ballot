import { exit } from "process";
import { formatEther, hexToString } from "viem";
import Proposal from "./proposal";

async function main({
  contractAddress,
   hre
}:{hre:any, contractAddress:`0x${string}`}) {
  const viem = hre.viem
  const publicClient = await viem.getPublicClient();
  const contract = await viem.getContractAt("TokenizedBallot",
    contractAddress  
  );
  const numProposals = await contract.read.numProposals()
  const proposals = []
  let longestName = ""
  for (let i = 1; i <numProposals; i++) {
    const record =await contract.read.proposals([i])
    const name = hexToString(record[0], {size:32}).trim()
    proposals.push(new Proposal({
      index: i,
      name: name,
      votes:record[1]
    }))
    if (name.length > longestName.length) {
      longestName = name 
    }
  }
  console.log("\nAvailable proposals with indexes:\n")
  for (let i = 0; i < proposals.length; i++) {
    proposals[i].details(longestName.length)
  }
  console.log("\n")
}  


export default main