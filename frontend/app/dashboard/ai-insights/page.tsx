import { Sidebar } from "@/components/dashboard/sidebar"
import { AIInsightsGrid } from "@/components/dashboard/ai-insights-grid"

export default function AIInsightsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="AI Insights" />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <AIInsightsGrid />
        </div>
      </main>
    </div>
  )
}
