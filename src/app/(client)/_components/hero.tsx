'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="custom-height relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-amber-900 to-black opacity-20" />
            <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-red-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="container z-50 mx-auto my-auto flex h-full flex-col justify-center px-5 text-white md:px-10 xl:px-28 3xl:px-5"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="inline-block mb-4 rounded-full bg-amber-500/20 px-4 py-1 text-sm font-medium text-amber-300 backdrop-blur-sm border border-amber-500/30">
                        🚀 Fastest Delivery in Town
                    </span>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-7xl lg:text-8xl font-bold capitalize leading-[1.1] tracking-tight 3xl:text-8xl 3xl:leading-[1.2]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    10 Minute Delivery <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                        At Your Door
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-[550px] text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    Why wait? Our 10-minute delivery service brings your favorite chocolates right
                    to your door, swiftly and reliably. Convenience and indulgence, all in one
                    package.
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-wrap items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Button
                        variant="secondary"
                        className="h-12 px-8 text-lg rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-lg shadow-amber-500/25"
                    >
                        <span className="mr-2">🛒</span> Shop Now
                    </Button>
                    <Button
                        className="h-12 px-8 text-lg rounded-full border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all"
                    >
                        View Menu
                    </Button>
                </motion.div>

                <motion.div
                    className="mt-10 flex items-center gap-6 text-sm text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span>10-min delivery</span>
                    </div>
                    <div className="h-4 w-px bg-white/20"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🏆</span>
                        <span>Quality guaranteed</span>
                    </div>
                    <div className="h-4 w-px bg-white/20"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍫</span>
                        <span>Premium chocolates</span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <Image
                    src="/chocolate.jpg"
                    alt="Hero Chololate"
                    fill
                    className="-z-10 object-cover"
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </section>
    );
}
