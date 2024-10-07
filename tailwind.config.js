module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ], // Scanning all files for Tailwind classes
  theme: {
    extend: {
      colors: {
        // Example: adding custom colors (optional, remove if unnecessary)
        primary: '#1a202c',
        secondary: '#2d3748',
        accent: '#f6ad55',
      },
      fontFamily: {
        // Example: custom fonts (optional, remove if unnecessary)
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for styling forms (optional)
    require('@tailwindcss/typography'), // Plugin for better typography (optional)
  ],
};
