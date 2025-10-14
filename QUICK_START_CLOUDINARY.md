# 🚀 Quick Start - Cloudinary Setup

## ⏱️ 5-Minute Setup Guide

### 1️⃣ Create Cloudinary Account (2 min)

👉 Go to: https://cloudinary.com/users/register_free

- Sign up with email (FREE, no credit card needed!)
- Verify your email
- You'll see your Dashboard immediately

### 2️⃣ Get Your Credentials (1 min)

On your Cloudinary Dashboard, you'll see:

```
Cloud name:  dxxxxxxxab
API Key:     123456789012345
API Secret:  ••••••••••••••  [Click "Reveal"]
```

Copy all three values!

### 3️⃣ Add to Your Project (2 min)

**Create `.env.local` file in project root:**

```bash
# Copy-paste and replace with YOUR values:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxab
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_secret_here
```

⚠️ **Replace** `dxxxxxxxab`, `123456789012345`, and `your_secret_here` with YOUR actual values!

### 4️⃣ Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## ✅ Test It Works

1. Go to http://localhost:3000/profile
2. Click "Edit Profile"
3. Try uploading a logo or banner
4. You should see upload progress
5. Image loads from Cloudinary! 🎉

## 🎯 Already Using It!

The `ImageUpload` component is ready to use:

```tsx
import ImageUpload from "@/components/ImageUpload";

<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  onRemove={() => setImageUrl("")}
  label="Upload Image"
  aspectRatio="square"
/>;
```

## 📦 What You Get (FREE)

✅ 25 GB Storage  
✅ 25 GB Bandwidth/month  
✅ 25,000 Transformations  
✅ Unlimited uploads  
✅ Global CDN  
✅ Auto image optimization

## 🚀 Deploy to Vercel

When deploying, add these 3 variables in Vercel:

**Settings → Environment Variables:**

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

Select "All Environments" and Save!

## ❓ Issues?

**Upload not working?**

- Check `.env.local` has correct values
- Restart dev server
- Check browser console for errors

**"Invalid signature"?**

- Double-check API Secret (no spaces!)
- Make sure Cloud Name matches

**Need help?**

- Open `CLOUDINARY_INTEGRATION.md` for full docs
- Or just ask me! 😊

---

**That's it! You're ready to upload images! 📸**
