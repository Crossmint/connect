/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
        };
        return config;
    },
};

