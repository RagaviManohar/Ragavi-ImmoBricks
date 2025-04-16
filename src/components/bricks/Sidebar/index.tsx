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
            "flex items-center",
            open ? "h-16 px-6 py-4 justify-between" : "h-[56px] justify-center py-3"
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
            "flex flex-col",
            open ? "mt-2 px-3" : "px-0 pt-4"
          )}>
            <SidebarMenu className={cn(
              "flex flex-col space-y-2 w-full",
              !open && "items-center"
            )}>
              {mainNavItems.map((item, index) => (
                <SidebarMenuItem key={index} className={cn("w-full", !open && "flex justify-center")}>
                  <Link href={item.href} className={cn("w-full", !open && "flex justify-center")}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      className={cn(
                        "rounded-md",
                        open ? "w-full justify-start px-3 py-2.5" : "w-6 h-6 p-0 flex items-center justify-center",
                        item.isActive ? "bg-[#F8F9FA]" : "hover:bg-[#F8F9FA]/50"
                      )}
                      tooltip={!open ? item.title : undefined}
                    >
                      <div className={cn(
                        "flex items-center justify-center",
                        open ? "w-6 flex-shrink-0" : "w-5 h-5"
                      )}>
                        <item.icon className={cn(
                          open ? "h-5 w-5" : "h-4 w-4", 
                          item.isActive ? "text-[#0E121B]" : "text-[#99A0AE]"
                        )} />
                      </div>
                      
                      {open && (
                        <span className={cn(
                          "ml-3 text-sm font-medium",
                          item.isActive ? "text-[#0E121B]" : "text-[#525866]"
                        )}>
                          {item.title}
                        </span>
                      )}
                      {item.isActive && (
                        <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-sm bg-[#525866]" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className={cn(
              "w-full my-2",
              !open && "px-4"
            )}>
              <Separator color="#E1E4EA" />
            </div>
            
            <SidebarMenu className={cn(
              "flex flex-col space-y-2 w-full",
              !open && "items-center"
            )}>
              {bottomNavItems.map((item, index) => (
                <SidebarMenuItem key={index} className={cn("w-full", !open && "flex justify-center")}>
                  <Link href={item.href} className={cn("w-full", !open && "flex justify-center")}>
                    <SidebarMenuButton
                      className={cn(
                        "rounded-md",
                        open ? "w-full justify-start px-3 py-2.5" : "w-6 h-6 p-0 flex items-center justify-center",
                        "hover:bg-[#F8F9FA]/50"
                      )}
                      tooltip={!open ? item.title : undefined}
                    >
                      <div className={cn(
                        "flex items-center justify-center",
                        open ? "w-6 flex-shrink-0" : "w-5 h-5"
                      )}>
                        <item.icon className={cn(
                          open ? "h-5 w-5" : "h-4 w-4",
                          "text-[#99A0AE]"
                        )} />
                      </div>
                      {open && (
                        <span className="ml-3 text-sm font-medium text-[#525866]">
                          {item.title}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <div className="mt-auto">
            <div className={cn(
              "py-2",
              open ? "px-3" : "px-4"
            )}>
              <Separator color="#E1E4EA" />
            </div>
            
            {user && (
              <SidebarFooter className={cn(
                "py-3",
                open ? "px-3" : "flex justify-center"
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