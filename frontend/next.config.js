module.exports = {
    i18n: {
        locales: ['en', 'es'], 
        defaultLocale: 'en',
    },
    webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback.fs = false;
    }
        return config;
    },
    images: {
        domains: [
            '*',
            'unsplash.com',
            'pexels.com',
            'images.pexels.com',
            'localhost',
        ],
    },
}