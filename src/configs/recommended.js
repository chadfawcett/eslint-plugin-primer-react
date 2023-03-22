module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['primer-react', 'github'],
  extends: ['plugin:github/react'],
  rules: {
    'primer-react/direct-slot-children': 'error',
    'primer-react/no-deprecated-colors': 'warn',
    'primer-react/no-system-props': 'warn'
  },
  settings: {
    github: {
      components: {
        Link: {props: {as: {undefined: 'a', a: 'a', button: 'button'}}},
        Button: {default: 'button'}
      }
    },
    'jsx-a11y': {
      components: {
        Button: 'button',
        IconButton: 'button'
      }
    }
  }
}
