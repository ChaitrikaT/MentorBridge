"use client"

import Link from "next/link"
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Sparkles,
  GraduationCap,
  LogOut,
  List
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems: { name: string; icon: typeof Users; href: string }[] = [
  { name: "Allocation", icon: Users, href: "/dashboard" },
  { name: "Interactions", icon: MessageSquare, href: "/dashboard/interactions" },
  { name: "Consolidated List", icon: List, href: "/dashboard/consolidated-list" },
  { name: "Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "AI Insights", icon: Sparkles, href: "/dashboard/ai-insights" },
]

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem = "Allocation" }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">MentorBridge</h1>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
