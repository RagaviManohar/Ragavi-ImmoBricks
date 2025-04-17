import { cn } from "@/lib/utils"
import { ChevronRight, LucideIcon } from "lucide-react"
import Link from "next/link"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export interface NavItem {
  title: string
  icon: LucideIcon
  href: string
  isActive?: boolean
}

interface SidebarNavItemsProps {
  items: NavItem[]
  open: boolean
}

export const SidebarNavItems = ({ items, open }: SidebarNavItemsProps) => {
  return (
    <SidebarMenu className={cn(
      "flex flex-col gap-0 w-full",
      !open && "items-center"
    )}>
      {items.map((item, index) => (
        <SidebarMenuItem key={index} className={cn("w-full pt-1", !open && "flex justify-center")}>
          <Link href={item.href} className="w-full relative">
            {/* Highlights the active selected item */}
            <div className={cn(
                  "absolute top-0 left-0 w-1 h-full bg-neutral-200 invisible",
                  item.isActive && "visible",
                )}/>
            <div className={cn("w-full", !open && "flex justify-center")}>
              <SidebarMenuButton
                  isActive={item.isActive}
                  className={cn(
                    "rounded-md",
                    open ? "w-full justify-start" : "w-6 h-6 p-0 flex items-center justify-center hover:bg-neutral-50",
                  )}
                  tooltip={!open ? item.title : undefined}
                >
                  <div className={cn(
                    "flex items-center justify-center",
                    open ? "w-full px-5 justify-start" : "w-6 h-6 p-0 flex items-center justify-center"
                  )}>
                    <div className={cn(
                      "flex items-center justify-center",
                      open ? "w-6 flex-shrink-0" : "w-5 h-5"
                    )}>
                      <item.icon className={cn(
                        "h-5 w-5", 
                        item.isActive ? "text-neutral-950" : "text-neutral-400"
                      )} />
                    </div>
                    
                    {open && (
                      <div className="w-full flex items-center justify-between">
                        <span className={cn("ml-3 text-sm font-medium flex-shrink-0",
                          item.isActive ? "text-neutral-950 flex-shrink-0" : "text-neutral-600"
                        )}>
                          {item.title}
                        </span>
                        {item.isActive && <ChevronRight className="ml-auto h-5 w-5 text-neutral-600" />}
                      </div>
                      
                    )}
                  </div>
                </SidebarMenuButton>
            </div>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
} 