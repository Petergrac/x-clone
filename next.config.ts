import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname:'github.com'
      },
       {
        protocol: 'https',
        hostname:'avatars.githubusercontent.com'
      },
      {
        protocol:'https',
        hostname:'picsum.photos'
      }
    ]
  }
};

export default nextConfig;
