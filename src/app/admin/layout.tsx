'use client';

import React from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Dropdown from './_components/dropdown';
import Link from 'next/link';
import { motion } from 'framer-motion';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {/* Sidebar wrapper - fixed positioning/pointer-events-none removed, given its own bg */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white"
      >
        <AppSidebar />
      </motion.div>

      <SidebarInset>
        {/* Animated Background - stays fixed + pointer-events-none, this is the correct layer for it */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-amber-50 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"
          />
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md px-4 md:px-6 justify-between shadow-sm sticky top-0 z-40"
        >
          <div className='flex items-center gap-3'>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <SidebarTrigger className="-ml-1 hover:bg-amber-50 transition-colors" />
            </motion.div>
            <Separator orientation="vertical" className="mr-2 h-6 bg-amber-200" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin" className="text-amber-700 hover:text-amber-800 font-medium transition-colors">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-amber-300" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-700 font-semibold">Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-amber-50 transition-colors relative"
            >
              <span className="text-xl">🔔</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
              ></motion.span>
            </motion.button>
            <Dropdown />
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 relative">
          {/* Removed redundant grid background div that duplicated the fixed gradient behind it */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;



// 'use client';

// import React from 'react';
// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import Dropdown from './_components/dropdown';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <SidebarProvider>
//       <motion.div
//         initial={{ opacity: 0, x: -10 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}

//       >
//         <AppSidebar />
//       </motion.div>

//       <SidebarInset>
//         {/* Animated Background */}
//         <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-amber-50 pointer-events-none">
//           <motion.div
//             animate={{ opacity: [0.3, 0.6, 0.3] }}
//             transition={{ duration: 8, repeat: Infinity }}
//             className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{ opacity: [0.2, 0.5, 0.2] }}
//             transition={{ duration: 10, repeat: Infinity, delay: 1 }}
//             className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"
//           />
//         </div>

//         {/* Header */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md px-4 md:px-6 justify-between shadow-sm sticky top-0 z-40"
//         >
//           <div className='flex items-center gap-3'>
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <SidebarTrigger className="-ml-1 hover:bg-amber-50 transition-colors" />
//             </motion.div>
//             <Separator orientation="vertical" className="mr-2 h-6 bg-amber-200" />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink asChild>
//                     <Link href="/admin" className="text-amber-700 hover:text-amber-800 font-medium transition-colors">
//                       Dashboard
//                     </Link>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="text-amber-300" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage className="text-gray-700 font-semibold">Overview</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//           <div className="flex items-center gap-3">
//             {/* Notification bell */}
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 10 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-full hover:bg-amber-50 transition-colors relative"
//             >
//               <span className="text-xl">🔔</span>
//               <motion.span
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
//               ></motion.span>
//             </motion.button>
//             <Dropdown />
//           </div>
//         </motion.header>

//         {/* Main Content */}
//         <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 relative">
//           {/* Animated grid background */}
//           <div className="fixed inset-0 -z-20 pointer-events-none">
//             <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-transparent" />
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             {children}
//           </motion.div>
//         </main>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default DashboardLayout;