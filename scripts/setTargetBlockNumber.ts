import { waitsForTransaction } from "./util";

async function main({
 contractAddress, target, hre
}:{ target:number, contractAddress:`0x${string}`, hre:any}) {
  const viem = hre.viem
  const contract = await viem.getContractAt("TokenizedBallot",
    contractAddress
  );
  await waitsForTransaction(
    async () => await contract.write.setTargetBlockNumber([target]), hre
  )
  const update = await contract.read.targetBlockNumber()
  console.log(
    `Target block number updated successfully to ${update}\n`
  );

}
export default main