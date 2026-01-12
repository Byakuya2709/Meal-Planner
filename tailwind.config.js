// tailwind.config.js - REFACTORED
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ===== FONTS ===== */
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        allura: ['"Allura"', 'cursive'],
        bangers: ['"Bangers"', 'cursive'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        bonheur: ['"Bonheur Royale"', 'cursive'],
        caveat: ['"Caveat"', 'cursive'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        grenze: ['"Grenze Gotisch"', 'serif'],
        imfell: ['"IM Fell English SC"', 'serif'],
        indie: ['"Indie Flower"', 'cursive'],
        lato: ['"Lato"', 'sans-serif'],
        lobster: ['"Lobster"', 'cursive'],
        meow: ['"Meow Script"', 'cursive'],
        modern: ['"Modern Antiqua"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        moolah: ['"Moo Lah Lah"', 'cursive'],
        nova: ['"Nova Square"', 'sans-serif'],
        roadrage: ['"Road Rage"', 'sans-serif'],
        robotoflex: ['"Roboto Flex"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        sacramento: ['"Sacramento"', 'cursive'],
        sawarabi: ['"Sawarabi Gothic"', 'sans-serif'],
        spectral: ['"Spectral SC"', 'serif'],
        vt323: ['"VT323"', 'monospace'],
      },

      /* ===== COLORS - CSS VARIABLES ===== */
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          200: 'rgb(var(--color-primary-200))',
          300: 'rgb(var(--color-primary-300))',
          400: 'rgb(var(--color-primary-400))',
          500: 'rgb(var(--color-primary-500))',
          600: 'rgb(var(--color-primary-600))',
          700: 'rgb(var(--color-primary-700))',
          800: 'rgb(var(--color-primary-800))',
          900: 'rgb(var(--color-primary-900))',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50))',
          100: 'rgb(var(--color-secondary-100))',
          200: 'rgb(var(--color-secondary-200))',
          300: 'rgb(var(--color-secondary-300))',
          400: 'rgb(var(--color-secondary-400))',
          500: 'rgb(var(--color-secondary-500))',
          600: 'rgb(var(--color-secondary-600))',
          700: 'rgb(var(--color-secondary-700))',
          800: 'rgb(var(--color-secondary-800))',
          900: 'rgb(var(--color-secondary-900))',
        },
        accent: {
          50: 'rgb(var(--color-accent-50))',
          100: 'rgb(var(--color-accent-100))',
          200: 'rgb(var(--color-accent-200))',
          300: 'rgb(var(--color-accent-300))',
          400: 'rgb(var(--color-accent-400))',
          500: 'rgb(var(--color-accent-500))',
          600: 'rgb(var(--color-accent-600))',
          700: 'rgb(var(--color-accent-700))',
          800: 'rgb(var(--color-accent-800))',
          900: 'rgb(var(--color-accent-900))',
        },
        neutral: {
          50: 'rgb(var(--color-neutral-50))',
          100: 'rgb(var(--color-neutral-100))',
          200: 'rgb(var(--color-neutral-200))',
          300: 'rgb(var(--color-neutral-300))',
          400: 'rgb(var(--color-neutral-400))',
          500: 'rgb(var(--color-neutral-500))',
          600: 'rgb(var(--color-neutral-600))',
          700: 'rgb(var(--color-neutral-700))',
          800: 'rgb(var(--color-neutral-800))',
          900: 'rgb(var(--color-neutral-900))',
        },
        success: 'rgb(var(--color-success))',
        warning: 'rgb(var(--color-warning))',
        error: 'rgb(var(--color-error))',
        info: 'rgb(var(--color-info))',
      },

      /* ===== SPACING ===== */
      spacing: {
        18: '4.5rem',
        88: '22rem',
        100: '25rem',
        112: '28rem',
        128: '32rem',
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ===== BOX SHADOW ===== */
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        float: '0 8px 24px rgba(0, 0, 0, 0.12)',
        glow: '0 0 40px rgba(16, 191, 160, 0.15)',
        'glow-lg': '0 0 60px rgba(16, 191, 160, 0.25)',
      },

      /* ===== ANIMATIONS ===== */
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        gradient: 'gradient 8s ease infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },

      /* ===== KEYFRAMES ===== */
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};