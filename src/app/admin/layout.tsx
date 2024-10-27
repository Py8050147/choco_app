import React from 'react'
// AdminPage
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Dropdown from './_components/dropdown'

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className='flex items-center '>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb >
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

         </div>
          <div>
          <Dropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                      {/* bg-muted/50 */}
            <div className="aspect-video rounded-xl  bg-amber-300 border border-red-800"/>
            <div className="aspect-video rounded-xl bg-amber-300 border border-red-800" />
            <div className="aspect-video rounded-xl  bg-amber-300 border border-red-800" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-pink-400 md:min-h-min border border-red-800" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardLayout