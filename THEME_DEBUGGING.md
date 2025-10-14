# 🔧 Theme Toggle Debugging Guide

## Issue

Theme toggle button is not switching between light and dark modes.

## Fixes Applied

### 1. **Updated `app/layout.tsx`**

- Added inline script to prevent flash of unstyled content (FOUC)
- Script runs before React hydration to apply theme immediately
- Removed background colors from body (now handled by LayoutWrapper)

### 2. **Simplified `lib/theme-context.tsx`**

- Extracted `applyTheme` function for reusability
- Added console logging for debugging
- Fixed mounted state handling

### 3. **Added Debug Logging**

Console will now show:

- "Toggling theme from [current] to [new]"
- "Theme applied. HTML classes: [classes]"

---

## How to Test

### Step 1: Open Browser DevTools

1. Press **F12** or right-click → Inspect
2. Go to **Console** tab

### Step 2: Click Theme Toggle Button

1. Click the Sun/Moon icon in the navbar
2. Watch the Console for debug messages

### Step 3: Verify Theme Changes

**Expected Console Output:**

```
Toggling theme from light to dark
Theme applied. HTML classes: dark
```

**Expected Visual Changes:**

- Background: `#f8fafc` (light) → `#0f172a` (dark)
- Navbar: `#f1f5f9` (light) → `rgba(15, 23, 42, 0.95)` (dark)
- Text: Dark text → Light text
- Icons: Moon → Sun (or vice versa)

### Step 4: Check HTML Element

In DevTools **Elements** tab:

1. Inspect the `<html>` element
2. When **dark mode is active**, you should see:
   ```html
   <html lang="en" class="dark"></html>
   ```
3. When **light mode is active**:
   ```html
   <html lang="en" class=""></html>
   ```

### Step 5: Check localStorage

In DevTools **Application** tab:

1. Go to **Local Storage** → `http://localhost:3001`
2. Look for key: `theme`
3. Value should be: `"light"` or `"dark"`

---

## Common Issues & Solutions

### Issue 1: No Console Logs Appearing

**Cause**: Theme toggle not being called  
**Fix**: Check if click event is firing

```javascript
// Add to Navbar.tsx onClick
onClick={() => {
  console.log("Button clicked!");
  toggleTheme();
}}
```

### Issue 2: Console Shows Toggle But No Visual Change

**Cause**: CSS classes not applying  
**Fix**:

1. Check if `dark` class exists in HTML element
2. Verify Tailwind `darkMode: 'class'` in config
3. Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue 3: Theme Doesn't Persist on Reload

**Cause**: localStorage not being read  
**Fix**: Check Application → Local Storage for `theme` key

### Issue 4: Components Still Show Light Colors in Dark Mode

**Cause**: Components using old color classes  
**Fix**: Components need to use `dark:` variants

```tsx
// ❌ Wrong
className = "bg-white text-gray-800";

// ✅ Correct
className = "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100";
```

---

## Manual Testing Checklist

- [ ] Click theme toggle button
- [ ] Console shows toggle message
- [ ] HTML element has/removes `dark` class
- [ ] Background color changes
- [ ] Navbar color changes
- [ ] Text colors invert
- [ ] Icon changes (Sun ↔ Moon)
- [ ] localStorage has `theme` key
- [ ] Theme persists after page reload
- [ ] All cards change color
- [ ] Sidebar active state visible in both modes

---

## Quick Fix Commands

### Clear Browser Cache

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Check Current Theme State

Open Console and run:

```javascript
console.log("Current theme:", localStorage.getItem("theme"));
console.log("HTML classes:", document.documentElement.className);
```

### Force Set Theme

Open Console and run:

```javascript
// Force dark mode
localStorage.setItem("theme", "dark");
document.documentElement.classList.add("dark");
location.reload();

// Force light mode
localStorage.setItem("theme", "light");
document.documentElement.classList.remove("dark");
location.reload();
```

---

## If Still Not Working

1. **Hard Reload**: Ctrl+Shift+R or Cmd+Shift+R
2. **Clear Cache**: DevTools → Network tab → Disable cache
3. **Restart Dev Server**: Stop (Ctrl+C) and run `npm run dev` again
4. **Check Tailwind Config**: Verify `darkMode: 'class'` exists
5. **Inspect Element**: Manually check if classes are being applied

---

## Expected File Changes

✅ `app/layout.tsx` - Added theme initialization script  
✅ `lib/theme-context.tsx` - Added debug logging  
✅ `tailwind.config.ts` - Has `darkMode: 'class'`  
✅ `app/globals.css` - Import order fixed

---

**Next Steps**:

1. Open the app in browser
2. Open DevTools Console
3. Click the theme toggle
4. Report what you see in the console

If you see the console logs, the toggle is working and we need to fix CSS.  
If you don't see console logs, the click event isn't firing.
