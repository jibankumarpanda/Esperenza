'use client';
import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Users, Leaf } from 'lucide-react';

const features = [
  {
    title: 'Eco Wallet',
    description: 'Phone-based onboarding, cUSD transactions, and micro-donations.',
    icon: Wallet,
  },
  {
    title: 'Marketplace',
    description: 'Redeem eco-points for sustainable goodies and rewards.',
    icon: ShoppingBag,
  },
  {
    title: 'Referral Hub',
    description: 'Connect granters & seekers, earn eco-points, unlock status.',
    icon: Users,
  },
  {
    title: 'Eco Impact',
    description: 'Track your trees planted and carbon offset in real-time.',
    icon: Leaf,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Features = () => {
  return (
    <section className="section bg-background/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading">How It Works</h2>
          <p className="subheading">
            Join the eco-friendly revolution with our comprehensive platform
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                {feature.title}
              </h3>
              <p className="text-text/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};