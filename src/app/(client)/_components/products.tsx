'use client';
import { Image } from "@imagekit/next"
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const Products = () => {
    const skeletons = Array.from({ length: 8 });
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: 10 * 1000,
    });

    return (
        <section className="bg-gradient-to-b from-amber-50 via-white to-amber-50 px-5 py-14 md:py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center gap-5"
                >
                    <div className="flex items-center gap-3">
                        <Separator className="h-0.5 w-20 bg-amber-600" />
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            <span className="text-amber-600">Our</span> Products
                        </h2>
                        <Separator className="h-0.5 w-20 bg-amber-600" />
                    </div>
                    <p className="text-gray-600 max-w-2xl text-center mt-4">
                        Indulge in our premium collection of handpicked chocolates and confectionery delights
                    </p>
                </motion.div>

                <motion.div
                    className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {isLoading ? (
                        <>
                            {skeletons.map((_, i) => (
                                <div key={i} className="flex h-full w-full flex-col gap-4">
                                    <Skeleton className="aspect-square w-full rounded-xl bg-amber-100" />
                                    <Skeleton className="h-5 w-3/4 rounded-md bg-amber-100" />
                                    <Skeleton className="h-5 w-1/2 rounded-md bg-amber-100" />
                                    <Skeleton className="h-10 w-full rounded-md bg-amber-100" />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {products?.map((product: Product, idx: number) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="group relative overflow-hidden rounded-2xl border-0 bg-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2">
                                        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%' }}
                                                className="aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={product.name}>
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-2xl font-bold text-amber-600">
                                                ${product.price}
                                            </p>

                                            <Link href={`/product/${product.id}`} className="block mt-4">
                                                <Button
                                                    size={'sm'}
                                                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-md shadow-amber-500/20"
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
