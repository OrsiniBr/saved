# Self Protocol Setup Script for Windows PowerShell
# This script helps set up ngrok tunnel for Self verification

Write-Host "🚀 Setting up Self Protocol verification..." -ForegroundColor Cyan

# Check if ngrok is installed
try {
    $ngrokVersion = ngrok version 2>&1
    Write-Host "✅ ngrok is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ ngrok is not installed" -ForegroundColor Red
    Write-Host "📥 Installing ngrok..." -ForegroundColor Yellow
    npm install -g ngrok
}

# Check if Next.js dev server is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Next.js dev server is running" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Next.js dev server is not running on port 3000" -ForegroundColor Yellow
    Write-Host "📝 Please start it with: npm run dev" -ForegroundColor Yellow
    Read-Host "Press Enter to continue after starting the server"
}

# Start ngrok
Write-Host "🌐 Starting ngrok tunnel..." -ForegroundColor Cyan
Write-Host "📋 This will create a public URL for your local server" -ForegroundColor Yellow
Write-Host ""

# Start ngrok in background
$ngrokProcess = Start-Process -FilePath "ngrok" -ArgumentList "http", "3000" -PassThru -WindowStyle Hidden

# Wait for ngrok to start
Start-Sleep -Seconds 3

# Get the ngrok URL from ngrok API
try {
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -ErrorAction Stop
    $ngrokUrl = $tunnels.tunnels[0].public_url
    
    if ($ngrokUrl) {
        $ngrokEndpoint = "$ngrokUrl/api/verify"
        
        Write-Host "✅ ngrok tunnel created!" -ForegroundColor Green
        Write-Host "🌐 Public URL: $ngrokUrl" -ForegroundColor Cyan
        Write-Host "🔗 API Endpoint: $ngrokEndpoint" -ForegroundColor Cyan
        Write-Host ""
        
        # Update .env.local
        $envFile = ".env.local"
        
        if (-not (Test-Path $envFile)) {
            Write-Host "📝 Creating $envFile..." -ForegroundColor Yellow
            New-Item -Path $envFile -ItemType File | Out-Null
        }
        
        $envContent = Get-Content $envFile -Raw -ErrorAction SilentlyContinue
        
        # Check if SELF_ENDPOINT already exists
        if ($envContent -match "NEXT_PUBLIC_SELF_ENDPOINT") {
            # Update existing entry
            $envContent = $envContent -replace "NEXT_PUBLIC_SELF_ENDPOINT=.*", "NEXT_PUBLIC_SELF_ENDPOINT=$ngrokEndpoint"
            Set-Content -Path $envFile -Value $envContent
            Write-Host "✅ Updated NEXT_PUBLIC_SELF_ENDPOINT in $envFile" -ForegroundColor Green
        } else {
            # Add new entry
            Add-Content -Path $envFile -Value "`n# Self Protocol Configuration"
            Add-Content -Path $envFile -Value "NEXT_PUBLIC_SELF_ENDPOINT=$ngrokEndpoint"
            Add-Content -Path $envFile -Value "NEXT_PUBLIC_SELF_SCOPE=savings-circle"
            Add-Content -Path $envFile -Value "NEXT_PUBLIC_SELF_MOCK_PASSPORT=true"
            Write-Host "✅ Added Self configuration to $envFile" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "📋 Next steps:" -ForegroundColor Yellow
        Write-Host "1. Restart your Next.js dev server to load the new environment variable" -ForegroundColor White
        Write-Host "2. The ngrok tunnel is running (PID: $($ngrokProcess.Id))" -ForegroundColor White
        Write-Host "3. To stop ngrok, run: Stop-Process -Id $($ngrokProcess.Id)" -ForegroundColor White
        Write-Host ""
        Write-Host "🎉 Setup complete! Your endpoint is: $ngrokEndpoint" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to get ngrok URL" -ForegroundColor Red
        Write-Host "💡 Try running ngrok manually: ngrok http 3000" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error getting ngrok URL: $_" -ForegroundColor Red
    Write-Host "💡 Make sure ngrok is running: ngrok http 3000" -ForegroundColor Yellow
}

