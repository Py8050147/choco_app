'use client';

import { Button } from "@/components/ui/button";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllPWarehouses } from "@/http/api";
import { Product } from "@/types";
import { Loader2, MapPin } from "lucide-react";
import { useNewWarehouse } from "@/store/warehouse/warehouse.store";
import { DataTable } from "../_components/data-table";
import WarehouseSheet from "./_components/warehouses-dialog";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const WarehousesPage = () => {
  const { onOpen } = useNewWarehouse()

  const {
    data: warehouses,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['warehouses'],
    queryFn: getAllPWarehouses,
  })

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-purple-50 to-white min-h-screen space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <span className="bg-gradient-to-r from-purple-600 to-purple-500 p-2 rounded-lg text-white">
              <MapPin className="h-8 w-8" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">Warehouses</span>
          </motion.h1>
          <p className="text-gray-500 mt-2">Manage your warehouse locations</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onOpen} className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 border-0 shadow-lg shadow-purple-500/20 text-white font-semibold">
            <MapPin className="h-4 w-4 mr-2" />Add Warehouse
          </Button>
        </motion.div>
        <WarehouseSheet />
      </motion.div>

      <motion.div variants={itemVariants}>
        {isError && <span className="text-red-500">Something went wrong.</span>}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
              <Loader2 className="size-12 text-purple-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 font-medium">Loading warehouses...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={warehouses || []} />
        )}
      </motion.div>
    </motion.div>
  )
}

export default WarehousesPage;