import { parseSignature as splitSignature, http, stringToHex, Hex} from 'viem';
import { getWalletClient, waitsForTransaction } from './util';
import { sepolia } from 'viem/chains';
import { signTypedData } from 'viem/accounts';

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
type Params = {
  privateKey: Hex,
  contractName:string, contractAddress:`0x${string}`,
  delegatee:`0x${string}`, nonce:any, expiry:any
}
  
async function getSignature({
  contractName, contractAddress,
  delegatee, nonce, expiry,
  privateKey
  }:Params
) {
  
  // Define the EIP-712 domain and types for `delegateBySig`
  const domain = {
    name: contractName,
    version: "1",
    chainId: sepolia.id,
    verifyingContract: contractAddress,
  };

  const types = {
    Delegation: [
      { name: "delegatee", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "expiry", type: "uint256" },
    ],
  };

  const message = {
    delegatee,
    nonce,
    expiry,
  };

  // Sign EIP-712 data using Viem's `signTypedData`
  const signature = await signTypedData({
    privateKey, // Use the private key directly in the script
    domain,
    types,
    primaryType: "Delegation",
    message,
  });
  return {
    signature
  }
}


async function main({
  contractAddress,
  privateKey,
  delegator, hre,
   delegatee,
}:{hre:any, privateKey:Hex, contractAddress:Hex, delegator:Hex, delegatee:Hex}) {
  const viem = hre.viem
  const publicClient = await viem.getPublicClient();
  const walletClient = getWalletClient({
    privateKey
  })
  const contractName = "TokenizedVote"
  const contract = await viem.getContractAt(contractName,
    contractAddress, {
      client: {
        wallet: walletClient
      }
    } 
  );
  const nonce = await contract.read.nonces([delegator]);
  const expiry = Math.floor(Date.now() / 1000) + 3600 * 48; // Expiry set to 1 hour from now
  const { signature} = await getSignature({
    contractName, 
    privateKey,
    contractAddress,
    delegatee,
    nonce, 
    expiry
  })

   // Split the signature
   const { v, r, s } = splitSignature(signature);
  
  // Call `delegateBySig` on the contract
  await waitsForTransaction( 
  async ()=> await contract.write.delegateBySig([
     delegatee,
     nonce,
     expiry,
     v,
     r,
     s
  ]), hre
  )
  
 console.log(
        `Account ${delegatee
        } has delegated successfully\n`
    );

}  
export default main