# Deployment Guide

## Prerequisites

1. **Wallet with CELO for gas fees**
   - Ensure your deployer wallet has sufficient CELO for deployment
   - Estimated gas: ~2-3 CELO for factory deployment

2. **Private Key**
   - Your deployer wallet's private key (keep it secure!)

3. **RPC Endpoint**
   - Celo mainnet RPC URL (default: https://forno.celo.org)
   - Or use Infura/Alchemy for better reliability

## Deployment Steps

### 1. Set Up Environment Variables

Create a `.env` file in the `smart-contract` directory:

```bash
cd smart-contract
cp .env.example .env
```

Edit `.env` and add your private key:

```env
CELO_RPC_URL=https://forno.celo.org
CELO_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a
```

**⚠️ SECURITY WARNING:**
- Never commit `.env` to git
- Never share your private key
- Use a dedicated deployment wallet
- Consider using a hardware wallet for production

### 2. Compile Contracts

```bash
npm run build
```

### 3. Deploy to Celo Mainnet

```bash
npm run deploy:celo
```

This will:
- Deploy `SavingsCircleFactory` contract
- Use mainnet cUSD address: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- Output the deployed contract address

### 4. Verify Deployment

After deployment, you'll see output like:

```
Factory deployed to: 0x...
```

Verify on CeloScan:
- https://celoscan.io/address/YOUR_FACTORY_ADDRESS

### 5. Update Frontend Configuration

Update `frontend/.env.local`:

```env
NEXT_PUBLIC_FACTORY_ADDRESS=0x... # Your deployed factory address
NEXT_PUBLIC_CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a
```

## Contract Addresses

### Celo Mainnet
- **cUSD**: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **Factory**: (deploy to get address)

### Celo Alfajores (Testnet)
- **cUSD**: `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`
- **Factory**: (deploy to get address)

## Troubleshooting

### Insufficient Gas
- Ensure wallet has enough CELO (not cUSD) for gas
- Check current gas prices on CeloScan

### RPC Errors
- Try a different RPC endpoint (Infura, Alchemy)
- Check your internet connection
- Verify RPC URL is correct

### Private Key Issues
- Ensure private key starts with `0x`
- Verify it's 66 characters (0x + 64 hex chars)
- Check wallet has sufficient balance

## Security Best Practices

1. **Use a dedicated deployment wallet**
2. **Store private keys securely** (password manager, hardware wallet)
3. **Never commit `.env` files**
4. **Verify contracts on CeloScan** after deployment
5. **Test on testnet first** before mainnet deployment

## Next Steps

After deployment:
1. Verify contract on CeloScan
2. Update frontend environment variables
3. Test contract interactions
4. Monitor contract on CeloScan

