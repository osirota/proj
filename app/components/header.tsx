'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google'
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import HeaderLogo from '../../img/header-logo.svg';

const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [value, changeValue] = useState('');
	const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		changeValue(event.currentTarget.value);
	};
	const onSubmit = async (e: KeyboardEvent) => {
		sendGTMEvent({ event: 'headerSearchButton', value })
		if (e.key !== 'Enter') return;
		e.preventDefault();
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
		console.log(isSteamProfileUrl);
		if (isSteamIdUrl) {
			router.push(`/profile/${id}?platform=steam`);
			return;
		}
		if (isRoom) {
			router.push(`/room/${id}`);
			return;
		}
		if(isSteamProfileUrl) {
			router.push(`/profile/${id}?platform=steam`);
			return;
		}
		if (isFaceitUrl || isFaceitName || isFaceitId) {
			router.push(`/profile/${id}?platform=faceit`);
			return;
		}
	};
	return (
		<header className="relative z-20">
			<nav className="flex items-center justify-between gap-8 px-10 py-4 bg-fct-header border-b dark:border-gray-500/50 mx-auto">
				<Link href="/">
					<Image src={HeaderLogo} alt="Faceit Stats" width={150} height={50} />
				</Link>
				{pathname !== '/' && (
					<input
						type="text"
						value={value}
						onChange={onSearchChange}
						className="w-6/12 bg-fct-input border text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search for a player or room... (e.g. https://www.faceit.com/en/players/username, STEAM_0:0:12345678, https://steamcommunity.com/id/username, https://www.faceit.com/en/csgo/room/roomid, etc.)"
						required
						onKeyDown={onSubmit}
					/>
				)}
				<Link href="/contact">
					Contact
				</Link>
			</nav>
		</header>
	);
};

export default Header;
