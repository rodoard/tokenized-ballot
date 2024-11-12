import { createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from 'viem/chains';
import { providerApiKey } from "../conf";
import { exit } from "process";

export async function getWalletClient({
  privateKey,
}:{privateKey:Hex}) {
  const privateKeys = [
    privateKey
  ]
  const signers = privateKeys.map((privateKey) => {
      const account = privateKeyToAccount( privateKey as Hex);
      return createWalletClient({
        account,
        chain: sepolia,
        transport: http(
          `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`
        )
      });
    });
  return signers[0] 
}

export async function waitsForTransaction(fn: any, hre:any) {
  let hash 
    try {
   hash = await fn()
    } catch (e:any) {
      console.error("caught e", e.message)
     exit(1)
  } 
  const publicClient = await hre.viem.getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash })
}