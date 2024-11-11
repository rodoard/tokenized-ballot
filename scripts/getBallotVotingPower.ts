import { formatEther } from "viem";

async function main({
  contractAddress,
  voter, hre
}:{hre:any, contractAddress:`0x${string}`, voter:`0x${string}`}) {
  const viem = hre.viem
  const contract = await viem.getContractAt("TokenizedBallot",
    contractAddress  
  );
  const votingPower = await contract.read.getVotePower([voter]);
  const blockNo = await contract.read.targetBlockNumber()

    console.log(
        `Account ${voter
        } has ${formatEther(votingPower)} units of voting power at block ${blockNo}\n`
    );

}  
export default main