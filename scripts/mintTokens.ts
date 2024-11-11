import { waitsForTransaction } from "./util";

async function main({
 voter, contractAddress, mintValue, hre
}:{ voter:string, contractAddress:`0x${string}`, mintValue:bigint, hre:any}) {
  const viem = hre.viem
  const publicClient = await viem.getPublicClient();
  const contract = await viem.getContractAt("TokenizedVote",
    contractAddress

  );
  await waitsForTransaction(
    async () => await contract.write.mint([voter, mintValue]), hre
  )
  console.log(
    `Minted ${mintValue.toString()} decimal units to account ${voter
    }\n`
  );

}
export default main