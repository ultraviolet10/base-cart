import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { base, baseSepolia, mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
	chains: [mainnet, sepolia, base, baseSepolia],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[base.id]: http(),
		[baseSepolia.id]: http(),
	},
});
