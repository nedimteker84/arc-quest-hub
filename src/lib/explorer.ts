import {
  CONTRACTS,
  ARC_TESTNET,
  getExplorerAddressUrl,
  getExplorerTokenUrl,
  getIpfsGatewayUrl,
} from "./config"

export {
  CONTRACTS,
  ARC_TESTNET,
  getExplorerAddressUrl,
  getExplorerTokenUrl,
  getIpfsGatewayUrl,
}

export function openAddress(address: string) {
  window.open(getExplorerAddressUrl(address), "_blank")
}

export function openToken(tokenId: number) {
  window.open(getExplorerTokenUrl(tokenId), "_blank")
}

export function openMetadata(tokenUri: string) {
  const url = getIpfsGatewayUrl(tokenUri)

  if (!url) return

  window.open(url, "_blank")
}