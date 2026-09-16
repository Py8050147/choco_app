'use client';

import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { Inventory } from "@/types";
import { getAllInventories } from "@/http/api";
import InventorySheet from "./_components/inventory-dialog";
import { DataTable } from "../_components/data-table";
import { Button } from "@/components/ui/button";
import { useNewInventory } from "@/store/inventory/inventory-store";
import { Loader2, Package } from "lucide-react";
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

const InventoriesPage = () => {
  const { onOpen } = useNewInventory();

  const {
    data: inventories,
    isLoading,
    isError,
  } = useQuery<Inventory[]>({
    queryKey: ['inventories'],
    queryFn: getAllInventories,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-amber-50 to-green-100 min-h-screen space-y-6"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 flex items-center gap-3"
          >
            <span className="bg-gradient-to-r from-green-600 to-green-500 p-2 rounded-lg text-white">
              <Package className="h-8 w-8" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
              Inventories
            </span>
          </motion.h1>
          <p className="text-gray-500 mt-2">Track and manage your stock levels</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onOpen} className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-0 shadow-lg shadow-green-500/20 text-white font-semibold">
            <Package className="h-4 w-4 mr-2" />
            Add Inventory
          </Button>
        </motion.div>
        <InventorySheet />
      </motion.div>

      <motion.div variants={itemVariants}>
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 font-semibold"
          >
            ❌ Something went wrong loading inventories
          </motion.div>
        )}

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
              <Loader2 className="size-12 text-green-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 font-medium">Loading inventories...</p>
          </motion.div>
        ) : inventories && inventories.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <DataTable columns={columns} data={inventories || []} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-lg border-2 border-dashed border-green-200 bg-green-50"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-4">
              📦
            </motion.div>
            <p className="text-gray-600 text-lg font-semibold">No inventories yet</p>
            <p className="text-gray-500 mt-2">Start tracking your stock by adding inventory</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InventoriesPage;