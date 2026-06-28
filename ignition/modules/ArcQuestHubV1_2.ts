import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("ArcQuestHubV1_2Module", (m) => {
  const defaultAdmin = m.getParameter(
    "defaultAdmin",
    "0x7D59968dCd1E57E48f0Dba28F460B782779Cf01A"
  )

  const projectName = m.getParameter(
    "projectName",
    "Arc Quest Hub V1.2"
  )

  const projectUrl = m.getParameter(
    "projectUrl",
    "https://arc-quest-hub.vercel.app"
  )

  const githubUrl = m.getParameter(
    "githubUrl",
    "https://github.com/nedimteker84/arc-quest-hub"
  )

  const contract = m.contract("ArcQuestHubV1_2", [
    defaultAdmin,
    projectName,
    projectUrl,
    githubUrl,
  ])

  return { contract }
})