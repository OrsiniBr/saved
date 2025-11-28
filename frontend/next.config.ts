const nextConfig = {
  webpack: (config: any) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@base-org/account": false,
      "@coinbase/wallet-sdk": false,
      "@metamask/sdk": false,
      "@safe-global/safe-apps-provider": false,
      "@safe-global/safe-apps-sdk": false,
      "@walletconnect/ethereum-provider": false,
    };
    return config;
  },
};

export default nextConfig;
