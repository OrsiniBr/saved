import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Deploys SavingsCircleFactory with a configurable cUSD address
// Alfajores (testnet): 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
// Celo Mainnet: 0x765DE816845861e75A25fCA122bb6898B8B1282a
export default buildModule("Factory", (m) => {
  // Default to mainnet cUSD address for Celo mainnet deployment
  const cUSD = m.getParameter(
    "cUSD",
    process.env.CUSD_ADDRESS ?? "0x765DE816845861e75A25fCA122bb6898B8B1282a"
  );

  const factory = m.contract("SavingsCircleFactory", [cUSD]);

  return { factory };
});
