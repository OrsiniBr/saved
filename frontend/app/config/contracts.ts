/**
 * Contract addresses configuration
 * Self Protocol IdentityVerificationHub addresses:
 * - Mainnet: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
 * - Testnet (Celo Sepolia): 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
 */

export const CONTRACTS = {
  // Self IdentityVerificationHub contract address
  // Mainnet: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
  // Testnet: 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
  SELF_VERIFICATION_HUB: (process.env.NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS ||
    // Default to mainnet address
    "0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF") as `0x${string}`,

  // SavingsCircleFactory contract address
  // Deployed on Celo Mainnet: 0x75DAd468F98e7bF523ae553c29D24348248da106
  SAVINGS_CIRCLE_FACTORY: (process.env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0x75DAd468F98e7bF523ae553c29D24348248da106") as `0x${string}`,

  // cUSD token address
  // Mainnet: 0x765DE816845861e75A25fCA122bb6898B8B1282a
  // Alfajores: 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1
  CUSD: (process.env.NEXT_PUBLIC_CUSD_ADDRESS ||
    "0x765DE816845861e75A25fCA122bb6898B8B1282a") as `0x${string}`, // Mainnet cUSD
} as const;

