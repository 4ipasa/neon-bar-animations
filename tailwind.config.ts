
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Bar specific colors
        neon: {
          blue: "#00FFFF",
          purple: "#8A2BE2",
          pink: "#FF1493",
        },
        bar: {
          dark: "#080808",
          darker: "#050505",
          black: "#000000",
          card: "#0C0C0C",
          light: "#1A1A1C",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.2), 0 0 30px rgba(0,255,255,0.1)',
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0,255,255,0.7), 0 0 40px rgba(0,255,255,0.3), 0 0 60px rgba(0,255,255,0.2)',
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.2), 0 0 30px rgba(0,255,255,0.1)',
          },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
        "gradient": "gradient 8s linear infinite",
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url('/hero-bg.jpg')",
        "neon-glow": "radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)",
        "glass-card": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "neon-border": "linear-gradient(90deg, #00FFFF, #8A2BE2, #FF1493, #00FFFF)",
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
