"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import {
  Sidebar as UISidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Separator, TitleWithSubText } from "@/components/bricks"
export interface NavItem {
  title: string
  icon: LucideIcon
  href: string
  isActive?: boolean
}

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
        className="flex h-screen "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UISidebar 
          collapsible="icon"
          className="border-r border-[#E1E4EA] shadow-sm"
          variant="sidebar"
          style={{ 
            width: open ? "260px" : "80px",
            transition: "width 200ms ease-in-out"
          }}
        >
          <SidebarHeader className="flex h-[80px] items-center justify-between px-5 py-5">
            <div className={cn(
              "flex items-center w-full h-full gap-3 justify-start",
            )}>
              <div className="w-10 h-full flex items-center justify-center">
                {/* TODO: Get the Immo SVG Logo from the design system */}
                <Image
                  src="/icons/immo-logo-1.svg"
                  alt="Immo Logo"
                  width={24}
                  height={24}
                />
              </div>
              {open && (
                <div className="w-full">
                  <TitleWithSubText title={header.title} subText={header.description} />
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent className="px-5 py-4">
            <SidebarMenu className="flex flex-col gap-1">
              {mainNavItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={item.isActive}
                      className={cn(
                        "w-full justify-start gap-2 rounded-lg",
                        open ? "px-3 py-2" : "justify-center py-2",
                        item.isActive && "bg-[#F8F9FA]"
                      )}
                      tooltip={!open ? item.title : undefined}
                    >
                      {/* <div className="w-10 h-5 py-2 flex items-center justify-center"> */}
                        <item.icon className={cn(
                          "h-5 w-5 ", 
                          item.isActive ? "text-[#0E121B]" : "text-[#99A0AE]"
                        )} />
                      {/* </div> */}
                      
                      {open && (
                        <span className={cn(
                          "text-sm font-medium",
                          item.isActive ? "text-[#0E121B]" : "text-[#525866]"
                        )}>
                          {item.title}
                        </span>
                      )}
                      {open && item.isActive && (
                        <div className="absolute -left-[20px] top-2 h-[24px] w-1 rounded-r-md bg-[#E1E4EA]" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {/* TODO: Tailwind css style sheet should be created for having the theme colors */}
            <Separator color="#E1E4EA" />
            
            <SidebarMenu className="flex flex-col gap-1">
              {bottomNavItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      className={cn(
                        "w-full justify-start gap-2 rounded-lg",
                        open ? "px-3 py-2" : "justify-center py-2"
                      )}
                      tooltip={!open ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 text-[#99A0AE]" />
                      {open && (
                        <span className="text-sm font-medium text-[#525866]">
                          {item.title}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          {/* TODO: Tailwind css style sheet should be created for having the theme colors */}
          <div className="px-5">
              <Separator color="#E1E4EA" />
            </div>
          
          {user && (
            <SidebarFooter className="px-5 py-4">
              <div className={cn(
                "flex items-center gap-3 justify-start",
              )}>
                <div
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    user.avatarColor || "bg-[#006E6E]"
                  )}
                >
                  <span className="text-base font-medium text-white">
                    {user.initials}
                  </span>
                </div>
                {open && (
                  <TitleWithSubText title={user.name} subText={user.email} />
                )}
              </div>
            </SidebarFooter>
          )}
        </UISidebar>
      </div>
    </SidebarProvider>
  )
} 