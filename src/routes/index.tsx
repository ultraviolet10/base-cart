import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { connectOrCreateWallet } = usePrivy();
	const { ready } = useWallets();

	const handleConnect = useCallback(() => {
		if (!ready) {
			connectOrCreateWallet();
		}
		// route to next page - which should probably be a sign up
		// do the agent stuff here
		console.log(ready);
	}, [ready, connectOrCreateWallet]);

	return (
		<div className="min-h-screen min-w-screen rounded-lg flex flex-col p-8 border-[1px] border-black">
			<section className="flex-1 flex items-center justify-center space-x-8 p-8">
				<div className="w-full">
					<h1 className="font-sans text-6xl leading-none tracking-tighter text-pink-500 font-light">
						window shopping with
						<br />
						your favourite coins{" "}
						<img
							src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
							alt="Bitcoin"
							className="w-12 h-12 inline mx-1"
						/>
						<img
							src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
							alt="USDC"
							className="w-12 h-12 inline mx-1"
						/>
						<img
							src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
							alt="Ethereum"
							className="w-12 h-12 inline mx-1"
						/>
						<br />
						on base 🟦
					</h1>
				</div>

				<button
					className="w-48 h-10 rounded-xl bg-gray-100"
					type="button"
					onClick={handleConnect}
				>
					connect
				</button>
			</section>
		</div>
	);
}
