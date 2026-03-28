"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndividualReport } from "./individual-report"
import { YearWiseReport } from "./year-wise-report"
import { MentorWiseReport } from "./mentor-wise-report"

export function ReportsTabs() {
  return (
    <Tabs defaultValue="individual" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="individual">Individual Report</TabsTrigger>
        <TabsTrigger value="yearwise">Year-wise Report</TabsTrigger>
        <TabsTrigger value="mentorwise">Mentor-wise Report</TabsTrigger>
      </TabsList>
      
      <TabsContent value="individual">
        <IndividualReport />
      </TabsContent>
      
      <TabsContent value="yearwise">
        <YearWiseReport />
      </TabsContent>
      
      <TabsContent value="mentorwise">
        <MentorWiseReport />
      </TabsContent>
    </Tabs>
  )
}
