export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined;

if (!FACTORY_ADDRESS) {
  throw new Error("NEXT_PUBLIC_FACTORY_ADDRESS is required for dashboard interactions");
}

export const ACTIVITY_LOOKBACK_BLOCKS = BigInt(process.env.NEXT_PUBLIC_ACTIVITY_LOOKBACK_BLOCKS ?? "20000");
