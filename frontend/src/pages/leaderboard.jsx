import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../hooks/use-auth";

const CoinIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="6" fill="yellow" />
	</svg>
);

const LeaderboardEntry = ({ rank, avatar, name, coins, delay }) => (
	<motion.div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
		<div className="flex items-center">
			<span className="text-2xl font-bold mr-4 w-8 text-center">{rank}</span>
			<img src={avatar} alt={`${name}'s avatar`} className="w-12 h-12 rounded-full mr-4 object-cover" />
			<span className="text-lg font-semibold">{name}</span>
		</div>
		<div className="flex items-center">
			<CoinIcon />
			<span className="text-xl font-bold ml-2">{coins}</span>
		</div>
	</motion.div>
);

const MentorsLeaderboard = () => {
	const [mentors, setMentors] = useState([]);
	const { auth } = useAuth();
	const { user } = auth;

	useEffect(() => {
		const fetchMentors = async () => {
			try {
				if (!user?.id) return;

				const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/leaderboard`);

				// Ensure data is an array
				setMentors(Array.isArray(response.data.data) ? response.data.data : []);
			} catch (error) {
				console.error("Error fetching mentors:", error);
				setMentors([]);
			}
		};

		fetchMentors();
	}, [user?.id, auth.token]);

	console.log(mentors);

	return (
		<div className="bg-gray-100 min-h-screen py-12">
			<div className="container mx-auto px-4">
				<motion.h2 className="text-3xl font-bold text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					Leaderboard
				</motion.h2>
				{mentors.length === 0 ? (
					<motion.p className="text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
						No Students found
					</motion.p>
				) : (
					<>
						<motion.div className="bg-blue-600 text-white p-6 rounded-t-lg shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-16">
									<span className="text-lg font-semibold">Rank</span>
									<span className="text-lg font-semibold">Student</span>
								</div>
								<div className="text-lg font-semibold flex items-center">
									<CoinIcon />
									<span className="ml-2">Coins</span>
								</div>
							</div>
						</motion.div>
						<div className="bg-gray-200 p-6 rounded-b-lg shadow-md">
							{mentors.map((mentor, index) => (
								<LeaderboardEntry key={mentor._id || index} rank={index + 1} avatar={mentor.avatar} name={mentor.name || "Unknown"} coins={mentor.coins || 0} delay={0.3 + index * 0.1} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MentorsLeaderboard;
