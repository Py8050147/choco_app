"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import ProductSheet from "./_components/product-sheet";
import { Loader2 } from "lucide-react";
import { columns } from "./_components/columns";
import { DataTable } from "../_components/data-table";
import { getAllProducts } from "@/http/api";

const ProductsPage = () => {
  // Fetch products data with react-query
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size="sm">Add Product</Button>
      </div>

      {/* Add Product Modal */}
      <ProductSheet />

      {/* Error Handling */}
      {isError && <span className="text-red-500">Something went wrong.</span>}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        // Data Table
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
};

export default ProductsPage;


// "use client"

// import { Button } from '@/components/ui/button';
// import { Product } from '@/types';
// import { useQuery } from '@tanstack/react-query';
// import React from 'react'
// import ProductSheet from './_components/product-sheet';
// import { Loader2 } from 'lucide-react';
// import { columns } from './_components/columns';
// import { DataTable } from '../_components/data-table';
// import { getAllProducts } from '@/http/api';

// const ProductsPage = () => {
//   // const { onOpen } = useNewProduct();

//   const {
//       data: products,
//       isLoading,
//       isError,
//   } = useQuery<Product[]>({
//       queryKey: ['products'],
//       queryFn: getAllProducts,
//   });

//   return (
//       <>
//           <div className="flex items-center justify-between">
//               <h3 className="text-2xl font-bold tracking-tight">Products</h3>
//               <Button size={'sm'} >
//                   Add Product
//               </Button>
//               <ProductSheet />
//           </div>

//           {isError && <span className="text-red-500">Something went wrong.</span>}

//           {isLoading ? (
//               <div className="flex items-center justify-center">
//                   <Loader2 className="size-10 animate-spin" />
//               </div>
//           ) : (
//               <DataTable columns={columns} data={products || []} />
//           )}
//       </>
//   );
// };

// export default ProductsPage;
// // function useNewProduct(): { onOpen: any; } {
// //   throw new Error('Function not implemented.');
// // }

