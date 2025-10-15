import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { connectOrCreateWallet } = usePrivy();
	const { ready } = useWallets();

	console.log(ready); // remove
	return (
		<div className="min-h-screen min-w-screen rounded-lg flex flex-col p-4 border-[1px] border-black">
			<section className="flex-1 border-[1px] border-black">
				<button
					type="button"
					onClick={connectOrCreateWallet}
					className="w-40 h-20 bg-blue-400 rounded-xl"
				>
					connect
				</button>
			</section>
		</div>
	);
}
