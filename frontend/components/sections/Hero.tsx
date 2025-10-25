'use client';
import { motion } from 'framer-motion';
import { Wallet, Sprout, Coins } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const IconCircle = ({  className = "" }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{  duration: 0.5 }}
    className={`absolute w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${className}`}
  >
   
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#EFFFFA] to-[#FAF9F6]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-48 -right-24 rounded-full bg-[#A8D5BA]/20 blur-3xl" />
        <div className="absolute w-[300px] h-[300px] top-96 -left-24 rounded-full bg-[#FFD369]/10 blur-2xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
            >
              🌱 Sustainable Finance Revolution
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-text">
              Transform Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Transactions </span>
              into Forest Growth
            </h1>

            <p className="text-xl md:text-2xl text-text/80">
              Join the eco-friendly financial movement. Every transaction plants trees, 
              making your wallet a force for positive change.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-gradient-to-r from-primary to-[#7EB693]"
              >
                Start Your Green Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary border-primary/20"
              >
                Watch How It Works
              </motion.button>
            </div>

            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-primary/20"
                  />
                ))}
              </div>
              <p className="text-text/80">
                <span className="font-bold text-text">5,000+</span> eco-conscious users
              </p>
            </div>
          </motion.div>

          <div className="relative h-[600px]">
            {/* Central infographic element */}
            <motion.div
              
              initial="initial"
              animate="animate"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative w-72 h-72">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
                />
                
                

                {/* Central connecting lines with animation */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary/20"
                    strokeDasharray="1,3"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-12 right-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
            >
              <div className="text-sm font-medium text-text">
                Trees Planted This Week
                <div className="text-2xl font-bold text-primary">
                  +2,481 🌳
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="absolute top-12 right-12 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
            >
              <div className="text-sm font-medium text-text">
                Carbon Offset
                <div className="text-2xl font-bold text-accent">
                  12.5 tons 🌍
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};