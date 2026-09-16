'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { columns } from './_components/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllDeliveryPersons } from '@/http/api';
import { Product } from '@/types';
import { Loader2, Users } from 'lucide-react';
import { useNewDeliveryPerson } from '@/store/deliveryPerson/delivery-person-store';
import { DataTable } from '../_components/data-table';
import DeliveryPersonSheet from './_components/delivery-person-dialog';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DeliveryPersonsPage = () => {
  const { onOpen } = useNewDeliveryPerson();

  const {
    data: deliveryPersons,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['delivery-persons'],
    queryFn: getAllDeliveryPersons,
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-amber-50 to-cyan-100 min-h-screen space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-2 rounded-lg text-white">
              <Users className="h-8 w-8" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-500">Delivery Persons</span>
          </motion.h1>
          <p className="text-gray-500 mt-2">Manage your delivery team</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onOpen} className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 border-0 shadow-lg shadow-cyan-500/20 text-white font-semibold">
            <Users className="h-4 w-4 mr-2" />Add Delivery Person
          </Button>
        </motion.div>
        <DeliveryPersonSheet />
      </motion.div>

      <motion.div variants={itemVariants}>
        {isError && <span className="text-red-500">Something went wrong.</span>}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
              <Loader2 className="size-12 text-cyan-600" />
            </motion.div>
            <p className="mt-4 text-gray-600 font-medium">Loading delivery persons...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={deliveryPersons || []} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default DeliveryPersonsPage;
