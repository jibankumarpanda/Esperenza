'use client';
import { motion } from 'framer-motion';
import { Users, Gift, Wallet, Star, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';

const features = [
	{
		title: 'Referral Exchange',
		description: 'Granters list referral codes, seekers discover and use them — both win.',
		icon: Users,
		gradient: 'from-blue-500 to-cyan-500',
		stats: '10K+ Active Users',
		badge: 'Popular',
	},
	{
		title: 'Goodies Marketplace',
		description: 'Redeem earned points for curated goodies and partner perks.',
		icon: Gift,
		gradient: 'from-purple-500 to-pink-500',
		stats: '500+ Rewards',
		badge: 'New',
	},
	{
		title: 'Wallet & Micro-donations',
		description: 'Built-in cUSD balance, micro-donation flow and quick payouts.',
		icon: Wallet,
		gradient: 'from-green-500 to-emerald-500',
		stats: '$50K+ Transacted',
		badge: 'Secure',
	},
	{
		title: 'Reputation & Status',
		description: 'Granters gain reputation and open/closed status based on contributions.',
		icon: Star,
		gradient: 'from-orange-500 to-red-500',
		stats: '95% Success Rate',
		badge: 'Trusted',
	},
];

const stats = [
	{ label: 'Active Users', value: '10,000+', icon: Users },
	{ label: 'Referral Codes', value: '5,000+', icon: TrendingUp },
	{ label: 'Transactions', value: '$50K+', icon: Wallet },
	{ label: 'Success Rate', value: '95%', icon: Shield },
];

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

const floatingVariants = {
	animate: {
		y: [-10, 10, -10],
		transition: {
			duration: 4,
			repeat: Infinity,
			ease: 'easeInOut' as const,
		},
	},
};

export const Features = () => {
	return (
		<section className="relative py-20 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<Image
					src="/brainstorming.png"
					alt="Brainstorming Background"
					fill
					className="object-cover opacity-600" // increased opacity from 10 to 30
					priority
					quality={100}
					sizes="100vw"
					style={{
						objectFit: 'cover',
						filter: 'saturate(0.8) contrast(1.1)' // added some image adjustments
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/70 to-white/75" /> {/* adjusted gradient opacity */}
			</div>

			<div className="container relative z-10 mix-blend-normal"> {/* added mix-blend-normal */}
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-4xl mx-auto mb-16 relative z-20 backdrop-blur-[2px]" // added subtle blur
				>
					<Badge 
						variant="outline" 
						className="mb-4 px-4 py-2 text-sm text-black font-medium bg-white/90 backdrop-blur-sm shadow-sm"
					>
						<Zap className="w-4 h-4 mr-2" />
						Powered by Celo Blockchain
					</Badge>
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 drop-shadow-sm">
						What You Can Do
					</h2>
					<p className="text-xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm bg-white/50 p-4 rounded-lg backdrop-blur-sm">
						Browse referral codes, claim goodies, and grow your reputation — all in one lightweight app.
						Join thousands of users building the future of decentralized referrals.
					</p>
				</motion.div>

				{/* Stats Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
				>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg"
						>
							<stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
							<div className="text-2xl font-bold text-gray-900">{stat.value}</div>
							<div className="text-sm text-gray-600">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Features Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
				>
					{features.map((feature, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
								<CardHeader className="pb-4">
									<div className="flex items-center justify-between mb-4">
										<motion.div
											variants={floatingVariants}
											animate="animate"
											className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}
										>
											<feature.icon className="h-7 w-7 text-white" />
										</motion.div>
										<Badge variant={feature.badge === 'New' ? 'default' : 'secondary'}>
											{feature.badge}
										</Badge>
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
										{feature.title}
									</CardTitle>
									<CardDescription className="text-gray-600 leading-relaxed">
										{feature.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-500">{feature.stats}</span>
										<ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
									</div>
								</CardContent>

								{/* Hover Effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Trusted By Section */}
		<motion.div
			initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-center mb-8"
				>
					<p className="text-black-900 mb-6">Trusted by leading organizations</p>
					<Marquee pauseOnHover className="[--duration:20s]">
						{[
							'Celo Foundation',
							'Chainlink',
							'Polygon',
							'Ethereum Foundation',
							'ConsenSys',
							'Coinbase',
							'Binance',
							'OpenSea',
							'Uniswap',
							'Aave',
						].map((company, index) => (
							<div key={index} className="mx-8 text-black-800 font-medium">
								{company}
							</div>
						))}
					</Marquee>
				</motion.div>

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="text-center"
				>
					<Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
						Get Started Today
						<ArrowRight className="ml-2 w-5 h-5" />
					</Button>
				</motion.div>
			</div>
		</section>
	);
};