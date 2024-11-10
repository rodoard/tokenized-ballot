import { viem } from "hardhat";
import getBlockNumber from "./getBlockNumber"
async function main() {
    const publicClient = await viem.getPublicClient();
    const [deployer, account1, account2] = await viem.getWalletClients();
    const tokenContract = await viem.deployContract("TokenizedVote");
    console.log(`Contract deployed at ${tokenContract.address}`);
  await getBlockNumber();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});