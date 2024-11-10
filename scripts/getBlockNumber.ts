import { viem } from "hardhat";

async function main() {
  const publicClient = await viem.getPublicClient();
  const lastBlockNumber = await publicClient.getBlockNumber();
  console.log("Block number ", lastBlockNumber)
}
export default main 
