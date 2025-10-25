'use client'
import { motion } from 'framer-motion';

const stats = [
  {
    value: '350',
    label: 'Trees Planted',
    suffix: '+',
  },
  {
    value: '12,000',
    label: 'kg CO₂ Offset',
    suffix: '+',
  },
  {
    value: '5,000',
    label: 'Happy Users',
    suffix: '+',
  },
];

const testimonial = {
  quote: "Thanks to Esperenza, my campus referral network helps plant trees every week!",
  author: "Sarah K.",
  role: "Student Ambassador",
};

export const Impact = () => {
  return (
    <section className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/leaves.svg')] bg-repeat opacity-20" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="heading">Our Impact</h2>
          <p className="subheading">
            Together, we're making a measurable difference for our planet
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="card text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-text/80 text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="card max-w-2xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl italic text-text mb-6">
            "{testimonial.quote}"
          </p>
          <div className="text-text/80">
            <div className="font-semibold">{testimonial.author}</div>
            <div className="text-sm">{testimonial.role}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};