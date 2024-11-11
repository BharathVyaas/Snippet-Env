// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(40,46,68)", // Main background
          light: "rgb(61,68,92)", // Slightly lighter background
          dark: "rgb(28,32,48)", // Slightly darker background
        },
        accent: {
          DEFAULT: "rgb(72,208,160)", // Main text color
          light: "rgb(128,237,194)", // Light accent, for hover/active states
          dark: "rgb(38,178,130)", // Dark accent, for shadow or outlines
        },
        background: {
          main: "rgb(40,46,68)", // Main app background
          panel: "rgb(61,68,92)", // Panels or secondary backgrounds
          card: "rgb(50,55,80)", // Card background
          highlight: "rgb(48,58,72)", // Highlighted sections
        },
        text: {
          primary: "rgb(72,208,160)", // Main text color
          secondary: "rgb(190,210,224)", // Secondary text color
          muted: "rgb(130,150,160)", // Muted/inactive text
        },
        border: {
          light: "rgb(70,85,105)", // Light borders, for cards/panels
          dark: "rgb(40,50,70)", // Dark borders, for deep sections
        },
        // Additional colors for success, error, info, and warning messages
        success: "rgb(72,208,160)", // Success messages
        error: "rgb(235,87,87)", // Error states or alerts
        warning: "rgb(245,203,92)", // Warnings
        info: "rgb(104,180,255)", // Info messages or badges
      },
    },
  },
  plugins: [],
};
