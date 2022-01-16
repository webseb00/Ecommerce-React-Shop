module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.chec.io'],
  },
  env: {
    NEXT_PUBLIC_CHEC_PUBLIC_KEY: process.env.NEXT_APP_CHEC_PUBLIC_KEY,
  }
}
