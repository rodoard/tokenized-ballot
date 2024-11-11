async function main({viem}:{viem:any}) {
  const publicClient = await viem.getPublicClient();
  const lastBlockNumber = await publicClient.getBlockNumber();
  console.log("Block number ", lastBlockNumber)
}
export default main 
