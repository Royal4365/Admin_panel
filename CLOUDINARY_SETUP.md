# Cloudinary Setup Guide

This project uses Cloudinary for image management. Follow these steps to configure it:

## 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. After signing up, you'll be taken to your Dashboard

## 2. Get Your Credentials

From your Cloudinary Dashboard, you'll find:

- **Cloud Name**: Your unique cloud name
- **API Key**: Your API key
- **API Secret**: Your API secret (click "reveal" to see it)

## 3. Configure Environment Variables

### Local Development

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials.

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Select all environments (Production, Preview, Development)
5. Save and redeploy

## 4. Usage in Components

The project includes an `ImageUpload` component that handles all Cloudinary uploads:

```tsx
import ImageUpload from "@/components/ImageUpload";

// In your component
<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  onRemove={() => setImageUrl("")}
  label="Upload Restaurant Logo"
  aspectRatio="square" // or "video" or "banner"
  folder="restaurant-logos"
/>;
```

## 5. Image Organization

Images are organized in folders:

- `restaurant-logos/` - Restaurant logos
- `restaurant-banners/` - Header banners
- `restaurant-pictures/` - Main restaurant images
- `menu-items/` - Menu item images
- `gallery/` - Restaurant gallery photos

## 6. Features

✅ **Automatic Upload** - Drag & drop or click to upload
✅ **Image Preview** - See uploaded images immediately
✅ **Size Validation** - Max 10MB file size
✅ **Type Validation** - Only accepts image files
✅ **Signed Uploads** - Secure server-side signature
✅ **Progress Indicator** - Loading state during upload
✅ **Error Handling** - User-friendly error messages

## 7. Free Tier Limits

Cloudinary free tier includes:

- 25 GB storage
- 25 GB monthly bandwidth
- 25,000 transformations/month

This is more than enough for development and small-scale production use.

## Troubleshooting

**Issue: Upload fails**

- Check that all environment variables are set correctly
- Verify your API credentials in Cloudinary dashboard
- Check browser console for detailed error messages

**Issue: Images not loading**

- Verify the image URL is correct
- Check if Cloudinary account is active
- Ensure browser can access Cloudinary CDN

## Security Notes

⚠️ **Never commit `.env.local` to Git**
✅ API Secret is only used server-side
✅ Cloud Name and API Key are safe to expose in client-side code
✅ All uploads are signed for security
