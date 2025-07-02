import bronzeBadge from "../../../assets/bronze.png";

// Import tier badge images (create fallbacks if not available)
const getTierBadge = (tier) => {
  const badges = {
    Bronze: bronzeBadge,
    Silver: bronzeBadge, // Fallback to bronze for now
    Gold: bronzeBadge, // Fallback to bronze for now
    Platinum: bronzeBadge, // Fallback to bronze for now
  };

  return badges[tier] || bronzeBadge;
};

// Tier theme configurations
export const tierThemes = {
  Bronze: {
    name: "Bronze",
    badge: getTierBadge("Bronze"),
    colors: {
      primary: "#E39C75",
      secondary: "#CD8A61",
      accent: "#B87347",
      background: {
        primary: "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100",
        card: "bg-white",
        overlay: "bg-gradient-to-r from-orange-100/20 to-amber-100/20",
      },
      text: {
        primary: "#4A4A4A",
        secondary: "#737373",
        muted: "#828282",
        points: "#8E8E8E",
      },
      progress: {
        background: "#F3E8D7",
        fill: "#E39C75",
        gradient: "bg-gradient-to-r from-orange-400 to-amber-500",
      },
      border: "#E39C75",
      shadow: "shadow-orange-100/50",
    },
    styles: {
      cardBorder: "border-2 border-orange-200/30",
      badgeGlow: "drop-shadow-lg filter",
      progressBar: "bg-gradient-to-r from-orange-400 to-amber-500",
      welcomeText: "text-orange-600/80",
    },
  },

  Silver: {
    name: "Silver",
    badge: getTierBadge("Silver"),
    colors: {
      primary: "#C0C0C0",
      secondary: "#A8A8A8",
      accent: "#909090",
      background: {
        primary: "bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100",
        card: "bg-white",
        overlay: "bg-gradient-to-r from-gray-100/20 to-slate-100/20",
      },
      text: {
        primary: "#2F2F2F",
        secondary: "#565656",
        muted: "#737373",
        points: "#666666",
      },
      progress: {
        background: "#E8E8E8",
        fill: "#C0C0C0",
        gradient: "bg-gradient-to-r from-gray-400 to-slate-500",
      },
      border: "#C0C0C0",
      shadow: "shadow-gray-200/50",
    },
    styles: {
      cardBorder: "border-2 border-gray-200/40",
      badgeGlow: "drop-shadow-lg filter",
      progressBar: "bg-gradient-to-r from-gray-400 to-slate-500",
      welcomeText: "text-gray-600/80",
    },
  },

  Gold: {
    name: "Gold",
    badge: getTierBadge("Gold"),
    colors: {
      primary: "#FFD700",
      secondary: "#F4C430",
      accent: "#DAA520",
      background: {
        primary: "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100",
        card: "bg-white",
        overlay: "bg-gradient-to-r from-yellow-100/20 to-amber-100/20",
      },
      text: {
        primary: "#2F2F2F",
        secondary: "#4A4A4A",
        muted: "#666666",
        points: "#555555",
      },
      progress: {
        background: "#FFF9E6",
        fill: "#FFD700",
        gradient: "bg-gradient-to-r from-yellow-400 to-amber-500",
      },
      border: "#FFD700",
      shadow: "shadow-yellow-200/50",
    },
    styles: {
      cardBorder: "border-2 border-yellow-200/40",
      badgeGlow: "drop-shadow-xl filter",
      progressBar: "bg-gradient-to-r from-yellow-400 to-amber-500",
      welcomeText: "text-yellow-600/80",
    },
  },

  Platinum: {
    name: "Platinum",
    badge: getTierBadge("Platinum"),
    colors: {
      primary: "#E5E4E2",
      secondary: "#D3D3D3",
      accent: "#B8B8B8",
      background: {
        primary: "bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100",
        card: "bg-white",
        overlay: "bg-gradient-to-r from-slate-100/20 to-zinc-100/20",
      },
      text: {
        primary: "#1F1F1F",
        secondary: "#2F2F2F",
        muted: "#4A4A4A",
        points: "#333333",
      },
      progress: {
        background: "#F5F5F5",
        fill: "#E5E4E2",
        gradient: "bg-gradient-to-r from-slate-400 to-zinc-500",
      },
      border: "#E5E4E2",
      shadow: "shadow-slate-200/50",
    },
    styles: {
      cardBorder: "border-2 border-slate-200/40",
      badgeGlow: "drop-shadow-xl filter",
      progressBar: "bg-gradient-to-r from-slate-400 to-zinc-500",
      welcomeText: "text-slate-600/80",
    },
  },
};

// Helper function to get theme by tier name
export const getTierTheme = (tierName) => {
  const normalizedTier =
    tierName?.charAt(0).toUpperCase() + tierName?.slice(1).toLowerCase();
  return tierThemes[normalizedTier] || tierThemes.Bronze;
};

// Tier progression thresholds
export const tierThresholds = {
  Bronze: { min: 0, max: 4999, next: "Silver", nextThreshold: 5000 },
  Silver: { min: 5000, max: 14999, next: "Gold", nextThreshold: 15000 },
  Gold: { min: 15000, max: 49999, next: "Platinum", nextThreshold: 50000 },
  Platinum: { min: 50000, max: Infinity, next: null, nextThreshold: null },
};

// Helper function to get next tier information
export const getNextTierInfo = (currentTier, currentPoints) => {
  const tier = tierThresholds[currentTier];
  if (!tier || !tier.next) {
    return {
      nextTier: null,
      pointsToNext: 0,
      isMaxTier: true,
      progressPercent: 100,
    };
  }

  const pointsToNext = tier.nextThreshold - currentPoints;
  const progressPercent = Math.min(
    (currentPoints / tier.nextThreshold) * 100,
    100
  );

  return {
    nextTier: tier.next,
    pointsToNext: Math.max(pointsToNext, 0),
    isMaxTier: false,
    progressPercent,
  };
};
