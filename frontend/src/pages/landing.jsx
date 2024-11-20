import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Feature = ({ icon, title, description }) => (
	<motion.div className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
		<div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">{icon}</div>
		<h3 className="text-xl font-semibold mb-2">{title}</h3>
		<p className="text-sm text-gray-600">{description}</p>
	</motion.div>
);

const Step = ({ number, title, description }) => (
	<motion.div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm transform hover:scale-105 transition duration-300 ease-in-out" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
		<div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">{number}</div>
		<h3 className="text-xl font-semibold mb-2">{title}</h3>
		<p className="text-sm text-gray-600">{description}</p>
	</motion.div>
);

const LandingPage = () => {
	return (
		<div className="font-sans">
			{/* Header Section */}
			<header className="bg-blue-800 text-white">
				<div className="container mx-auto px-6 py-6 flex justify-between items-center">
					<motion.div className="text-4xl font-bold tracking-widest" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
						BrainQuest
					</motion.div>
					<div className="flex items-center gap-2">
						<motion.div className="flex items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
							<motion.button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link to="/login">Login</Link>
							</motion.button>
						</motion.div>
						<motion.div className="flex items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
							<motion.button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link to="/register">register</Link>
							</motion.button>
						</motion.div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-32">
				<div className="container mx-auto text-center px-6">
					<motion.h1 className="text-5xl md:text-7xl font-extrabold mb-6" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
						Learn, Achieve, Earn Rewards
					</motion.h1>
					<motion.p className="text-xl mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
						Connect your academic success to real-world rewards in your local community
					</motion.p>
					<motion.button className="bg-yellow-400 text-blue-900 font-bold py-3 px-10 rounded-full text-xl hover:bg-yellow-300 transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
						Get Started
					</motion.button>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-gray-100">
				<div className="container mx-auto px-6">
					<motion.h2 className="text-4xl font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
						Why Choose BrainQuest?
					</motion.h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<Feature
							icon={
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
								</svg>
							}
							title="Track Progress"
							description="Monitor your academic achievements and watch your rewards grow"
						/>
						<Feature
							icon={
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							}
							title="Earn Rewards"
							description="Turn your academic success into tangible benefits from local businesses"
						/>
						<Feature
							icon={
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
								</svg>
							}
							title="Community Connection"
							description="Strengthen ties between students, schools, and local businesses"
						/>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<motion.h2 className="text-4xl font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
						How It Works
					</motion.h2>
					<div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
						<Step number="1" title="Set Goals" description="Define your academic objectives and milestones" />
						<Step number="2" title="Track Progress" description="Log your achievements and watch your progress grow" />
						<Step number="3" title="Claim Rewards" description="Redeem your points for exciting local rewards" />
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-gray-100 py-20">
				<div className="container mx-auto px-6">
					<motion.h2 className="text-4xl font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
						What Our Users Say
					</motion.h2>
					<motion.div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
						<p className="text-xl italic mb-4">"BrainQuest has completely changed my approach to studying. Knowing that my hard work translates into real rewards keeps me motivated and engaged with my coursework."</p>
						<div className="flex items-center">
							<img src="/placeholder.svg?height=50&width=50" alt="Student" className="rounded-full mr-4" />
							<div>
								<p className="font-semibold">Sarah Johnson</p>
								<p className="text-gray-600">High School Senior</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="bg-blue-600 text-white py-16">
				<div className="container mx-auto px-6 text-center">
					<motion.h2 className="text-4xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
						Ready to Start Earning Rewards?
					</motion.h2>
					<motion.p className="text-xl mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
						Join BrainQuest today and turn your academic success into amazing opportunities!
					</motion.p>
					<motion.button className="bg-yellow-400 text-blue-900 font-bold py-3 px-10 rounded-full text-lg hover:bg-yellow-300 transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
						<Link to="/register">Sign Up Now</Link>
					</motion.button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<motion.div className="text-3xl font-bold mb-4 md:mb-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
							BrainQuest
						</motion.div>
						<nav className="mb-4 md:mb-0">
							<ul className="flex space-x-6">
								{["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
									<motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
										<a href="#" className="hover:text-blue-300">
											{item}
										</a>
									</motion.li>
								))}
							</ul>
						</nav>
						<div className="text-sm">&copy; {new Date().getFullYear()} BrainQuest. All rights reserved.</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
