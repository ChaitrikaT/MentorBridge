"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { AllocationsTable } from "@/components/dashboard/allocations-table"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Allocation" />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <AllocationsTable />
        </div>
      </main>
    </div>
  )
}
