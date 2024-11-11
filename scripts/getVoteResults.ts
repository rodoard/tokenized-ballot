import { exit } from "process";
import { formatEther, hexToString } from "viem";

class Proposal {
  name: string;
  votes: number;
  index: number;
  constructor({ name, votes, index }:{name:string, index:number, votes:number}) {
    this.name = name;
    this.votes = votes
    this.index=index
  }  
  display() {
    console.log(`${this.name} ${formatEther(BigInt(this.votes))} vote(s)`)
  }
}
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
  
  for (let i = 1; i <numProposals; i++) {
    const record =await contract.read.proposals([i])
    proposals.push(new Proposal({
      index: i,
      name: hexToString(record[0], {size:32}).trim(),
      votes:record[1]
    }))
  }
  proposals.sort((a, b) => Number(b.votes) - Number(a.votes))
  console.log("\nBallot Results:\n")
  let winners:Proposal[] = []
  let maxVotes = -1;
  for (let i = 0; i < proposals.length; i++) {
    const p = proposals[i]
    p.display()
    if (p.votes > maxVotes) {
      winners = [p]
      maxVotes = p.votes
    } else if (p.votes == maxVotes) {
      winners.push(p)
    }
  }
  console.log("\n")
  if (maxVotes > 0) {
    console.log("Wiinning proposals:\n")
    for (let i = 0; i < winners.length; i++) {
      const p = winners[i]
      p.display()
    }
  } else {
    console.log('No winners.')
  }
}  


export default main