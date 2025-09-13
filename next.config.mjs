/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com', // GitHub avatars
            'lh3.googleusercontent.com'       // Google avatars
        ],
    },
    webpack: (config, { isServer }) => {
        // Handle ONNX runtime binaries
        if (!isServer) {
            // For client-side, exclude problematic modules
            config.externals = config.externals || [];
            config.externals.push({
                'onnxruntime-node': 'onnxruntime-node'
            });
        }

        // Ignore ONNX runtime binary files
        config.module.rules.push({
            test: /\.node$/,
            use: 'ignore-loader'
        });

        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ['onnxruntime-node']
    }
};

export default nextConfig;
