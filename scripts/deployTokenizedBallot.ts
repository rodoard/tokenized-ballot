import { stringToHex } from "viem";

type Params = {
  proposals: string[], token: string, target: bigint, hre: any
}

async function main({
 proposals , token, target, hre
}:Params) {
  const viem = hre.viem;
  const hexedProposals = proposals.map(p=>stringToHex(p, {size:32}))
  const publicClient = await viem.getPublicClient();
  const [deployer, account1, account2] = await viem.getWalletClients();
  const tokenContract = await viem.deployContract("TokenizedBallot", [
     hexedProposals, token, target
    ]);
    console.log(`Contract deployed at ${tokenContract.address}`);
}
export default main