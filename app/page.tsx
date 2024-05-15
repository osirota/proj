'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import Logo from './../img/faceit_logo.svg';

enum Platform {
	steam = 'steamcommunity.com',
	faceit = 'www.faceit.com',
}

export default function Home() {
	const router = useRouter();
	const [value, changeValue] = useState('');
	const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		changeValue(event.currentTarget.value);
	};
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const FACEIT_URL_REGEX =
			/^https?:\/\/(www\.)?faceit\.com\/(?:[a-z]{2}\/)?players\/([a-zA-Z0-9_-]+)\/?$/;
		const FACEIT_NAME_REGEX = /^[a-zA-Z0-9_-]+$/;
		const FACEIT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
		const STEAM_ID_REGEX = /^STEAM_[0-5]:[01]:\d+$/;
		const STEAM_URL_REGEX =
			/^https?:\/\/(www\.)?steamcommunity\.com\/(?:profiles|id)\/([a-zA-Z0-9_-]+)\/?$/;
		const FACEIT_ROOM_URL_REGEX =
			/^https?:\/\/(www\.)?faceit\.com\/(?:[a-z]{2}\/)?csgo\/room\/([a-zA-Z0-9_-]+)\/?$/;

		const isFaceitUrl = FACEIT_URL_REGEX.test(value);
		const isFaceitName = FACEIT_NAME_REGEX.test(value);
		const isFaceitId = FACEIT_ID_REGEX.test(value);
		const isSteamId = STEAM_ID_REGEX.test(value);
		const isSteamUrl = STEAM_URL_REGEX.test(value);
		const isRoom = FACEIT_ROOM_URL_REGEX.test(value);

		let id;
		if (isFaceitUrl) {
			const match = value.match(FACEIT_URL_REGEX);
			id = match ? match[2] : null;
		} else if (isFaceitName) {
			id = value;
		} else if (isFaceitId) {
			id = value;
		} else if (isSteamId) {
			id = value;
		} else if (isSteamUrl) {
			const match = value.match(STEAM_URL_REGEX);
			id = match ? match[2] : null;
		}
		if (isSteamUrl || isSteamId) {
			router.push(`/profile/${id}?platform=steam`);
			return;
		}
		if (isRoom) {
			router.push(`/room/${id}`);
			return;
		}
		if (isFaceitUrl || isFaceitName || isFaceitId) {
			router.push(`/profile/${id}?platform=faceit`);
			return;
		}
	};

	return (
		<main className="bg-fct-body antialiased flex min-h-screen flex-col p-24">
			<Image
				src={Logo}
				alt="faceit logo"
				width={450}
				height={100}
				className="mb-16 mx-auto"
			/>

			<form className="flex mx-auto w-2/3" onSubmit={onSubmit}>
				<label className="sr-only">Search</label>
				<div className="relative w-full">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
							/>
						</svg>
					</div>
					<input
						type="text"
						value={value}
						onChange={onSearchChange}
						className="bg-fct-input border text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search for a player or room... (e.g. https://www.faceit.com/en/players/username, STEAM_0:0:12345678, https://steamcommunity.com/id/username, https://www.faceit.com/en/csgo/room/roomid, etc.)"
						required
					/>
				</div>
				<button
					type="submit"
					className="p-2.5 ms-2 text-sm font-medium text-white bg-fct-orange rounded-lg border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex items-center justify-center"
				>
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
					<span className="ml-1">Search</span>
				</button>
			</form>
		</main>
	);
}
