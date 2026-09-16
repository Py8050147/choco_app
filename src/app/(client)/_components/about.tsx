'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function About() {
    const features = [
        { icon: '🚀', title: 'Lightning Fast', desc: '10-minute delivery guarantee' },
        { icon: '🎁', title: 'Premium Quality', desc: 'Handpicked chocolates only' },
        { icon: '💳', title: 'Secure Payment', desc: 'Multiple payment options' },
        { icon: '⭐', title: 'Satisfaction Guaranteed', desc: 'Money-back guarantee' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="max-w-7xl mx-auto px-5 md:py-20 py-14 bg-gradient-to-b from-white to-amber-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="px-6 md:px-10 py-16 md:py-20 rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-white max-w-5xl mx-auto flex justify-center items-center flex-col border-2 border-amber-200 shadow-xl"
            >
                <div className="flex justify-center items-center gap-5 mb-6">
                    <Separator className="w-20 bg-gradient-to-r from-amber-600 to-amber-400 h-1 rounded-full" />
                    <h2 className="text-amber-900 text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
                        Why Choose Us?
                    </h2>
                    <Separator className="w-20 bg-gradient-to-l from-amber-600 to-amber-400 h-1 rounded-full" />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mt-6 max-w-3xl text-gray-700 text-lg leading-relaxed"
                >
                    We're committed to delivering the finest chocolate experience with rapid delivery,
                    exceptional quality, and unparalleled customer service. Every product is carefully selected
                    and delivered fresh to your doorstep within 10 minutes.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-2 border-amber-100 hover:border-amber-300 shadow-lg hover:shadow-xl transition-all"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-4xl mb-3"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-amber-900 font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm text-center">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-center"
                >
                    <Button className="h-12 px-8 text-lg rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-lg shadow-amber-500/25 text-white font-semibold">
                        Explore Our Collection
                    </Button>
                    <Button className="h-12 px-8 text-lg rounded-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold transition-all">
                        Learn More
                    </Button>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 flex flex-wrap justify-center gap-6 pt-8 border-t border-amber-200"
                >
                    {['✓ 5000+ Happy Customers', '✓ 10-Min Guarantee', '✓ Fresh Quality'].map((badge, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 text-amber-900 font-semibold"
                        >
                            <Check className="h-5 w-5 text-green-500" />
                            {badge}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
