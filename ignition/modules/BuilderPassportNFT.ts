import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("BuilderPassportNFTModule", (m) => {
  const defaultAdmin = m.getParameter(
    "defaultAdmin",
    "0x7D59968dCd1E57E48f0Dba28F460B782779Cf01A",
  )

  const builderPassportNFT = m.contract("BuilderPassportNFT", [defaultAdmin])

  return { builderPassportNFT }
})