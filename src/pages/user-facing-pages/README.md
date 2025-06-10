# Kedmah Loyalty - User-Facing Pages

This directory contains the mobile-responsive user-facing pages for the Kedmah Loyalty system, designed based on the provided Figma mockups.

## 📱 Pages Overview

### 1. **UserDashboard** (`/user/dashboard`)

The main dashboard displaying:

- User profile and points balance
- Membership tier status (Bronze, Silver, Gold, Platinum)
- Available coupons grid
- Partner brands showcase
- Categories navigation
- Recent brand offers

### 2. **PointsHistory** (`/user/history`)

Points transaction history showing:

- Total points balance
- Earned vs. burned transactions
- Transaction details with dates
- Running balance after each transaction
- Load more functionality

### 3. **OffersPage** (`/user/offers`)

Product offers catalog with:

- Category-based filtering (All, Fashion, Food, Electronics, Life)
- Search functionality
- Product grid with discount badges
- Favorite/wishlist functionality
- Price comparison (original vs. discounted)

### 4. **CouponDetails** (`/user/coupon/:id`)

Individual coupon information:

- Coupon design with brand colors
- Terms and conditions
- How to redeem instructions
- Expiry date information
- Redeem button with status tracking

### 5. **UserProfile** (`/user/profile`)

User account management:

- Personal information display
- Tier progress tracking
- Points summary (earned vs. redeemed)
- Settings and preferences
- Help & support access

## 🎨 Design Features

### Mobile-First Responsive Design

- Optimized for mobile devices (iPhone-sized)
- Touch-friendly interface elements
- Smooth scrolling and animations
- Bottom navigation for easy thumb access

### Color Scheme

- **Primary**: Orange gradient (`from-orange-400 to-orange-500`)
- **Secondary**: Gray tones for content
- **Accent**: Green for positive actions, Red for negative
- **Background**: Light gray (`bg-gray-50`) for contrast

### Navigation

- **Bottom Tab Navigation**: Home, History, Offers, Profile
- **Header Navigation**: Back buttons and page titles
- **Call-to-Action**: Prominent orange buttons

## 🛠 Technical Implementation

### Components Structure

```
user-facing-pages/
├── UserDashboard.jsx     # Main dashboard
├── PointsHistory.jsx     # Transaction history
├── OffersPage.jsx        # Product offers
├── CouponDetails.jsx     # Individual coupon view
├── UserProfile.jsx       # User account
├── UserLayout.jsx        # Layout with bottom nav
├── DemoPage.jsx          # Demo showcase
├── index.js              # Component exports
└── README.md             # This file
```

### State Management

- **Zustand Store**: `useUserStore` in `/store/user.js`
- Manages user data, points, transactions, offers, and coupons
- Includes actions for updating favorites, redeeming coupons, etc.

### Routing

User pages are accessible via:

- `/demo` - Demo page to showcase all components
- `/user/dashboard` - Main dashboard
- `/user/history` - Points history
- `/user/offers` - Offers catalog
- `/user/coupon/:id` - Coupon details
- `/user/profile` - User profile

## 🚀 Usage

### Accessing the Demo

1. Start the development server: `npm run dev`
2. Navigate to `/demo` to see all pages in action
3. Use the top navigation to switch between pages

### Integration with Client Apps

The user-facing pages are designed to be embedded in client applications:

1. **Direct Link**: Clients can link to `/user/dashboard`
2. **iframe Embed**: Pages can be embedded in iframes
3. **API Integration**: Connect with your backend APIs
4. **Custom Styling**: Override CSS variables for brand colors

### Customization

To customize for different clients:

1. **Branding**: Update colors in Tailwind classes
2. **Content**: Modify dummy data in components or connect to APIs
3. **Features**: Add/remove sections based on client needs
4. **Styling**: Override default styles with client-specific CSS

## 📋 Data Structure

### User Object

```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  memberSince: string,
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
  totalPoints: number,
  pointsToNextTier: number,
  totalEarned: number,
  totalRedeemed: number,
  avatar: string | null
}
```

### Transaction Object

```javascript
{
  id: number,
  type: 'earned' | 'burned',
  points: number,
  description: string,
  date: string,
  balance: string
}
```

### Offer Object

```javascript
{
  id: number,
  title: string,
  discount: string,
  originalPrice: string,
  discountedPrice: string,
  image: string | null,
  category: string,
  brand: string
}
```

### Coupon Object

```javascript
{
  id: number,
  title: string,
  subtitle: string,
  color: string,
  code: string,
  validUntil: string,
  isRedeemed: boolean
}
```

## 🔧 Future Enhancements

1. **Push Notifications**: For new offers and points earned
2. **QR Code Integration**: For in-store point collection
3. **Social Sharing**: Share offers with friends
4. **Gamification**: Achievement badges and challenges
5. **Multi-language**: Support for Arabic and English
6. **Offline Support**: Cache data for offline viewing
7. **Biometric Auth**: Fingerprint/Face ID for secure access

## 📱 Responsive Breakpoints

- **Mobile**: Default styling (320px - 768px)
- **Tablet**: Expanded layouts (768px+)
- **Desktop**: Full-width with max constraints

## 🎯 Performance Optimizations

- Lazy loading for images
- Virtual scrolling for long lists
- Optimized re-renders with React.memo
- Efficient state management with Zustand
- Minimal bundle size with tree shaking
