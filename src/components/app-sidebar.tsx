"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { SearchForm } from "@/components/search-form"
import Link from "next/link"
// import { VersionSwitcher } from "@/components/version-switcher"
import { HomeIcon, Layers, Warehouse, Users, ShoppingCart, Blocks, Package2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
// import { Button } from "./ui/button"

// This is sample data.
const data = {
  // versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    { title: 'Dashboard', href: '/admin', icon: HomeIcon, isActive: false },
    { title: 'Products', href: '/admin/products', icon: Layers, isActive: false },
    { title: 'Warehouses', href: '/admin/warehouses', icon: Warehouse, isActive: false },
    { title: 'Deliver Persons', href: '/admin/delivery-persons', icon: Users, isActive: false },
    { title: 'Orders', href: '/admin/orders', icon: ShoppingCart, isActive: false },
    { title: 'Inventories', href: '/admin/inventories', icon: Blocks, isActive: false },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <Sidebar {...props} className="bg-amber-50">
      <SidebarHeader className="bg-amber-50">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="flex items-center gap-2 font-semibold pl-4">
            <Package2 className="h-6 w-6" />
            <span className="">Choco</span>
          </Link>
        </motion.div>
      </SidebarHeader>
      <SearchForm />
      <SidebarContent className="bg-amber-50">
        {/* We create a SidebarGroup for each parent. */}

        {data.navMain.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            whileHover={{ x: 4 }}
          >
            <SidebarMenuItem className="flex align-middle justify-center pl-8">
              <item.icon className="h-5 w-5 mt-1" />
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link href={item.href}>{item.title}</Link>
                </motion.div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}



// "use client"

// import * as React from "react"
// import { usePathname } from "next/navigation"

// import { SearchForm } from "@/components/search-form"
// import Link from "next/link"
// // import { VersionSwitcher } from "@/components/version-switcher"
// import { HomeIcon, Layers, Warehouse, Users, ShoppingCart, Blocks, Package2 } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// // import { Button } from "./ui/button"

// // This is sample data.
// const data = {
//   // versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     { title: 'Dashboard', href: '/admin', icon: HomeIcon, isActive: false },
//     { title: 'Products', href: '/admin/products', icon: Layers, isActive: false },
//     { title: 'Warehouses', href: '/admin/warehouses', icon: Warehouse, isActive: false },
//     { title: 'Deliver Persons', href: '/admin/delivery-persons', icon: Users, isActive: false },
//     { title: 'Orders', href: '/admin/orders', icon: ShoppingCart, isActive: false },
//     { title: 'Inventories', href: '/admin/inventories', icon: Blocks, isActive: false },
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const pathname = usePathname()

//   const isActive = (href: string) => pathname === href
//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <Link href="/" className="flex items-center gap-2 font-semibold pl-4">
//           <Package2 className="h-6 w-6" />
//           <span className="">Choco</span>
//         </Link>




//       </SidebarHeader>
//       <SidebarContent>
//         {/* We create a SidebarGroup for each parent. */}

//         {data.navMain.map((item) => (
//           <SidebarMenuItem key={item.title} className="flex align-middle justify-center pl-8">
//             <item.icon className="h-5 w-5 mt-1" />
//             <SidebarMenuButton asChild isActive={isActive(item.href)}>
//               <Link href={item.href}>{item.title}</Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   )
// }



// {/* 
//   {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Building Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "API Reference",
//       url: "#",
//       items: [
//         {
//           title: "Components",
//           url: "#",
//         },
//         {
//           title: "File Conventions",
//           url: "#",
//         },
//         {
//           title: "Functions",
//           url: "#",
//         },
//         {
//           title: "next.config.js Options",
//           url: "#",
//         },
//         {
//           title: "CLI",
//           url: "#",
//         },
//         {
//           title: "Edge Runtime",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Architecture",
//       url: "#",
//       items: [
//         {
//           title: "Accessibility",
//           url: "#",
//         },
//         {
//           title: "Fast Refresh",
//           url: "#",
//         },
//         {
//           title: "Next.js Compiler",
//           url: "#",
//         },
//         {
//           title: "Supported Browsers",
//           url: "#",
//         },
//         {
//           title: "Turbopack",
//           url: "#",
//         },
//       ],
//     },
//   */}