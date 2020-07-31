const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
        logo: ['Permanent Marker'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(236,201,75,1)',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled'],
  },
  plugins: [],
}
