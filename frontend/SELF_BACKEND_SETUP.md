# Self Protocol Backend Verification Setup

## Important: Public API Endpoint Required

For Self verification to work, your API endpoint **must be publicly accessible**. Self's relayers need to call your `/api/verify` endpoint after proof generation.

## Setup Options

### Option 1: Local Development with ngrok

1. **Install ngrok**:
   ```bash
   npm install -g ngrok
   # or download from https://ngrok.com
   ```

2. **Start your Next.js dev server**:
   ```bash
   cd frontend
   npm run dev
   # Server runs on http://localhost:3000
   ```

3. **Create ngrok tunnel**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

5. **Update your frontend `.env.local`**:
   ```env
   NEXT_PUBLIC_SELF_ENDPOINT=https://abc123.ngrok.io/api/verify
   ```

6. **Restart your dev server** to load the new environment variable

### Option 2: Deploy to Production

Deploy your Next.js app to Vercel, Netlify, or similar, then:

1. **Set environment variables** in your hosting platform
2. **Use your production URL**:
   ```env
   NEXT_PUBLIC_SELF_ENDPOINT=https://yourdomain.com/api/verify
   ```

## Configuration

### Environment Variables

```env
# Self API Endpoint (must be publicly accessible)
# For local dev with ngrok: https://your-ngrok-url.ngrok.io/api/verify
# For production: https://yourdomain.com/api/verify
NEXT_PUBLIC_SELF_ENDPOINT=https://your-public-url/api/verify

# Self Scope (must match frontend and backend)
NEXT_PUBLIC_SELF_SCOPE=savings-circle

# Mock Passport Setting
# true = testnet/staging (use mock passports)
# false = mainnet (use real passports)
NEXT_PUBLIC_SELF_MOCK_PASSPORT=true

# Verification Configuration
NEXT_PUBLIC_SELF_MIN_AGE=18
NEXT_PUBLIC_SELF_EXCLUDED_COUNTRIES=IRN,PRK,RUS,SYR
NEXT_PUBLIC_SELF_OFAC=true
```

## How It Works

1. **Frontend**: User scans QR code → Self app generates proof
2. **Self Relayers**: Call your `/api/verify` endpoint with proof data
3. **Backend**: Verifies proof against onchain contracts
4. **Response**: Returns success/error to Self relayers
5. **Frontend**: Receives verification result via WebSocket

## Important Notes

- ✅ **Endpoint must be HTTPS** (not HTTP)
- ✅ **Endpoint must be publicly accessible** (not localhost)
- ✅ **Scope must match** between frontend and backend
- ✅ **userIdType must match** (hex or uuid)
- ✅ **Config must match** (minimumAge, excludedCountries, etc.)

## Troubleshooting

### "Endpoint not reachable" errors
- Ensure ngrok is running (for local dev)
- Check your endpoint URL is correct
- Verify the endpoint is accessible from the internet

### "Verification failed" errors
- Check that scope matches frontend
- Verify config (minimumAge, excludedCountries) matches
- Ensure mockPassport setting matches your testnet/mainnet choice

### "Proof generation failed" errors
- Check endpoint is publicly accessible
- Verify endpoint returns proper JSON responses
- Check browser console for CORS errors

## Testing

1. Start your dev server
2. Start ngrok tunnel
3. Update `NEXT_PUBLIC_SELF_ENDPOINT` with ngrok URL
4. Restart dev server
5. Try verification flow

## Production Checklist

- [ ] Deploy Next.js app to production
- [ ] Set all environment variables
- [ ] Update `NEXT_PUBLIC_SELF_ENDPOINT` to production URL
- [ ] Set `NEXT_PUBLIC_SELF_MOCK_PASSPORT=false` for mainnet
- [ ] Test verification flow
- [ ] Monitor API endpoint logs

