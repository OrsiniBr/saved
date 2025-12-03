# Self Protocol Contract Addresses

## IdentityVerificationHub Contracts

Self Protocol has deployed IdentityVerificationHub contracts on Celo networks:

### Celo Mainnet (Real Passports)
- **Contract**: IdentityVerificationHub
- **Address**: `0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF`
- **Explorer**: https://celoscan.io/address/0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
- **Use Case**: Production verification with real passport documents

### Celo Testnet (Mock Passports)
- **Contract**: IdentityVerificationHub  
- **Address**: `0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74`
- **Explorer**: https://celo-sepolia.blockscout.com/address/0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
- **Use Case**: Development and testing with mock passport data

## Configuration

### For Development (Testnet)
```env
NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS=0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
```

### For Production (Mainnet)
```env
NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS=0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF
```

## Network Compatibility

**Note**: The testnet address is for Celo Sepolia. If you're using Celo Alfajores, you may need to:
1. Use the Sepolia testnet address (may work if contracts are compatible)
2. Deploy your own IdentityVerificationHub on Alfajores
3. Check with Self Protocol for Alfajores-specific deployments

## Usage

The contract address is automatically loaded from environment variables in `frontend/app/config/contracts.ts`. The default is set to the testnet address for development.

## References

- [Self Protocol Documentation](https://docs.self.xyz)
- [Contract Integration Guide](https://docs.self.xyz/contract-integration/basic-integration)

