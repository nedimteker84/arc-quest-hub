import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CheckInModule", (m) => {
  const checkIn = m.contract("CheckIn");

  return { checkIn };
});