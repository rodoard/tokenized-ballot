import { viem } from "hardhat";
import getBlockNumber from "./getBlockNumber"
async function main() {
    const tokenContract = await viem.deployContract("TokenizedVote");
    console.log(`Contract deployed at ${tokenContract.address}`);
  await getBlockNumber({viem});
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});