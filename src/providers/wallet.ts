import { createConfig, http } from "wagmi"
import { injected } from "wagmi/connectors"
import { arcTestnet } from "../lib/chains"

export const config = createConfig({
  chains: [arcTestnet],

  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],

  transports: {
    [arcTestnet.id]: http(),
  },
})