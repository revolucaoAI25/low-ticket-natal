/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // CSS embutido no HTML: a página pinta sem esperar o arquivo .css (melhor connect rate).
  experimental: { inlineCss: true },
};
export default nextConfig;
