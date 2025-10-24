# Lemon Squeezy Setup Guide

## 🍋 Quick Setup for Custom Domain Feature

This guide will help you set up Lemon Squeezy for the $2/month custom domain subscription feature.

---

## Step 1: Create a Lemon Squeezy Account

1. Go to https://app.lemonsqueezy.com/register
2. Sign up with your email
3. Complete email verification
4. Set up your store (you'll be prompted)

---

## Step 2: Create a Subscription Product

1. Go to **Products** in the left sidebar
2. Click **"+ New Product"**
3. Fill in the details:
   ```
   Product Name: Custom Domain Subscription
   Description: Add a custom domain to your Bublr profile
   ```
4. Click **"Create Product"**

5. In the product page, click **"+ Add Variant"**
6. Set up the pricing:
   ```
   Variant Name: Monthly
   Price: $2.00
   Billing Interval: Monthly (every 1 month)
   ```
7. Click **"Save Variant"**

8. **Copy the Variant ID**:
   - You'll see it in the variant section
   - It looks like: `123456` (just numbers)
   - Save this - you'll need it for `.env.local`

---

## Step 3: Get Your API Key

1. Go to **Settings** (bottom left) → **API**
2. Click **"+ Create API Key"**
3. Give it a name: `Bublr Custom Domain`
4. Click **"Create"**
5. **Copy the API key** - it will look like `eyJ0eXAiOiJKV1...`
6. Save it securely - you won't see it again!

---

## Step 4: Get Your Store ID

1. Go to **Settings** → **Stores**
2. Click on your store name
3. Look at the URL in your browser:
   ```
   https://app.lemonsqueezy.com/settings/stores/YOUR_STORE_ID
                                                   ^^^^^^^^^^^^^^
   ```
4. Copy the Store ID (the number at the end of the URL)

---

## Step 5: Set Up Webhook

1. Go to **Settings** → **Webhooks**
2. Click **"+ Create Webhook"**
3. Fill in:
   ```
   URL: http://localhost:3000/api/subscription/webhook
   (Change to your production URL when deploying)
   
   Signing Secret: (will be generated automatically)
   ```
4. Select these events:
   - ✅ `subscription_created`
   - ✅ `subscription_updated`
   - ✅ `subscription_cancelled`
   - ✅ `subscription_expired`
   - ✅ `subscription_paused`
   - ✅ `subscription_resumed`
   - ✅ `subscription_payment_success`
   - ✅ `subscription_payment_failed`
   - ✅ `subscription_payment_recovered`

5. Click **"Save Webhook"**
6. **Copy the Signing Secret** - it will be shown after creation

---

## Step 6: Update Your .env.local File

Open `/project/workspace/solomonshalom/bublr-v4/.env.local` and fill in:

```bash
# Lemon Squeezy Configuration
LEMONSQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbG... # From Step 3
LEMONSQUEEZY_STORE_ID=12345                    # From Step 4  
LEMONSQUEEZY_VARIANT_ID=67890                  # From Step 2
LEMONSQUEEZY_WEBHOOK_SECRET=whsec_xxxxx        # From Step 5

# Also fill in your Firebase config if not already done
NEXT_PUBLIC_PROJECT_ID=your_project_id
# ... etc
```

---

## Step 7: Restart Your Dev Server

**Important:** Environment variables only load when the server starts!

```bash
# Stop your server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## Step 8: Test the Integration

1. Open your app in the browser
2. Go to Profile Settings
3. Click **"Subscribe for $2/month"**
4. You should be redirected to Lemon Squeezy checkout

### Test Cards

Use these for testing (Test Mode):
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

---

## Troubleshooting

### ❌ "Failed to create checkout session"

**Solution**: Check the browser console for detailed error. Most likely:
1. Environment variables not set correctly
2. Dev server not restarted after updating .env.local
3. Variant ID is incorrect

**Debug**: Click "Subscribe" button and check the "View Debug Info" section in the error message.

### ❌ Webhook not receiving events

**Solution**:
1. For local testing, use **ngrok** to expose your localhost:
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```
2. Update the webhook URL in Lemon Squeezy to your ngrok URL:
   ```
   https://abc123.ngrok.io/api/subscription/webhook
   ```

### ❌ API key error

**Solution**: Make sure your API key:
- Is from the correct store
- Has been copied completely (they're long!)
- Is in Test Mode if you're testing

---

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```bash
LEMONSQUEEZY_API_KEY=your_production_api_key
LEMONSQUEEZY_STORE_ID=your_store_id
LEMONSQUEEZY_VARIANT_ID=your_variant_id
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_DOMAIN=yourdomain.com
```

### Switch to Live Mode

1. In Lemon Squeezy dashboard, toggle **Test Mode OFF** (top right)
2. Create a new **Live API key** (Settings > API)
3. Create a new **Live Webhook** with your production URL
4. Update environment variables in your hosting platform
5. Redeploy

---

## Quick Reference

| What | Where to Find |
|------|--------------|
| API Key | Settings > API > Create API Key |
| Store ID | Settings > Stores (in URL) |
| Variant ID | Products > Your Product > Variants |
| Webhook Secret | Settings > Webhooks > Your Webhook |
| Test Cards | Use 4242 4242 4242 4242 |

---

## Support Links

- 📚 [Lemon Squeezy Docs](https://docs.lemonsqueezy.com)
- 🔧 [API Reference](https://docs.lemonsqueezy.com/api)
- 💬 [Discord Community](https://discord.gg/lemonsqueezy)
- 📧 [Support Email](mailto:support@lemonsqueezy.com)

---

**You're all set!** 🎉

Once you've completed these steps, the custom domain subscription feature will be fully functional.
