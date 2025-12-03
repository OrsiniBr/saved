# ngrok Setup Guide

## Current Status

You're currently using the **playground endpoint** (`https://playground.self.xyz/api/verify`), so **ngrok is NOT needed** for testing.

## If You Want to Use Your Own Backend

If you want to use your own `/api/verify` endpoint instead of the playground, you'll need ngrok.

### Fix ngrok Authentication Error

The error "failed to send authentication request: failed to fetch CRL" usually means:

1. **ngrok needs authentication**:
   ```bash
   # Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken
   ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
   ```

2. **Or sign up/login**:
   - Visit: https://dashboard.ngrok.com/signup
   - Create a free account
   - Copy your authtoken
   - Run: `ngrok config add-authtoken YOUR_AUTHTOKEN`

### After Authentication

1. **Start your Next.js server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Start ngrok** (in a new terminal):
   ```bash
   ngrok http 3000
   ```

3. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

4. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_SELF_ENDPOINT=https://abc123.ngrok.io/api/verify
   ```

5. **Restart your dev server**

## Recommendation

**For now, just use the playground endpoint** - it's already configured and works without ngrok! You can switch to your own backend later when you're ready for production.

