'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


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

          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/tensedkids.png"
                alt="Students working on AI and technology projects"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              
              {/* Floating elements overlay */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100"
              >
                <div className="text-xs text-slate-500">Active Users</div>
                <div className="font-semibold text-slate-900">2,300+</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-4 -left-4 bg-indigo-600 text-white rounded-xl p-3 shadow-lg"
              >
                <div className="text-xs text-indigo-100">Referral Codes</div>
                <div className="font-semibold">5,000+</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute top-1/2 -right-8 bg-green-600 text-white rounded-xl p-3 shadow-lg"
              >
                <div className="text-xs text-green-100">Success Rate</div>
                <div className="font-semibold">95%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};