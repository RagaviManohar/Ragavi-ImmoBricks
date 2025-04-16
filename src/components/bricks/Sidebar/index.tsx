"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

import {
  Sidebar as UISidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Separator, TitleWithSubText } from "@/components/bricks"
import { NavItem, SidebarNavItems } from "./SidebarNavItems"

export interface SidebarProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  header:{
    // logo: should be included with the SVG type or image
    title: string
    description: string
  }
  mainNavItems?: NavItem[]
  bottomNavItems?: NavItem[]
  user?: {
    name: string
    email: string
    initials: string
    avatarColor?: string
  }
}

export function Sidebar({
  isOpen = true,
  onOpenChange,
  header,
  mainNavItems = [],
  bottomNavItems = [],
  user,
}: SidebarProps) {
  const [open, setOpen] = useState(isOpen)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }
  
  // Handle mouse hover events
  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    // If sidebar is closed, open it
    if (!open) {
      handleOpenChange(true)
    }
  }
  
  const handleMouseLeave = () => {
    // Only close if it was opened by hover
    if (open && !isOpen) {
      // Add small delay to prevent flickering
      hoverTimeoutRef.current = setTimeout(() => {
        handleOpenChange(false)
      }, 300)
    }
  }

  // Sync with external isOpen prop
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])
  
  return (
    <SidebarProvider open={open} onOpenChange={handleOpenChange}>
      <div 
        className="flex h-screen"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UISidebar 
          collapsible="icon"
          className="border-r border-[#E1E4EA] bg-white shadow-sm"
          variant="sidebar"
          style={{ 
            width: open ? "260px" : "80px",
            transition: "width 200ms ease-in-out"
          }}
        >
          <SidebarHeader className={cn(
            "flex items-center py-4 h-20",
            open ? "px-6 justify-between" : "justify-center"
          )}>
            <div className={cn(
              "flex items-center h-full gap-3",
              open ? "w-full justify-start" : "justify-center"
            )}>
              <div className="w-8 h-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/icons/immo-logo-1.svg"
                  alt="Immo Logo"
                  width={24}
                  height={24}
                />
              </div>
              {open && (
                <div className="w-full">
                  <TitleWithSubText 
                    title={header.title} 
                    subText={header.description}
                    titleClassName="text-base font-semibold"
                    subTextClassName="text-[#757A85]"
                  />
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent className={cn(
            "flex flex-col pt-5",
            open ? "px-3" : "px-0"
          )}>
            <SidebarNavItems items={mainNavItems} open={open} />
            
            <div className={cn(
              "w-full my-2",
              !open && "px-4"
            )}>
              <Separator color="#E1E4EA" />
            </div>
            
            <SidebarNavItems items={bottomNavItems} open={open} />
          </SidebarContent>

          <div className={cn(
            "py-2",
            open ? "px-3" : "px-4"
          )}>
            <Separator color="#E1E4EA" />
          </div>

          <div className="mt-auto">
            {user && (
              <SidebarFooter className={cn(
                "py-3",
                open ? "px-6" : "flex justify-center"
              )}>
                <div className={cn(
                  "flex items-center",
                  open ? "gap-3 justify-start" : "justify-center"
                )}>
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white",
                      user.avatarColor || "bg-[#006E6E]"
                    )}
                  >
                    <span className="text-base font-medium">
                      {user.initials}
                    </span>
                  </div>
                  {open && (
                    <div className="overflow-hidden">
                      <TitleWithSubText 
                        title={user.name} 
                        subText={user.email}
                        titleClassName="truncate"
                        subTextClassName="truncate text-[#757A85] pt-0"
                      />
                    </div>
                  )}
                </div>
              </SidebarFooter>
            )}
          </div>
        </UISidebar>
      </div>
    </SidebarProvider>
  )
} 