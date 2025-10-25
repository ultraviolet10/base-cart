import { createPublicClient, createWalletClient, custom, http } from "viem";
import { base, baseSepolia, mainnet, sepolia } from "viem/chains";

// Public clients for reading blockchain data
export const publicClients = {
	[mainnet.id]: createPublicClient({
		chain: mainnet,
		transport: http(),
	}),
	[sepolia.id]: createPublicClient({
		chain: sepolia,
		transport: http(),
	}),
	[base.id]: createPublicClient({
		chain: base,
		transport: http(),
	}),
	[baseSepolia.id]: createPublicClient({
		chain: baseSepolia,
		transport: http(),
	}),
} as const;

// Wallet client for user transactions (browser only)
export const getWalletClient = () => {
	if (typeof window === "undefined" || !window.ethereum) return null;

	return createWalletClient({
		chain: mainnet, // Default chain, can be switched
		transport: custom(window.ethereum),
	});
};

// Helper to get public client by chain ID
export const getPublicClient = (chainId: number) => {
	return (
		publicClients[chainId as keyof typeof publicClients] ||
		publicClients[mainnet.id]
	);
};
