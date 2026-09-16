'use client';

import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const session = useSession();

    const navItems = [
        { label: 'Home', href: '/', icon: '🏠' },
        { label: 'Best Selling', href: '/best-selling', icon: '🌟' },
        { label: 'Offers', href: '/offers', icon: '🎁' },
        { label: 'Orders', href: '/account/orders', icon: '📦' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
            {/* Promo Banner */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-10 items-center justify-center bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-center text-white overflow-hidden relative"
            >
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-10 text-xl"
                >
                    🎉
                </motion.div>
                <span className="text-sm font-medium">
                    Order 2 Delight Dairy Choco bars today and save ₹100 instantly! Limited time offer
                </span>
                <motion.div
                    animate={{ x: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-10 text-xl"
                >
                    🎉
                </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex h-16 items-center justify-between px-5 md:px-10 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="text-3xl"
                    >
                        🍫
                    </motion.div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                        Choco
                    </span>
                </Link>

                {/* Nav Items */}
                <ul className="hidden md:flex items-center justify-center gap-8">
                    {navItems.map((item) => (
                        <motion.li
                            key={item.href}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    'text-gray-600 font-medium transition-all hover:text-amber-600 relative group',
                                    pathname === item.href && 'text-amber-600'
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </span>
                                <span
                                    className={cn(
                                        'absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all',
                                        pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    )}
                                />
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                {/* Auth & Cart */}
                <div className="flex items-center gap-4">
                    {/* Cart Icon */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2 rounded-full hover:bg-amber-50 transition-colors"
                    >
                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-semibold">
                            0
                        </span>
                    </motion.button>

                    {/* Auth Button */}
                    {session.status === 'authenticated' ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </motion.button>
                    ) : (
                        <Link href="/api/auth/signin">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-400 transition-all shadow-md"
                            >
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign In</span>
                            </motion.button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
