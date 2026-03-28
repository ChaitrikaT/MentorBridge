"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { InteractionForm } from "@/components/dashboard/interaction-form"

export default function InteractionsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Interactions" />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Log Interaction</h1>
            <p className="text-muted-foreground mt-1">Record a mentor-mentee interaction session</p>
          </div>
          <InteractionForm />
        </div>
      </main>
    </div>
  )
}
