'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Product',
            links: [
                { label: 'Browse Products', href: '#' },
                { label: 'New Arrivals', href: '#' },
                { label: 'Best Sellers', href: '#' },
                { label: 'Offers', href: '#' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Press', href: '#' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Contact Us', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Shipping Info', href: '#' },
                { label: 'Returns', href: '#' },
            ],
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <footer className="relative bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
                {/* Main Footer Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                        {/* Brand Section */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <span className="text-3xl">🍫</span>
                                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                                    Choco
                                </span>
                            </motion.div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Your favorite chocolate destination delivering premium quality confectionery right to your doorstep in 10 minutes.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <motion.a
                                    href="tel:+1234567890"
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                                >
                                    <Phone className="h-5 w-5 flex-shrink-0" />
                                    <span>+1 (234) 567-890</span>
                                </motion.a>
                                <motion.a
                                    href="mailto:hello@choco.com"
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                                >
                                    <Mail className="h-5 w-5 flex-shrink-0" />
                                    <span>hello@choco.com</span>
                                </motion.a>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3 text-gray-300"
                                >
                                    <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                                    <span>123 Chocolate Lane, Sweet City, SC 12345</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Links Sections */}
                        {footerLinks.map((section, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                            >
                                <h3 className="text-lg font-bold mb-4 text-amber-300">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIdx) => (
                                        <motion.li
                                            key={linkIdx}
                                            whileHover={{ x: 5 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="my-10 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                    />

                    {/* Bottom Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-center gap-6"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center md:text-left text-gray-300 text-sm"
                        >
                            <p>© {currentYear} Choco. All rights reserved.</p>
                            <div className="flex gap-4 mt-2 justify-center md:justify-start">
                                <Link href="#" className="hover:text-amber-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                <span>•</span>
                                <Link href="#" className="hover:text-amber-400 transition-colors">
                                    Terms of Service
                                </Link>
                                <span>•</span>
                                <Link href="#" className="hover:text-amber-400 transition-colors">
                                    Cookie Policy
                                </Link>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-4"
                        >
                            {socialLinks.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        title={social.label}
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="h-10 w-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-500/40 hover:border-amber-500/60 transition-all"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Floating elements animation */}
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-20 right-20 text-4xl opacity-10 pointer-events-none"
                >
                    🍫
                </motion.div>
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-20 left-20 text-4xl opacity-10 pointer-events-none"
                >
                    🍬
                </motion.div>
            </div>
        </footer>
    );
}
