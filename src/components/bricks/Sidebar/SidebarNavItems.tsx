import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
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
      "flex flex-col space-y-2 w-full",
      !open && "items-center"
    )}>
      {items.map((item, index) => (
        <SidebarMenuItem key={index} className={cn("w-full", !open && "flex justify-center")}>
          <Link href={item.href} className={cn("w-full", !open && "flex justify-center")}>
            <SidebarMenuButton
              isActive={item.isActive}
              className={cn(
                "rounded-md py-2.5",
                open ? "w-full justify-start" : "w-6 h-6 p-0 flex items-center justify-center",
                item.isActive ? "bg-[#F8F9FA]" : "hover:bg-[#F8F9FA]/50"
              )}
              tooltip={!open ? item.title : undefined}
            >
              <div className={cn(
                "flex items-center justify-center",
                open ? "w-full px-3 justify-start" : "w-6 h-6 p-0 flex items-center justify-center"
              )}>
                <div className={cn(
                  "flex items-center justify-center",
                  open ? "w-6 flex-shrink-0" : "w-5 h-5"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5", 
                    item.isActive ? "text-[#0E121B]" : "text-[#99A0AE]"
                  )} />
                </div>
                
                {open && (
                  <span className={cn(
                    "ml-3 text-sm font-medium",
                    item.isActive ? "text-[#0E121B] flex-shrink-0" : "text-[#525866]"
                  )}>
                    {item.title}
                  </span>
                )}
              </div>
              
              {item.isActive && (
                <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-sm bg-[#525866]" />
              )}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
} 