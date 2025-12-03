# Self Protocol Setup Guide

## Quick Setup Steps

### Option 1: Manual ngrok Setup (Recommended for Testing)

1. **Download ngrok manually**:
   - Visit: https://ngrok.com/download
   - Download the Windows version
   - Extract to a folder (e.g., `C:\ngrok`)

2. **Start your Next.js dev server**:
   ```bash
   cd frontend
   npm run dev
   ```
   Server will run on `http://localhost:3000`

3. **Start ngrok in a new terminal**:
   ```bash
   # Navigate to ngrok folder
   cd C:\ngrok
   # Or wherever you extracted ngrok
   
   # Start tunnel
   ngrok http 3000
   ```

4. **Copy the ngrok HTTPS URL**:
   - You'll see something like: `https://abc123.ngrok.io`
   - Copy this URL

5. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_SELF_ENDPOINT=https://abc123.ngrok.io/api/verify
   NEXT_PUBLIC_SELF_SCOPE=savings-circle
   NEXT_PUBLIC_SELF_MOCK_PASSPORT=true
   NEXT_PUBLIC_SELF_MIN_AGE=18
   ```

6. **Restart your dev server** to load new environment variables

### Option 2: Use Playground Endpoint (Easiest for Testing)

For quick testing, you can use Self's playground endpoint (no ngrok needed):

```env
NEXT_PUBLIC_SELF_ENDPOINT=https://playground.self.xyz/api/verify
NEXT_PUBLIC_SELF_SCOPE=savings-circle
NEXT_PUBLIC_SELF_MOCK_PASSPORT=true
```

**Note**: This uses Self's public playground endpoint, so verification happens on their servers.

### Option 3: Deploy to Production

Deploy your Next.js app to Vercel/Netlify, then:

```env
NEXT_PUBLIC_SELF_ENDPOINT=https://yourdomain.com/api/verify
NEXT_PUBLIC_SELF_MOCK_PASSPORT=false  # For mainnet
```

## Current Configuration

Your current setup:
- ✅ Backend API route: `/api/verify` (ready)
- ✅ Frontend verification component (ready)
- ✅ Contract addresses configured (mainnet)

## Next Steps

1. **Choose an endpoint option** (playground is easiest for testing)
2. **Update `.env.local`** with the endpoint
3. **Restart dev server**
4. **Test the verification flow**

## Troubleshooting

### "Endpoint not reachable"
- Ensure endpoint is publicly accessible (use ngrok or deploy)
- Check endpoint URL is correct
- Verify HTTPS (not HTTP)

### "Proof generation failed"
- Check endpoint is accessible from internet
- Verify endpoint returns proper JSON
- Check browser console for errors

### Network Issues
- Try using playground endpoint first
- Check firewall/antivirus settings
- Try different network connection

