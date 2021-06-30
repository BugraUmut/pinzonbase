module.exports = {
  purge: {
    enabled: false,
    content: ['./views/**/*.ejs']
  },
  darkMode: true, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif']
    },
    extend: {
      backgroundImage: theme => ({
        'auth-image': 'url("https://picsum.photos/1080")'
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
