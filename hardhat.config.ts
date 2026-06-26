import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem"
import { defineConfig } from "hardhat/config"
import "dotenv/config"

const arcTestnetRpcUrl = process.env.ARC_TESTNET_RPC_URL ?? ""
const arcTestnetPrivateKey = process.env.ARC_TESTNET_PRIVATE_KEY ?? ""

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    arcTestnet: {
      type: "http",
      chainType: "l1",
      url: arcTestnetRpcUrl,
      accounts: [arcTestnetPrivateKey],
    },
  },
})