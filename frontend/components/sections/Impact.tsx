'use client'
import { motion } from 'framer-motion';

const stats = [
  { value: '2,300+', label: 'Active Codes' },
  { value: '1,142', label: 'Goodies Redeemed' },
  { value: '8,900', label: 'Referrals Completed' },
];

const testimonial = {
  quote: "We found the perfect tool referral in minutes — and the granter earned points that unlocked great goodies.",
  author: "Alex M.",
  role: "Product Manager",
};

export const Impact = () => {
  return (
    <section className="section py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="heading">Platform Activity</h2>
          <p className="subheading text-slate-600">Real referral usage, real rewards — here are the latest metrics.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="card text-center">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="card max-w-2xl mx-auto text-center">
          <p className="text-lg italic text-slate-700 mb-4">"{testimonial.quote}"</p>
          <div className="text-slate-600">
            <div className="font-semibold">{testimonial.author}</div>
            <div className="text-sm">{testimonial.role}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};