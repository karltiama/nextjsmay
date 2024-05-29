"use client";

export default function Home() {
	const handleClick = (): void => {
		const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID; // Ensure this is set in your .env.local
		const redirectUri = encodeURIComponent(
			"http://localhost:3000/api/auth/callback/strava"
		); // Update as per your deployment
		const scope = encodeURIComponent("read,activity:read");
		const responseType = "code";

		const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

		// Redirect the user to Strava's authorization page
		window.location.href = stravaAuthUrl;
	};

	return (
		<main className="">
			<section className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">
				<h1 className="text-3xl sm:text-5xl md:text-6xl font-black">
					Connect with Strava!
				</h1>
				<button
					onClick={handleClick}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Sign in
				</button>
			</section>
		</main>
	);
}
