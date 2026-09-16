'use client';

import { getAllOrders } from "@/http/api";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import { motion } from 'framer-motion';

import React from 'react'
import { DataTable } from "../_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const OrdersPage = () => {
    const {
        data: orders,
        isLoading,
        isError
    } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 flex items-center gap-3"
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-lg text-white">
              <ShoppingCart className="h-8 w-8" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
              Orders
            </span>
          </motion.h1>
          <p className="text-gray-500 mt-2">Manage and track customer orders</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 font-semibold"
          >
            ❌ Something went wrong loading orders
          </motion.div>
        )}

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Loader2 className="size-12 text-blue-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
          </motion.div>
        ) : orders && orders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <DataTable columns={columns} data={orders || []} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📦
            </motion.div>
            <p className="text-gray-600 text-lg font-semibold">No orders yet</p>
            <p className="text-gray-500 mt-2">Orders will appear here once customers make purchases</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default OrdersPage
