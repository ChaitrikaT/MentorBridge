import { Sidebar } from "@/components/dashboard/sidebar"
import { ConsolidatedListTable } from "@/components/dashboard/consolidated-list-table"

export default function ConsolidatedListPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Consolidated List" />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <ConsolidatedListTable />
        </div>
      </main>
    </div>
  )
}
