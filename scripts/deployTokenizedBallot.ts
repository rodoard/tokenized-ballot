import { stringToHex } from "viem";
import getBlockNumber from "./getBlockNumber";

type Params = {
  proposals: string[], token: string,  hre: any
}

async function main({
 proposals , token,  hre
}:Params) {
  const viem = hre.viem;
  const hexedProposals = proposals.map(p=>stringToHex(p, {size:32}))
  const tokenContract = await viem.deployContract("TokenizedBallot", [
     hexedProposals, token
    ]);
  console.log(`Contract deployed at ${tokenContract.address}`);
  await getBlockNumber({viem});
}
export default main
