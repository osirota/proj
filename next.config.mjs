/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
        {
          source: '/faceit',
          destination: 'https://www.faceit.com',
          permanent: false,
          basePath: false
        },
      ]
    },
   images: {
      loader: 'custom',
      loaderFile: './img/loader.js',
    },
};

export default nextConfig;
