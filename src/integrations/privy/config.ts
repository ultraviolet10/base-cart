import type { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
	embeddedWallets: {
		ethereum: {
			createOnLogin: "users-without-wallets",
		},
		showWalletUIs: true,
	},
	loginMethods: ["wallet", "email", "sms"],
	appearance: {
		showWalletLoginFirst: true,
	},
	// Add supported chains matching your wagmi config
	supportedChains: [
		// Mainnet
		{
			id: 1,
			name: "Ethereum",
			network: "mainnet",
			nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
			rpcUrls: {
				default: { http: ["https://ethereum.publicnode.com"] },
				public: { http: ["https://ethereum.publicnode.com"] },
			},
		},
		// Sepolia
		{
			id: 11155111,
			name: "Sepolia",
			network: "sepolia",
			nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
			rpcUrls: {
				default: { http: ["https://ethereum-sepolia.publicnode.com"] },
				public: { http: ["https://ethereum-sepolia.publicnode.com"] },
			},
		},
		// Base
		{
			id: 8453,
			name: "Base",
			network: "base",
			nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
			rpcUrls: {
				default: { http: ["https://base.publicnode.com"] },
				public: { http: ["https://base.publicnode.com"] },
			},
		},
		// Base Sepolia
		{
			id: 84532,
			name: "Base Sepolia",
			network: "base-sepolia",
			nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
			rpcUrls: {
				default: { http: ["https://base-sepolia.publicnode.com"] },
				public: { http: ["https://base-sepolia.publicnode.com"] },
			},
		},
	],
};
