import type { Metadata } from 'next';
import Image from 'next/image';
import IconLvl1 from '../../../img/lvl/1.svg';
import IconLvl10 from '../../../img/lvl/10.svg';
import IconLvl2 from '../../../img/lvl/2.svg';
import IconLvl3 from '../../../img/lvl/3.svg';
import IconLvl4 from '../../../img/lvl/4.svg';
import IconLvl5 from '../../../img/lvl/5.svg';
import IconLvl6 from '../../../img/lvl/6.svg';
import IconLvl7 from '../../../img/lvl/7.svg';
import IconLvl8 from '../../../img/lvl/8.svg';
import IconLvl9 from '../../../img/lvl/9.svg';

const lvlsIcons: { [key: number]: any } = {
	1: IconLvl1,
	2: IconLvl2,
	3: IconLvl3,
	4: IconLvl4,
	5: IconLvl5,
	6: IconLvl6,
	7: IconLvl7,
	8: IconLvl8,
	9: IconLvl9,
	10: IconLvl10,
};

const lvls: { [key: number]: any } = {
	2: 501,
	3: 751,
	4: 901,
	5: 1051,
	6: 1201,
	7: 1351,
	8: 1501,
	9: 1751,
	10: 2001,
};

export const metadata: Metadata = {
	title: 'FACEIT Finder - Player Profile and Statistics',
	description:
		'Explore detailed player profiles on FACEIT Finder, including stats, match history, and performance analytics. Check out Elo ratings, win rates, K/D ratios, and map-specific performance for competitive gaming insights.',
};

const Profile = async ({ params: { id }, searchParams: { platform } }: any) => {
	let faceitContent;
	let steamResponse;
	if (platform === 'steam') {
		const res = await fetch(
			`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=6E9106CB6287D984D0286ED706FAD401&vanityurl=${id}`
		);
		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}
		steamResponse = await res.json();
	}

	const faceitResponse = await fetch(
		`https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${
			steamResponse?.response?.steamid || id
		}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer 2ac7a275-e5ce-4c87-9be6-e269063df73f`,
			},
		}
	);
	faceitContent = await faceitResponse.json();

	if (platform === 'faceit') {
		const res = await fetch(
			`https://open.faceit.com/data/v4/players?nickname=${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer 2ac7a275-e5ce-4c87-9be6-e269063df73f`,
				},
			}
		);
		faceitContent = await res.json();
	}

	const faceitStats = await fetch(
		`https://open.faceit.com/data/v4/players/${faceitContent.player_id}/stats/cs2`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer 2ac7a275-e5ce-4c87-9be6-e269063df73f`,
			},
		}
	);

	const stats = await faceitStats.json();
	if (stats.errors || faceitContent.errors) {
		return (
			<main className="profile-page container w-auto m-auto mt-10 h-screen">
				<div className="mx-auto w-[40rem] bg-fct-header p-10 flex rounded">
					<div>
						<p className="text-xl mt-2 font-bold">Player not found</p>
					</div>
				</div>
			</main>
		);
	}

	const lvlKey = faceitContent?.games?.cs2?.skill_level || 1;

	return (
		<main className="profile-page container w-auto m-auto mt-10">
			<div className="">
				<div className="mx-auto w-[40rem] bg-fct-header p-10 flex rounded">
					<div>
						<Image
							src={faceitContent.avatar}
							alt="Profile picture"
							width={100}
							height={100}
							className="rounded-full "
						/>
						<p className="text-xl mt-2 font-bold">{faceitContent.nickname}</p>
					</div>
					<div className="flex flex-col flex-1 px-6">
						<div className="flex items-center mb-3">
							<p className="mr-1">Elo: {faceitContent.games.cs2.faceit_elo}</p>
							<Image
								src={lvlsIcons[faceitContent.games.cs2.skill_level || 1]}
								width={32}
								height={32}
								alt="Skill level"
							/>
						</div>
						<div className="flex items-center mb-3">
							{faceitContent.games.cs2.skill_level === 10 ? (
								<div className="flex items-center">
									<p className="font-bold mr-1">Reached max LEVEL</p>
									<div>🔥</div>
								</div>
							) : (
								<>
									<p className="font-bold mr-1">
										POINTS NEEDED TO REACH LEVEL{' '}
										{faceitContent.games.cs2.skill_level + 1}:
									</p>
									<p>{faceitContent.games.cs2.faceit_elo - lvls[lvlKey]}</p>
								</>
							)}
						</div>
						<div className="flex items-center mb-3">
							<p className="font-bold mr-1">Recent Results:</p>
							<div className="flex items-center">
								{stats.lifetime['Recent Results'].map(
									(result: any, index: any) => {
										if (result === '1') {
											return (
												<p
													className="font-bold text-green-600"
													key={`result-${result}-${index}`}
												>
													W
												</p>
											);
										}
										return (
											<p
												className="font-bold text-red-600"
												key={`result-${result}-${index}`}
											>
												L
											</p>
										);
									}
								)}
							</div>
						</div>
						<div className="flex items-center mb-3">
							<a
								href={`https://www.faceit.com/en/players/${faceitContent.nickname}`}
								target="_blank"
								className="uppercase bg-fct-orange text-white p-2 rounded-lg mr-2"
							>
								faceit
							</a>
							{faceitContent.steam_id_64 && (
								<a
									href={`https://steamcommunity.com/profiles/${faceitContent.steam_id_64}`}
									target="_blank"
									className="uppercase bg-blue-900 text-white p-2 rounded-lg mr-2"
								>
									steam
								</a>
							)}
						</div>
					</div>
				</div>

				<div className="mx-auto w-[40rem] bg-fct-header p-10 flex rounded mt-10">
					<div className="flex flex-col w-full">
						<h3 className="text-2xl font-bold mb-10 uppercase">Stats</h3>
						<div className="flex items-center justify-between">
							<div className="flex flex-col items-center justify-between mb-3">
								<p className="font-bold">Matches: </p>
								<p>{stats.lifetime.Matches}</p>
							</div>
							<div className="flex flex-col items-center justify-between mb-3">
								<p className="font-bold">Matches Wins: </p>
								<p>{stats.lifetime.Wins}</p>
							</div>
							<div className="flex flex-col items-center justify-between mb-3">
								<p className="font-bold">Winrate: </p>
								<p>{stats.lifetime['Win Rate %']}%</p>
							</div>
							<div className="flex flex-col items-center justify-between mb-3">
								<p className="font-bold">Current Win Streak: </p>
								<p>{stats.lifetime['Current Win Streak']}</p>
							</div>
							<div className="flex flex-col items-center justify-between mb-3">
								<p className="font-bold">K/D: </p>
								<p>{stats.lifetime['Average K/D Ratio']}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto w-[70rem] bg-fct-header p-10 flex rounded mt-10">
					<div className="flex flex-col w-full">
						<h3 className="text-2xl font-bold mb-10 uppercase">Map Stats</h3>

						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
								<thead className="text-xs text-white uppercase  border-b bg-fct-header dark:text-white">
									<tr>
										<th scope="col" className="px-6 py-3">
											Map
										</th>
										<th scope="col" className="px-6 py-3">
											Name
										</th>
										<th scope="col" className="px-6 py-3 ">
											Matches
										</th>
										<th scope="col" className="px-6 py-3">
											Wins
										</th>
										<th scope="col" className="px-6 py-3 ">
											Win Rate
										</th>
										<th scope="col" className="px-6 py-3 ">
											K/D Rate
										</th>
										<th scope="col" className="px-6 py-3 ">
											HS Per Match
										</th>
										<th scope="col" className="px-6 py-3 ">
											AVR HS
										</th>
										<th scope="col" className="px-6 py-3 ">
											AVR Kill
										</th>
									</tr>
								</thead>
								<tbody>
									{stats.segments
										.sort(
											(a: any, b: any) =>
												b.stats['Win Rate %'] - a.stats['Win Rate %']
										)
										.map((segment: any) => (
											<tr className="border-b" key={segment.label}>
												<th
													scope="row"
													className="px-6 py-4 font-medium  text-blue-50 whitespace-nowrap dark:text-blue-100"
												>
													<Image
														src={segment.img_regular}
														width={100}
														height={50}
														alt={segment.label}
													/>
												</th>
												<td className="px-6 py-4 text-center">
													{segment.label}
												</td>
												<td className="px-6 py-4 text-center">
													{segment.stats.Matches}
												</td>
												<td className="px-6 py-4 text-center">
													{segment.stats.Wins}
												</td>
												<>
													{segment.stats['Win Rate %'] >= 50 ? (
														<td className="px-4 py-4 bg-green-500 text-center">
															{segment.stats['Win Rate %']}%
														</td>
													) : (
														<td className="px-4 py-4 bg-red-500 text-center">
															{segment.stats['Win Rate %']}%
														</td>
													)}
												</>
												<td className="px-6 py-4 text-center">
													{segment.stats['Average K/D Ratio']}
												</td>
												<td className="px-6 py-4 text-center">
													{segment.stats['Headshots per Match']}
												</td>
												<td className="px-6 py-4 text-center">
													{segment.stats['Average Headshots %']}%
												</td>
												<td className="px-6 py-4 text-center">
													{segment.stats['Average Kills']}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Profile;
