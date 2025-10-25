'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Users, Gift } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const floatingPath = (delay = 0) => ({
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -8, 0],
    opacity: [0, 1, 1],
    transition: {
      delay,
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
});

type OrbitIconProps = {
  Icon: React.ComponentType<any>;
  className?: string;
  delay?: number;
};
const OrbitIcon = ({ Icon, className = '', delay = 0 }: OrbitIconProps) => (
  <motion.div
    >
    <Icon size={18} />
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative min-h-[78vh] flex items-center bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
              Referral Exchange • Goodies Marketplace
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Find, Share, and Redeem Referral Codes
              <span className="block text-indigo-600 mt-2 text-xl font-semibold">
                Earn points. Unlock rewards. Build your reputation.
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl">
              A lightweight referral hub where granters list verified codes and seekers discover them. Each successful use
              rewards both parties and powers the goodies marketplace.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium">
                Get Started
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-2 rounded-md border border-slate-200 text-slate-700 bg-white">
                Explore Marketplace
              </motion.button>
            </div>

            <div className="flex items-center gap-4 pt-6 text-sm text-slate-600">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-indigo-50" />
                ))}
              </div>
              <div>
                <div className="font-semibold text-slate-900">2,300+</div>
                <div className="text-xs">active referral codes</div>
              </div>
            </div>
          </motion.div>

          <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-lg"
            >
              <div className="absolute left-5 top-5 p-3 bg-white rounded-lg shadow-sm w-36">
                <div className="text-xs text-slate-500">Active Code</div>
                <div className="font-medium text-slate-900">GEMINI50</div>
                <div className="text-xs text-slate-500">Used 12× today</div>
              </div>

              <OrbitIcon Icon={Wallet} className="bg-indigo-600 -top-8 left-1/2 -translate-x-1/2" delay={0.2} />
              <OrbitIcon Icon={Users} className="bg-amber-500 top-1/2 -right-6 -translate-y-1/2" delay={0.6} />
              <OrbitIcon Icon={Gift} className="bg-sky-500 bottom-4 left-6" delay={1} />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute right-4 bottom-4 bg-white rounded-xl p-3 shadow-md w-44"
              >
                <div className="text-xs text-slate-500">Goodies Redeemed</div>
                <div className="font-semibold text-slate-900">1,142</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};