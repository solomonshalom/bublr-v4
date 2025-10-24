# Custom Domain Feature - Setup Guide

This guide explains how to set up and use the custom domain feature with Dodo Payments integration.

## Overview

The custom domain feature allows users to access their Bublr profile via their own domain (e.g., `blog.example.com`) instead of `bublr.com/username`. This feature is gated behind a $2/month subscription powered by Dodo Payments.

## Prerequisites

1. A Dodo Payments account ([sign up here](https://app.dodopayments.com/))
2. A custom domain that you own (e.g., from GoDaddy, Namecheap, etc.)
3. Access to your domain's DNS settings

## Setup Instructions

### 1. Dodo Payments Configuration

#### Create Subscription Product

1. Log into your Dodo Payments dashboard: https://app.dodopayments.com/
2. Navigate to **Products** → **Create Product**
3. Configure the product:
   - **Name**: Custom Domain
   - **Type**: Subscription
   - **Price**: $2.00 USD
   - **Billing Period**: Monthly
   - **Payment Link**: Enable and configure
4. Save and copy the **Product ID** (you'll need this for environment variables)

#### Set Up Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/subscription/webhook`
4. Select the following events:
   - `subscription.active`
   - `subscription.activated`
   - `subscription.created`
   - `subscription.renewed`
   - `subscription.on_hold`
   - `subscription.payment_failed`
   - `subscription.cancelled`
   - `subscription.expired`
5. Save and copy the **Webhook Secret**

#### Get API Key

1. Go to **Developers** → **API Keys**
2. Create a new API key or use existing one
3. Copy the **Bearer Token**

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Existing Firebase config...
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_MESSENGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_APP_ID=your_app_id
NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key

# Dodo Payments Configuration
DODO_PAYMENTS_API_KEY=your_dodo_bearer_token
DODO_WEBHOOK_SECRET=your_webhook_secret
DODO_SUBSCRIPTION_PRODUCT_ID=your_product_id

# App Configuration
NEXT_PUBLIC_APP_DOMAIN=bublr.life
NEXT_PUBLIC_APP_URL=https://bublr.life
```

Replace the placeholders with your actual values.

### 3. Deploy the Application

Deploy your application with the new environment variables. Make sure the webhook URL is accessible from the internet.

### 4. Test Webhook Integration

1. In Dodo Payments dashboard, go to **Developers** → **Webhooks**
2. Click on your webhook endpoint
3. Use the **Send test event** feature to test webhook delivery
4. Check your server logs to confirm events are being received

## User Flow

### For End Users

1. **Subscribe to Custom Domain**
   - User goes to Profile Settings
   - Clicks "Subscribe for $2/month" in the Custom Domain section
   - Redirected to Dodo Payments checkout
   - Completes payment with card details

2. **Set Custom Domain**
   - After successful payment, Custom Domain section unlocks
   - User enters their domain (e.g., `blog.example.com`)
   - Clicks "Save Domain"

3. **Configure DNS**
   - User goes to their domain registrar
   - Adds a CNAME record:
     - **Type**: CNAME
     - **Name**: `blog` (or subdomain)
     - **Value**: `bublr.life` (or your app domain)
     - **TTL**: 3600 (or default)

4. **Verify DNS**
   - User clicks "Check DNS Now" in Profile Settings
   - System verifies DNS points to the correct domain
   - Once verified, domain becomes active

5. **Access Profile**
   - Profile is now accessible at `https://blog.example.com`
   - Old URL `https://bublr.life/username` still works

## Database Schema

The following fields are added to the `users` collection in Firestore:

```javascript
{
  // Existing fields...
  customDomain: string | null,              // e.g., "blog.example.com"
  customDomainActive: boolean,              // Whether domain is active
  domainVerified: boolean,                  // DNS verification status
  domainVerifiedAt: Timestamp | null,       // When DNS was verified
  subscriptionId: string | null,            // Dodo Payments subscription ID
  subscriptionStatus: string,               // 'none' | 'active' | 'on_hold' | 'cancelled'
  subscriptionExpiresAt: Timestamp | null,  // For grace period tracking
  subscriptionGracePeriodEnds: Timestamp | null // 3 days after expiry
}
```

## API Endpoints

### Subscription Management

- `POST /api/subscription/create-checkout` - Create Dodo Payments checkout session
- `POST /api/subscription/webhook` - Handle Dodo Payments webhooks
- `GET /api/subscription/status` - Get user's subscription status

### Domain Management

- `POST /api/domain/set` - Set user's custom domain
- `POST /api/domain/verify` - Verify DNS configuration
- `POST /api/domain/remove` - Remove custom domain
- `GET /api/domain/lookup` - Look up user by custom domain (used by middleware)

## Grace Period

When a subscription payment fails:

1. Subscription status changes to `on_hold`
2. User gets a 3-day grace period
3. Custom domain remains active during grace period
4. User sees warning in Profile Settings
5. After 3 days, if payment not resolved:
   - Subscription status changes to `cancelled`
   - Custom domain is deactivated
   - User reverts to `bublr.life/username`

## DNS Configuration Examples

### Using CNAME (Recommended)

```
Type: CNAME
Name: blog (or @ for root domain)
Value: bublr.life
TTL: 3600
```

### Using A Record (Alternative)

```
Type: A
Name: blog (or @ for root domain)
Value: [Your server IP]
TTL: 3600
```

**Note**: A records require your server's IP address. CNAME is preferred for flexibility.

## Testing

### Test with Dodo Payments Test Cards

Use these test card numbers in Dodo Payments checkout:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`

Use any future expiry date and any 3-digit CVC.

### Test Checklist

- [ ] Create subscription checkout and complete payment
- [ ] Verify webhook events are received
- [ ] Set custom domain
- [ ] Verify DNS with real domain
- [ ] Test custom domain routing
- [ ] Test subscription expiry (webhook simulation)
- [ ] Test grace period functionality
- [ ] Test domain removal
- [ ] Test UI in light and dark modes
- [ ] Test on mobile devices

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is publicly accessible
2. Verify webhook secret matches `.env.local`
3. Check server logs for errors
4. Use Dodo Payments webhook testing tool

### DNS Verification Failing

1. Wait 5-60 minutes for DNS propagation
2. Check CNAME record points to correct domain
3. Use DNS checker tool: https://dnschecker.org/
4. Ensure subdomain is correct (e.g., `blog.example.com` not `blog.example.com/`)

### Custom Domain Not Loading

1. Verify domain is marked as active in Firestore
2. Check subscription status is `active`
3. Verify middleware is running correctly
4. Check browser console for errors

### Subscription Status Not Updating

1. Check webhook is receiving events
2. Verify webhook signature validation
3. Check Firestore for subscription data
4. Review server logs for webhook processing errors

## Security Considerations

- ✅ Webhook signatures are verified using `standardwebhooks`
- ✅ All domain inputs are validated server-side
- ✅ DNS verification prevents domain hijacking
- ✅ Subscription status checked before serving custom domains
- ✅ Rate limiting should be added for DNS verification
- ✅ User authentication required for all domain/subscription APIs

## Support

For issues or questions:
- Dodo Payments: https://docs.dodopayments.com/
- Bublr Issues: [GitHub Issues](your-repo-url)

## License

This feature is part of the Bublr project and follows the same license.
