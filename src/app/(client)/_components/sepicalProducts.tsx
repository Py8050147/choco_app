'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SpecialProducts() {
    const products = [
        { src: '/product1.jpg', alt: 'product1', name: 'Cadbury Dairy Milk', color: 'from-purple-500 to-purple-600' },
        { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars', color: 'from-red-500 to-red-600' },
        { src: '/product3.jpg', alt: 'product3', name: 'Lindt Excellence Bar', color: 'from-amber-500 to-amber-600' },
        { src: '/product2.jpg', alt: 'product4', name: 'Ferrero Rocher', color: 'from-yellow-500 to-yellow-600' },
    ];

    return (
        <section className="mx-auto max-w-7xl px-5 py-14 md:py-20 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-5"
            >
                <div className="flex items-center gap-3">
                    <Separator className="h-0.5 w-20 bg-gradient-to-r from-transparent to-amber-600" />
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                        <span className="text-amber-600">Special</span> Products
                    </h2>
                    <Separator className="h-0.5 w-20 bg-gradient-to-l from-transparent to-amber-600" />
                </div>
                <p className="text-gray-600 max-w-2xl text-center mt-2">
                    Discover our exclusive collection of premium chocolates
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-2 gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-4">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="flex flex-col items-center justify-center gap-4 group cursor-pointer"
                    >
                        <div className="relative">
                            {/* Animated Border */}
                            <motion.div
                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity blur-xl`}
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />

                            <motion.div
                                whileHover={{ rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="relative"
                            >
                                <Image
                                    src={product.src}
                                    alt={product.alt}
                                    width={220}
                                    height={220}
                                    className="rounded-full border-8 border-white shadow-2xl ring-4 ring-amber-100 group-hover:ring-amber-300 transition-all object-cover"
                                />
                                {/* Overlay gradient on hover */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>

                            {/* Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                                className={`absolute -top-2 -right-2 bg-gradient-to-r ${product.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                            >
                                ⭐ Special
                            </motion.div>
                        </div>

                        <div className="text-center">
                            <p className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                {product.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Premium Quality</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
