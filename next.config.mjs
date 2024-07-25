/** @type {import('next').NextConfig} */
const nextConfig = {
  // Github pages 
  // Comment to run dev
  output: "export",
  basePath: "/nextjs-github-pages",
  images: {
    unoptimized: true,
  },
  // end
  reactStrictMode: true,

};

export default nextConfig;
