import { Hex, hexToString, parseUnits } from "viem";
import { getWalletClient, waitsForTransaction } from "./util";
import getBlockNumber from "./getBlockNumber"
import { exit } from "process";

async function main({
  privateKey,
  votePower,
  proposalIndex,
  contractAddress, hre
}: {
    votePower: number,
  proposalIndex:number,
  privateKey: Hex,
  contractAddress: `0x${string}`, hre: any
}) {
   const viem = hre.viem
  const voter = await getWalletClient({
    privateKey
  })
   const contract = await viem.getContractAt("TokenizedBallot",
     contractAddress
 
   );
   await waitsForTransaction(
     async () => await contract.write.vote([proposalIndex, parseUnits(votePower.toString(), 18)], {
       account:voter.account
     }), hre
   )
  const proposalName =
    hexToString(
      await contract.read.proposalName([proposalIndex])
    )
   console.log(
    `Succesfully cast ${votePower} power for ${proposalName}.`
   );
  
  await getBlockNumber({viem});

 }
 export default main