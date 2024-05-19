'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import Logo from './../img/faceit_logo.svg';
import searchHandle from './utils/searchHandle';

export default function Home() {
	const router = useRouter();
	const [value, changeValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		changeValue(event.currentTarget.value);
	};
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const url = searchHandle(value, setIsLoading, changeValue);
		router.push(url);
	};

	return (
		<main className="bg-fct-body antialiased flex flex-col p-24 container xl:max-w-7xl mx-auto px-6 lg:px-8">
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
					{isLoading && (
						<>
							<svg
								aria-hidden="true"
								role="status"
								className="inline w-4 h-4 me-3 text-white animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="#E5E7EB"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentColor"
								/>
							</svg>
							Loading..
						</>
					)}
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
