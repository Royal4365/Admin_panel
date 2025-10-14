# 🖼️ Cloudinary Integration Complete!

## ✅ What's Been Added

Your admin panel now has **complete Cloudinary integration** for professional image management!

### New Files Created:

1. **`lib/cloudinary.ts`** - Cloudinary configuration and helper functions
2. **`app/api/cloudinary/signature/route.ts`** - Secure upload signature generation API
3. **`components/ImageUpload.tsx`** - Reusable upload component with preview
4. **`.env.example`** - Environment variables template
5. **`CLOUDINARY_SETUP.md`** - Detailed setup guide

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Cloudinary Credentials (FREE)

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a **FREE account** (no credit card required!)
3. After signup, you'll see your Dashboard with:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

### Step 2: Add to `.env.local`

Create/update `.env.local` in your project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Replace the values** with your actual Cloudinary credentials!

### Step 3: Restart Dev Server

```bash
npm run dev
```

That's it! 🎉 Images will now upload to Cloudinary!

---

## 📸 How to Use

### Option 1: Use the ImageUpload Component (Recommended)

```tsx
import ImageUpload from '@/components/ImageUpload';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      value={imageUrl}
      onChange={(url) => setImageUrl(url)}
      onRemove={() => setImageUrl('')}
      label="Upload Restaurant Logo"
      aspectRatio="square" // "square" | "video" | "banner"
      folder="restaurant-logos"
    />
  );
}
```

### Option 2: Update Existing Components

I can help you integrate this into:
- ✅ **Profile Page** - Logo, Banner, Restaurant Picture
- ✅ **Menu Page** - Menu item images
- ✅ **Customer Modal** - Profile pictures (if needed)

---

## 🎨 Component Features

✨ **Drag & Drop** - Or click to browse files  
📱 **Responsive** - Works on all devices  
👀 **Live Preview** - See images immediately  
⚡ **Fast Upload** - Direct to Cloudinary CDN  
🔒 **Secure** - Server-side signed uploads  
✅ **Validation** - File type & size checking  
🎯 **Aspect Ratios** - Square, Video (16:9), Banner (21:9)  
🗂️ **Organized** - Auto-folders for different image types  

---

## 📁 Image Organization

All images are automatically organized:

```
cloudinary.com/your-cloud/
├── restaurant-logos/       # Restaurant logos (square)
├── restaurant-banners/     # Header banners (21:9)
├── restaurant-pictures/    # Main pictures (16:9)
├── menu-items/            # Menu item photos
└── gallery/               # Restaurant gallery
```

---

## 🎁 FREE Tier Limits

Cloudinary's free plan includes:
- ✅ **25 GB Storage**
- ✅ **25 GB Monthly Bandwidth**
- ✅ **25,000 Transformations/month**
- ✅ **Unlimited uploads**

Perfect for development and small production apps!

---

## 🔧 Vercel Deployment

Add these to your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings
2. Navigate to **Environment Variables**
3. Add these 3 variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Select **All Environments** (Production, Preview, Development)
5. Save and **Redeploy**

---

## 💡 Usage Examples

### Restaurant Profile Page

```tsx
// Logo Upload (Square)
<ImageUpload
  value={formData.logo_url}
  onChange={(url) => setFormData({ ...formData, logo_url: url })}
  onRemove={() => setFormData({ ...formData, logo_url: '' })}
  label="Upload Logo"
  aspectRatio="square"
  folder="restaurant-logos"
  disabled={!isEditing}
/>

// Banner Upload (Wide)
<ImageUpload
  value={formData.banner_url}
  onChange={(url) => setFormData({ ...formData, banner_url: url })}
  onRemove={() => setFormData({ ...formData, banner_url: '' })}
  label="Upload Banner"
  aspectRatio="banner"
  folder="restaurant-banners"
  disabled={!isEditing}
/>

// Restaurant Picture (16:9)
<ImageUpload
  value={formData.restaurant_picture_url}
  onChange={(url) => setFormData({ ...formData, restaurant_picture_url: url })}
  onRemove={() => setFormData({ ...formData, restaurant_picture_url: '' })}
  label="Upload Restaurant Picture"
  aspectRatio="video"
  folder="restaurant-pictures"
  disabled={!isEditing}
/>
```

### Menu Item Upload

```tsx
<ImageUpload
  value={menuItem.image_url}
  onChange={(url) => setMenuItem({ ...menuItem, image_url: url })}
  label="Upload Menu Item Photo"
  aspectRatio="square"
  folder="menu-items"
/>
```

---

## 🛠️ Next Steps

### Want me to integrate Cloudinary into your pages?

I can update:
1. **Profile Page** - Replace old upload handlers with ImageUpload component
2. **Menu Page** - Add Cloudinary upload for menu items
3. **Customer Modal** - Add profile picture uploads (optional)

Just let me know which pages you want updated!

---

## 📚 Documentation

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Next.js Integration](https://cloudinary.com/documentation/next_integration)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)

---

## 🎯 Benefits Over Local Upload

✅ **No Server Storage** - Images stored on Cloudinary CDN  
✅ **Global CDN** - Fast loading worldwide  
✅ **Auto Optimization** - Images auto-optimized for web  
✅ **Responsive Images** - Auto-resize for different devices  
✅ **Backup & Security** - Professional hosting  
✅ **Image Transformations** - Resize, crop, filter on-the-fly  

---

## ❓ Troubleshooting

**Q: Upload not working?**  
A: Check `.env.local` variables are set correctly and dev server restarted

**Q: "Signature mismatch" error?**  
A: Verify your API Secret is correct (no extra spaces)

**Q: Images not loading?**  
A: Check browser console, verify Cloudinary account is active

**Q: Need help?**  
A: Just ask! I'm here to help integrate this anywhere you need.

---

## 🎉 You're All Set!

Your admin panel now has professional-grade image management powered by Cloudinary!

**What would you like me to do next?**
- 🔧 Integrate ImageUpload into Profile page?
- 📸 Add to Menu Management page?
- 🎨 Customize upload UI?
- 🚀 Something else?
