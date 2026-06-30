export const ARC_TESTNET = {
  id: 5042002,
  name: "Arc Testnet",
  rpcUrl: "https://rpc.testnet.arc.network",
  explorerUrl: "https://testnet.arcscan.app",
} as const

export const CONTRACTS = {
  checkIn: "0x4A37492539270A97c44F90DFc889EA742DF68497",
  arcQuestHub: "0x9c4A47D7Ea291905393Fef8878E2322138968bDE",
  builderPassportNft: "0xD7c13571F3DC037B23F484005D407F59D7Ae49Be",
} as const

export const APP_CONFIG = {
  name: "Arc Quest Hub",
  url: "https://arc-quest-hub.vercel.app",
  description:
    "Onchain builder identity, quests, achievements and Passport NFT for Arc Testnet.",
} as const

export function getExplorerAddressUrl(address: string) {
  return `${ARC_TESTNET.explorerUrl}/address/${address}`
}

export function getExplorerTokenUrl(tokenId: number) {
  return `${ARC_TESTNET.explorerUrl}/token/${CONTRACTS.builderPassportNft}/instance/${tokenId}`
}

export function getPublicBuilderUrl(wallet: string) {
  return `${APP_CONFIG.url}/?builder=${wallet}`
}

export function getIpfsGatewayUrl(tokenUri: string) {
  if (!tokenUri) return ""

  return tokenUri.startsWith("ipfs://")
    ? tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
    : tokenUri
}