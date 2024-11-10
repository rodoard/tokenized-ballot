
async function main({
  contractAddress,
  voter, hre
}:{hre:any, contractAddress:`0x${string}`, voter:`0x${string}`}) {
  const viem = hre.viem
  const publicClient = await viem.getPublicClient();

  async function waitsForTransaction(fn: any) {
    const hash = await fn()
    await publicClient.waitForTransactionReceipt({ hash })
  }
  const contract = await viem.getContractAt("TokenizedVote",
    contractAddress  
  );
  const votes = await contract.read.getVotes([voter]);
    console.log(
        `Account ${voter
        } has ${votes.toString()} units of voting power\n`
    );

}  
export default main