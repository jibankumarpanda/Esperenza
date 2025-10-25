'use client';
import { motion } from 'framer-motion';
import { Users, Gift, Wallet, Star } from 'lucide-react';

const features = [
  {
    title: 'Referral Exchange',
    description: 'Granters list referral codes, seekers discover and use them — both win.',
    icon: Users,
  },
  {
    title: 'Goodies Marketplace',
    description: 'Redeem earned points for curated goodies and partner perks.',
    icon: Gift,
  },
  {
    title: 'Wallet & Micro-donations',
    description: 'Built-in cUSD balance, micro-donation flow and quick payouts.',
    icon: Wallet,
  },
  {
    title: 'Reputation & Status',
    description: 'Granters gain reputation and open/closed status based on contributions.',
    icon: Star,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const Features = () => {
  return (
    <section className="section py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading">What You Can Do</h2>
          <p className="subheading text-slate-600">
            Browse referral codes, claim goodies, and grow your reputation — all in one lightweight app.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="card group">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-slate-100 group-hover:bg-slate-200 transition-colors">
                <feature.icon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};