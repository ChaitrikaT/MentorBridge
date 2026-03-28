import { Sidebar } from "@/components/dashboard/sidebar"
import { ReportsTabs } from "@/components/dashboard/reports-tabs"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Reports" />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
            <p className="text-sm text-muted-foreground">
              View and download interaction reports
            </p>
          </div>
          
          <ReportsTabs />
        </div>
      </main>
    </div>
  )
}
