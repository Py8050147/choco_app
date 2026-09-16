'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto flex max-w-5xl flex-col items-center justify-center rounded-3xl px-6 md:px-10 py-16 md:py-20 text-white overflow-hidden"
            >
                {/* Animated background elements */}
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-amber-500/30 blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-amber-400/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-4 text-5xl"
                    >
                        📧
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
                        Stay Updated with Newsletter
                    </h2>
                    <p className="mt-6 max-w-2xl text-center text-gray-100 leading-relaxed">
                        Get the latest news, exclusive offers, and delicious updates delivered right to
                        your inbox with our chocolate and cake shop newsletter.
                    </p>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative mt-8 w-full max-w-md"
                    >
                        <div className="relative flex items-center">
                            <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-14 pl-12 pr-32 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 backdrop-blur-sm rounded-full text-base"
                                placeholder="Enter your email address"
                                required
                            />
                            <Button
                                type="submit"
                                variant="secondary"
                                className="absolute right-1 h-12 px-6 bg-white text-amber-900 hover:bg-amber-50 rounded-full font-semibold shadow-lg"
                            >
                                {isSubmitted ? (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        ✓ Subscribed
                                    </motion.span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Subscribe <Send className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-6 flex items-center gap-6 text-sm text-gray-200"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📬</span>
                            <span>Weekly updates</span>
                        </div>
                        <div className="h-4 w-px bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎁</span>
                            <span>Exclusive deals</span>
                        </div>
                        <div className="h-4 w-px bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🔒</span>
                            <span>100% Secure</span>
                        </div>
                    </motion.div>
                </motion.div>

                <Image
                    src="/choco-bg.jpg"
                    alt="Newsletter Background"
                    fill
                    className="-z-10 rounded-3xl object-cover"
                />
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-amber-900/90 via-amber-800/85 to-black/90" />
            </motion.div>
        </section>
    );
}
