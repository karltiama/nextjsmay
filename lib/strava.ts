const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

const userId = 120103378; // 👈 Your strava user id, can be found by visiting your strava profile and checking the url
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${userId}`;

const getAccessToken = async () => {
	const body = JSON.stringify({
		client_id: clientId,
		client_secret: clientSecret,
		refresh_token: refreshToken,
		grant_type: "refresh_token",
	});

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body,
	});

	return response.json();
};

export const getActivities = async () => {
	const { access_token: accessToken } = await getAccessToken();
	const response = await fetch(
		`${ATHLETES_ENDPOINT}/activities?access_token=${accessToken}`
	);
	const json = await response.json();

	const publicActivities = json.filter(
		(activity: ActivityType) => activity.visibility === "everyone"
	);

	return publicActivities;
};
