import { exit } from "process";
import { formatEther } from "viem";

async function main({
  contractAddress,
  voter, hre
}:{hre:any, contractAddress:`0x${string}`, voter:`0x${string}`}) {
  const viem = hre.viem
  const publicClient = await viem.getPublicClient();
  const contract = await viem.getContractAt("TokenizedVote",
    contractAddress  
  );
  const tokens = await contract.read.balanceOf([voter])
  const votes = await contract.read.getVotes([voter]);
    console.log(
        `Account ${voter
        } has ${tokens} with ${formatEther(votes.toString())} units of voting power\n`
    );

}  
export default main