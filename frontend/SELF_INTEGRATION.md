# Self Protocol Onchain Integration Guide

This guide explains how to complete the Self Protocol onchain verification integration for the Savings Circle application.

## Overview

The integration uses Self Protocol's onchain verification system where:
1. Users scan a QR code to generate a zero-knowledge proof
2. The proof is submitted to a Self VerificationHub contract onchain
3. The verification result is recorded in the SavingsCircle contract

## Prerequisites

1. **Deploy SelfVerificationRoot Contract**
   - You need to deploy your own `SelfVerificationRoot` contract
   - Follow the guide: https://docs.self.xyz/contract-integration/basic-integration
   - Use the `@selfxyz/contracts` SDK to deploy

2. **Update Contract Addresses**
   - Set `NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS` in `.env.local`
   - Set `NEXT_PUBLIC_FACTORY_ADDRESS` after deploying SavingsCircleFactory
   - Set `NEXT_PUBLIC_CUSD_ADDRESS` (defaults to Alfajores cUSD)

## Configuration

### Environment Variables

Add to `frontend/.env.local`:

```env
# Self VerificationHub contract address (deploy your own)
NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS=0x...

# Savings Circle contracts
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_CUSD_ADDRESS=0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1

# Self app configuration
NEXT_PUBLIC_SELF_APP_NAME=Savings Circle
NEXT_PUBLIC_SELF_SCOPE=savings-circle
NEXT_PUBLIC_SELF_ENDPOINT=https://playground.self.xyz/api/verify
```

### Update SelfVerification Component

The `SelfVerification` component automatically uses the contract address if `NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS` is set, otherwise falls back to the API endpoint.

## How It Works

### 1. User Verification Flow

```
User clicks "Link with Self"
  ↓
QR Code displayed
  ↓
User scans with Self app
  ↓
Proof generated
  ↓
Proof stored in localStorage
  ↓
User clicks "Submit Proof Onchain"
  ↓
Transaction sent to VerificationHub
  ↓
Verification confirmed onchain
  ↓
User can join savings circles
```

### 2. Contract Integration

The `SavingsCircle` contract has been updated with:
- `verifiedMembers` mapping to track verified identities
- `selfAttestationIds` mapping to store attestation IDs
- `recordSelfVerification()` function to record verification
- `SelfVerified` event for tracking

### 3. Frontend Hooks

- **`useSelfId`**: Manages Self identity state and verification flow
- **`useSelfVerification`**: Handles onchain proof submission

## Next Steps

1. **Deploy SelfVerificationRoot Contract**
   ```bash
   # Use Self's deployment tools
   # See: https://docs.self.xyz/contract-integration/basic-integration
   ```

2. **Update Contract ABI**
   - Update `VERIFICATION_HUB_ABI` in `useSelfVerification.ts` with your contract's actual ABI
   - Adjust proof encoding format if needed

3. **Test the Flow**
   - Connect wallet on Celo/Alfajores
   - Click "Link with Self"
   - Scan QR code
   - Submit proof onchain
   - Verify transaction on block explorer

4. **Update SavingsCircle Contract**
   - Add verification check in `attestMembership()` if you want to require verification
   - Update `recordSelfVerification()` to verify caller is VerificationHub

## Troubleshooting

### Proof Encoding Issues
- Check the exact ABI format expected by your SelfVerificationRoot contract
- Adjust the encoding in `useSelfVerification.ts` if needed
- Verify proof format matches Self's requirements

### Contract Address Not Set
- Ensure `NEXT_PUBLIC_SELF_VERIFICATION_HUB_ADDRESS` is set in `.env.local`
- Restart the dev server after updating environment variables

### Transaction Fails
- Check you're on the correct network (Celo/Alfajores)
- Verify contract address is correct
- Check gas fees and wallet balance
- Review contract logs for errors

## Resources

- [Self Protocol Documentation](https://docs.self.xyz)
- [Contract Integration Guide](https://docs.self.xyz/contract-integration/basic-integration)
- [Self Developer Tools](https://tools.self.xyz/)

