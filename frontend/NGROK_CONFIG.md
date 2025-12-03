# ngrok Configuration for Self Verification

## Current ngrok Setup

Your ngrok is running and forwarding to port 80, but Next.js runs on port 3000.

## Steps to Use Your Own Backend

### 1. Update ngrok to Forward to Port 3000

**Stop the current ngrok** (Ctrl+C) and restart it:

```bash
ngrok http 3000
```

This will give you a new URL like: `https://xxxxx.ngrok-free.dev`

### 2. Update Your Environment Variables

Update `frontend/.env.local`:

```env
# Use your ngrok URL instead of playground
NEXT_PUBLIC_SELF_ENDPOINT=https://xxxxx.ngrok-free.dev/api/verify
NEXT_PUBLIC_SELF_SCOPE=savings-circle
NEXT_PUBLIC_SELF_MOCK_PASSPORT=true
```

### 3. Restart Your Dev Server

```bash
cd frontend
npm run dev
```

## Important Notes

⚠️ **ngrok Free Plan Limitations:**
- URLs change each time you restart ngrok
- You'll need to update `.env.local` each time
- Consider using a static domain (paid plan) or stick with playground for testing

✅ **Current Recommendation:**
- For testing: Use playground endpoint (already configured)
- For production: Deploy to Vercel/Netlify and use your domain

## Testing

Once configured:
1. Make sure Next.js is running on port 3000
2. ngrok is forwarding to port 3000
3. `.env.local` has the ngrok URL
4. Restart dev server
5. Test verification flow

