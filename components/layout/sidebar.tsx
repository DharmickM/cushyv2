"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Users, FolderKanban, Calendar, FileText, BarChart2, Code, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Dev",
    href: "/dev",
    icon: Code,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "fixed top-14 bottom-0 left-0 z-40 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-300 ease-in-out md:relative md:top-0",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
      className
    )}>
      <div className="flex h-14 items-center justify-between px-3 py-2">
        <h2 className={cn("text-lg font-semibold tracking-tight", !open && "md:hidden")}>
          Cushy
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col space-y-1">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("justify-start", !open && "md:justify-center")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span className={cn("flex-1", !open && "md:hidden")}>{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}