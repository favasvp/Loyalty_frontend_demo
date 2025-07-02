# UserCard Component

The `UserCard` component is designed for user-facing pages and displays customer loyalty information including name, tier, points balance, and progress to next tier.

## Features

- Fetches real customer data from the Khedmah SDK API
- Displays customer name, tier, and points balance
- Shows progress bar to next tier
- Handles loading and error states
- Responsive design with modern UI

## URL Parameters Required

The component expects the following URL parameters:

- `customerID` - The unique customer identifier
- `apiKey` - The API key for SDK authentication

## Example Usage

### URL Format

```
http://your-app.com/customer-dashboard?customerID=CUST123&apiKey=your-api-key-here
```

### Component Integration

```jsx
import UserCard from "../components/User-Facing/UserCard";

function CustomerDashboard() {
  return (
    <div className="p-4">
      <UserCard />
    </div>
  );
}
```

## API Response Format

The component expects the following response format from the `/new-kedmah-sdk/customer` endpoint:

```json
{
  "status": 200,
  "message": "Point balance retrieved successfully",
  "data": {
    "name": "customer name",
    "email": "customer@example.com",
    "mobile": "1234567890",
    "point_balance": 217460,
    "customer_tier": {
      "en": "Bronze",
      "ar": "برونز"
    }
  }
}
```

## States

### Loading State

Shows skeleton loading animation while fetching data.

### Error State

Displays error message if:

- Missing required URL parameters (customerID or apiKey)
- API request fails
- Network errors

### Success State

Shows customer information including:

- Welcome message with customer name
- Current tier with badge
- Points balance formatted with thousand separators
- Progress bar to next tier
- Points needed to reach next tier

## Tier Progression

The component uses predefined tier thresholds:

- Bronze: 0 - 4,999 points
- Silver: 5,000 - 14,999 points
- Gold: 15,000 - 49,999 points
- Platinum: 50,000+ points

## Dependencies

- React (useState, useEffect)
- Heroicons (ChevronRightIcon)
- Custom SDK API utility (`../../api/sdk`)

## Styling

Uses Tailwind CSS with:

- Responsive design
- Poppins font family
- Custom color scheme
- Smooth animations and transitions
