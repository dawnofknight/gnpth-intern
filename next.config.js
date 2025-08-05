/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // Ignore node:test and other node: modules
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^node:/
      })
    )
    
    // Fallback for browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    return config
  },
}

module.exports = nextConfig