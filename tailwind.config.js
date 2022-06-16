const defaultTheme = require('tailwindcss/defaultTheme')
const typography = require('@tailwindcss/typography')

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green,
      },
      scale: {
        '-1': '-1',
      },
    },
  },
  plugins: [typography, require('@kamona/tailwindcss-perspective')],
}
