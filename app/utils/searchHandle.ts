const searchHandle = (value: string, setIsLoading: any, changeValue: any) => {
	setIsLoading(true);
	const FACEIT_URL_REGEX =
		/^https?:\/\/(www\.)?faceit\.com\/(?:[a-z]{2}\/)?players\/([a-zA-Z0-9_-]+)\/?$/;
	const FACEIT_NAME_REGEX = /^[a-zA-Z0-9_-]+$/;
	const FACEIT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
	const STEAM_ID_REGEX = /^STEAM_[0-5]:[01]:\d+$/;
	const STEAM_ID_URL_REGEX =
		/^https?:\/\/(www\.)?steamcommunity\.com\/id\/([a-zA-Z0-9_-]+)\/?$/;
	const STEAM_PROFILES_URL_REGEX =
		/^https?:\/\/(www\.)?steamcommunity\.com\/profiles\/([a-zA-Z0-9_-]+)\/?$/;
	const FACEIT_ROOM_URL_REGEX =
		/^https?:\/\/(www\.)?faceit\.com\/(?:[a-z]{2}\/)?csgo\/room\/([a-zA-Z0-9_-]+)\/?$/;

	const isFaceitUrl = FACEIT_URL_REGEX.test(value);
	const isFaceitName = FACEIT_NAME_REGEX.test(value);
	const isFaceitId = FACEIT_ID_REGEX.test(value);
	const isSteamId = STEAM_ID_REGEX.test(value);
	const isSteamIdUrl = STEAM_ID_URL_REGEX.test(value);
	const isSteamProfileUrl = STEAM_PROFILES_URL_REGEX.test(value);
	const isRoom = FACEIT_ROOM_URL_REGEX.test(value);

	let id;
	switch (true) {
		case isFaceitUrl:
			const isFaceitUrlRes = value.match(FACEIT_URL_REGEX);
			id = isFaceitUrlRes ? isFaceitUrlRes[2] : null;
			break;
		case isFaceitName:
		case isFaceitId:
		case isSteamId:
			id = value;
			break;
		case isSteamIdUrl:
			const isSteamIdUrlRes = value.match(STEAM_ID_URL_REGEX);
			id = isSteamIdUrlRes ? isSteamIdUrlRes[2] : null;
			break;
		case isSteamProfileUrl:
			const isSteamProfileUrlRes = value.match(STEAM_PROFILES_URL_REGEX);
			id = isSteamProfileUrlRes ? isSteamProfileUrlRes[2] : null;
			break;
	}
	setIsLoading(false);
	changeValue('');
	if (isSteamIdUrl) {
		return `/profile/${id}?platform=steam`;
	}
	if (isRoom) {
		return `/room/${id}`;
	}
	if (isSteamProfileUrl) {
		return `/profile/${id}?platform=steam`;
	}
	if (isFaceitUrl || isFaceitName || isFaceitId) {
		return `/profile/${id}?platform=faceit`;
	}
   return '/';
};

export default searchHandle;
