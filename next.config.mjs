import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/react-web-tabs',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/react-web-tabs',
        basePath: false,
        permanent: false,
      },
    ]
  },
})
