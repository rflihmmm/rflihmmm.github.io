import adapter from '@sveltejs/adapter-static'

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
    }),
    alias: {
      '@/*': './path/to/lib/*'
    },
    paths: { base: process.env.VITE_BASE_PATH || '' }
  }
}

export default config
