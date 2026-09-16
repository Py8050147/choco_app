'use client';

import React from 'react';
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users, ShoppingCart, Package, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getAllOrders } from '@/http/api';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// Simple date formatter
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AdminPage = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  // Calculate real stats
  const totalRevenue = orders?.reduce((sum: number, order: any) => sum + (order.price || 0), 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      change: '+2.1%',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Avg. Order Value',
      value: `$${avgOrderValue}`,
      change: '+5.3%',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-amber-50 to-white min-h-screen"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in-down ">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
              Dashboard
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-2"
          >
            Welcome back! Here's what's happening with your store.
          </motion.p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <Link href="/admin/products">
                <Package className="h-4 w-4 mr-2" />
                Manage Products
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-md shadow-amber-500/20">
              <Link href="/admin/orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`p-3 rounded-xl ${stat.bgColor} shadow-inner`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                >
                  {stat.value}
                </motion.div>
                <div className="flex items-center mt-2">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
                  >
                    {stat.change}
                  </motion.span>
                  <span className="text-xs text-gray-400 ml-2">from last month</span>
                </div>
              </CardContent>
              {/* Decorative gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${idx === 0 ? 'from-green-500 to-green-300' : idx === 1 ? 'from-blue-500 to-blue-300' : idx === 2 ? 'from-purple-500 to-purple-300' : 'from-amber-500 to-amber-300'}`} />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Recent Orders */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"
      >
        {/* Recent Orders Table */}
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-amber-500" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-gray-500">Latest transactions from your store.</CardDescription>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="sm" variant="outline" className="gap-1 border-gray-300 hover:bg-gray-50">
                  <Link href="/admin/orders">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="overflow-x-auto"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b border-gray-100">
                        <TableHead className="text-gray-600 font-semibold">Order ID</TableHead>
                        <TableHead className="hidden md:table-column text-gray-600 font-semibold">Customer</TableHead>
                        <TableHead className="hidden xl:table-column text-gray-600 font-semibold">Status</TableHead>
                        <TableHead className="hidden md:table-column text-gray-600 font-semibold">Date</TableHead>
                        <TableHead className="text-right text-gray-600 font-semibold">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order: any, idx: number) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <TableRow className="hover:bg-amber-50/50 transition-colors border-b border-gray-50">
                            <TableCell>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="font-medium text-gray-900 bg-amber-100 px-2 py-1 rounded text-center inline-block"
                              >
                                #{order.id.toString().padStart(4, '0')}
                              </motion.div>
                            </TableCell>
                            <TableCell className="hidden md:table-column">
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-xs">👤</span>
                                User #{order.userId}
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge
                                className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' :
                                  order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                                      'bg-blue-100 text-blue-700 border-blue-200'
                                  }`}
                              >
                                <motion.span
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                                </motion.span>
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                📅 {formatDate(order.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="font-bold text-lg text-gray-900"
                              >
                                ${order.price?.toLocaleString() || 0}
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        </motion.div>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  </motion.div>
                  <p className="text-xl font-medium text-gray-500">No orders yet</p>
                  <p className="text-sm text-gray-400 mt-2">Orders will appear here once customers start purchasing</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Products */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white px-6 py-5">
              <CardTitle className="text-lg font-semibold text-gray-900">Top Products</CardTitle>
              <CardDescription className="text-gray-500">Your best selling products</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {products && products.length > 0 ? (
                products.slice(0, 5).map((product: any, idx: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-amber-50 transition-all duration-300 cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      🍫
                    </div>
                    <div className="grid gap-1 flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate text-gray-900 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">In stock • ${product.price}</p>
                    </div>
                    <div className="font-semibold text-amber-600 shrink-0">
                      ${product.price}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Package className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium text-gray-500">No products yet</p>
                  <p className="text-sm text-gray-400 mt-1 mb-4">Start by adding your first product</p>
                  <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 border-0">
                    <Link href="/admin/products">
                      <Package className="h-4 w-4 mr-2" />
                      Add Product
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-4"
      >
        {[
          { icon: Package, label: 'Add Product', href: '/admin/products', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
          { icon: ShoppingCart, label: 'View Orders', href: '/admin/orders', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
          { icon: Users, label: 'Delivery Persons', href: '/admin/delivery-persons', color: 'bg-gradient-to-r from-green-500 to-green-600' },
          { icon: BarChart3, label: 'Inventory', href: '/admin/inventories', color: 'bg-gradient-to-r from-amber-500 to-amber-600' },
        ].map((action, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <Button
              asChild
              variant="outline"
              className="w-full h-20 flex flex-col gap-2 hover:border-amber-300 hover:bg-amber-50 transition-all border-gray-200 shadow-sm"
            >
              <Link href={action.href}>
                <div className={`p-2 rounded-full ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
