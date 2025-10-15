import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { env } from "@/env";
import { privyConfig } from "../privy/config";
import { config } from "./config";

export function getContext() {
	const queryClient = new QueryClient();
	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	const appId = env.VITE_PUBLIC_PRIVY_APP_ID;

	if (!appId) {
		console.warn(
			"VITE_PUBLIC_PRIVY_APP_ID is not set. Privy authentication will not work.",
		);
	}

	return (
		<PrivyProvider appId={appId || "placeholder"} config={privyConfig}>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider config={config}>{children}</WagmiProvider>
			</QueryClientProvider>
		</PrivyProvider>
	);
}
