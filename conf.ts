
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.SEPOLIA_PRIVATE_KEY || "";
const sepoliaAddress = process.env.SEPOLIA_WALLET_ADDRESS

export {
  providerApiKey,
  deployerPrivateKey,
  sepoliaAddress
}