"use client"

import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProductSheet from './_components/product-dialog';
import { Loader2, Package } from 'lucide-react';
import { columns } from './_components/columns';
import { DataTable } from '../_components/data-table';
import { getAllProducts } from '@/http/api';
import { useNewProduct } from '@/store/product/product-store';
import { motion } from 'framer-motion';

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

const ProductsPage = () => {
  const { onOpen } = useNewProduct();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-amber-50 to-white min-h-screen space-y-6"
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
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 p-2 rounded-lg text-white">
              <Package className="h-8 w-8" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
              Products
            </span>
          </motion.h1>
          <p className="text-gray-500 mt-2">Manage your product inventory</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-lg shadow-amber-500/20 text-white font-semibold"
          >
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </motion.div>
        <ProductSheet />
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 font-semibold"
          >
            ❌ Something went wrong loading products
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
              <Loader2 className="size-12 text-amber-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
          </motion.div>
        ) : products && products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <DataTable columns={columns} data={products || []} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-lg border-2 border-dashed border-amber-200 bg-amber-50"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🍫
            </motion.div>
            <p className="text-gray-600 text-lg font-semibold">No products yet</p>
            <p className="text-gray-500 mt-2">Get started by adding your first product</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Button
                onClick={onOpen}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-0 shadow-lg shadow-amber-500/20 text-white font-semibold"
              >
                <Package className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductsPage;
