# 🎨 Dual Theme System Documentation

## Overview

This Restaurant Management Admin Panel features a modern dual theme system (Dark & Light modes) with smooth transitions and persistent theme preferences.

---

## 🌑 Dark Mode Color Palette

| Element              | Color     | Tailwind Class                  |
| -------------------- | --------- | ------------------------------- |
| **Background**       | `#0f172a` | `bg-slate-900`                  |
| **Card/Panel**       | `#1e293b` | `bg-slate-800`                  |
| **Navbar/Sidebar**   | `#111827` | `bg-slate-900/95`               |
| **Text Primary**     | `#f8fafc` | `text-slate-100`                |
| **Text Secondary**   | `#94a3b8` | `text-slate-400`                |
| **Border**           | `#334155` | `border-slate-700`              |
| **Accent (Primary)** | `#3b82f6` | `text-blue-500` / `bg-blue-500` |
| **Success**          | `#22c55e` | `text-green-500`                |
| **Danger**           | `#ef4444` | `text-red-500`                  |
| **Hover/Active**     | `#1e40af` | `hover:bg-blue-600`             |

---

## ☀️ Light Mode Color Palette

| Element              | Color     | Tailwind Class                  |
| -------------------- | --------- | ------------------------------- |
| **Background**       | `#f8fafc` | `bg-slate-50`                   |
| **Card/Panel**       | `#ffffff` | `bg-white`                      |
| **Navbar/Sidebar**   | `#f1f5f9` | `bg-slate-100`                  |
| **Text Primary**     | `#0f172a` | `text-slate-900`                |
| **Text Secondary**   | `#475569` | `text-slate-600`                |
| **Border**           | `#e2e8f0` | `border-slate-200`              |
| **Accent (Primary)** | `#2563eb` | `text-blue-600` / `bg-blue-600` |
| **Success**          | `#16a34a` | `text-green-600`                |
| **Danger**           | `#dc2626` | `text-red-600`                  |
| **Hover/Active**     | `#1d4ed8` | `hover:bg-blue-700`             |

---

## 🧠 Theme Behavior

### Storage & Persistence

- Theme preference is stored in **localStorage**
- Auto-applies theme on page reload
- Key: `theme` with values `"light"` or `"dark"`

### Toggle Button

- Located in top-right navbar
- Sun icon (☀️) for dark mode → switches to light
- Moon icon (🌙) for light mode → switches to dark
- Smooth icon transition with hover effects

### Transitions

All theme changes use smooth transitions:

```css
transition-all duration-300 ease-in-out
```

---

## 🧩 Design Enhancements

### Typography

- **Font Family**: Inter (Google Fonts)
- **Fallback**: System UI fonts
- Modern, clean, and highly readable

### Card Styles

- **Border Radius**: `rounded-2xl` for premium look
- **Shadows**:
  - Default: `shadow-md`
  - Hover: `shadow-lg`
  - Transition: `transition-all duration-300`

### Glass Effect (Dark Mode Cards)

Cards in dark mode feature a subtle glass morphism effect:

```css
backdrop-blur-md bg-slate-800/70 border border-slate-700/50
```

### Active Sidebar Item

When a sidebar menu item is active:

- **Background**: `bg-blue-600/20` (dark) or `bg-blue-500/20` (light)
- **Left Border**: `border-l-4 border-blue-500`
- **Text Color**: `text-blue-600` (light) or `text-blue-400` (dark)
- **Font Weight**: `font-medium`

---

## 📁 Modified Files

### Core Configuration

1. **`tailwind.config.ts`** - Extended theme colors and font family
2. **`app/globals.css`** - Global styles, Inter font import, smooth transitions
3. **`lib/theme-context.tsx`** - Theme state management (existing)

### Components

1. **`components/Navbar.tsx`** - Enhanced theme toggle button
2. **`components/Sidebar.tsx`** - Active state styling with border accent
3. **`components/StatCard.tsx`** - Glass effect cards with modern styling
4. **`components/LayoutWrapper.tsx`** - Background color application

### Pages

1. **`app/dashboard/page.tsx`** - Updated with new color scheme

---

## 🔧 Tailwind Config Extensions

```typescript
theme: {
  extend: {
    colors: {
      background: {
        light: '#f8fafc',
        dark: '#0f172a',
      },
      card: {
        light: '#ffffff',
        dark: '#1e293b',
      },
      accent: {
        light: '#2563eb',
        dark: '#3b82f6',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
},
darkMode: 'class',
```

---

## 📝 Usage Guidelines

### Adding New Components

When creating new components, follow this pattern:

```tsx
// Light/Dark text
<p className="text-slate-900 dark:text-slate-100">Primary Text</p>
<p className="text-slate-600 dark:text-slate-400">Secondary Text</p>

// Cards
<div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
  Card content
</div>

// Buttons
<button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
  Click me
</button>

// Inputs
<input className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500" />
```

### Smooth Transitions

Always include transition classes for interactive elements:

```tsx
transition-all duration-300 ease-in-out
```

---

## ✨ Best Practices

1. **Consistency**: Use slate color palette throughout
2. **Contrast**: Ensure text has sufficient contrast in both modes
3. **Transitions**: Apply smooth transitions to all interactive elements
4. **Hover States**: Provide clear visual feedback on hover
5. **Glass Effect**: Use sparingly for premium sections in dark mode
6. **Shadows**: Layer shadows (md → lg) for depth

---

## 🎯 Testing Checklist

- [ ] Theme toggle works in navbar
- [ ] Theme persists after page reload
- [ ] All text is readable in both modes
- [ ] Cards have proper shadows and borders
- [ ] Sidebar active state is clearly visible
- [ ] Buttons have hover effects
- [ ] Transitions are smooth (300ms)
- [ ] No flash of wrong theme on load
- [ ] Forms and inputs are styled correctly
- [ ] Icons have appropriate colors

---

## 🚀 Future Enhancements

- System preference detection (auto-detect OS theme)
- Additional theme variants (e.g., high contrast)
- Customizable accent colors
- Theme preview before applying
- Animations for theme transitions

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Theme Engine**: Tailwind CSS + React Context API
