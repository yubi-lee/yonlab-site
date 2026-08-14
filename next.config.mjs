/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export is the production target: the site is served by the
  // `yonlab-site` Cloudflare Worker as static assets, so `npm run build`
  // (the configured Workers Builds command) must produce ./out directly.
  // Every route is prerendered, so no server runtime is needed. Image
  // optimization requires a server, hence `unoptimized`.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
