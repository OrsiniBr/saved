#!/bin/bash

# Self Protocol Setup Script
# This script helps set up ngrok tunnel for Self verification

echo "🚀 Setting up Self Protocol verification..."

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed"
    echo "📥 Installing ngrok..."
    npm install -g ngrok
fi

# Check if Next.js dev server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "⚠️  Next.js dev server is not running on port 3000"
    echo "📝 Please start it with: npm run dev"
    echo ""
    read -p "Press Enter to continue after starting the server..."
fi

# Start ngrok
echo "🌐 Starting ngrok tunnel..."
echo "📋 This will create a public URL for your local server"
echo ""

# Start ngrok in background and capture the URL
ngrok http 3000 --log=stdout > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!

# Wait for ngrok to start
sleep 3

# Get the ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"https://[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Failed to get ngrok URL"
    echo "💡 Try running ngrok manually: ngrok http 3000"
    exit 1
fi

NGROK_ENDPOINT="${NGROK_URL}/api/verify"

echo "✅ ngrok tunnel created!"
echo "🌐 Public URL: $NGROK_URL"
echo "🔗 API Endpoint: $NGROK_ENDPOINT"
echo ""

# Update .env.local
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo "📝 Creating $ENV_FILE..."
    touch "$ENV_FILE"
fi

# Check if SELF_ENDPOINT already exists
if grep -q "NEXT_PUBLIC_SELF_ENDPOINT" "$ENV_FILE"; then
    # Update existing entry
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|NEXT_PUBLIC_SELF_ENDPOINT=.*|NEXT_PUBLIC_SELF_ENDPOINT=$NGROK_ENDPOINT|" "$ENV_FILE"
    else
        sed -i "s|NEXT_PUBLIC_SELF_ENDPOINT=.*|NEXT_PUBLIC_SELF_ENDPOINT=$NGROK_ENDPOINT|" "$ENV_FILE"
    fi
    echo "✅ Updated NEXT_PUBLIC_SELF_ENDPOINT in $ENV_FILE"
else
    # Add new entry
    echo "" >> "$ENV_FILE"
    echo "# Self Protocol Configuration" >> "$ENV_FILE"
    echo "NEXT_PUBLIC_SELF_ENDPOINT=$NGROK_ENDPOINT" >> "$ENV_FILE"
    echo "NEXT_PUBLIC_SELF_SCOPE=savings-circle" >> "$ENV_FILE"
    echo "NEXT_PUBLIC_SELF_MOCK_PASSPORT=true" >> "$ENV_FILE"
    echo "✅ Added Self configuration to $ENV_FILE"
fi

echo ""
echo "📋 Next steps:"
echo "1. Restart your Next.js dev server to load the new environment variable"
echo "2. The ngrok tunnel is running (PID: $NGROK_PID)"
echo "3. To stop ngrok, run: kill $NGROK_PID"
echo ""
echo "🎉 Setup complete! Your endpoint is: $NGROK_ENDPOINT"

