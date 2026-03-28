"use client"

import { useState } from "react"
import { RefreshCw, AlertTriangle, AlertCircle, CheckCircle, Sparkles, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type StudentStatus = "at-risk" | "needs-attention" | "on-track"

interface StudentInsight {
  id: string
  menteeName: string
  mentorName: string
  lastInteractionDate: string
  daysSinceInteraction: number
  status: StudentStatus
  aiSuggestion: string
}

const mockInsights: StudentInsight[] = [
  {
    id: "1",
    menteeName: "Rahul Sharma",
    mentorName: "Dr. Priya Nair",
    lastInteractionDate: "2026-02-15",
    daysSinceInteraction: 40,
    status: "at-risk",
    aiSuggestion: "Immediate intervention recommended. Student may be facing academic or personal challenges. Schedule a check-in meeting within this week."
  },
  {
    id: "2",
    menteeName: "Sneha Patel",
    mentorName: "Prof. Rajesh Kumar",
    lastInteractionDate: "2026-02-20",
    daysSinceInteraction: 35,
    status: "at-risk",
    aiSuggestion: "No contact for over a month. Consider reaching out via email or phone to re-establish communication."
  },
  {
    id: "3",
    menteeName: "Amit Desai",
    mentorName: "Dr. Kavitha Rao",
    lastInteractionDate: "2026-03-05",
    daysSinceInteraction: 22,
    status: "needs-attention",
    aiSuggestion: "Approaching critical period. A brief check-in would help maintain engagement and address any emerging concerns."
  },
  {
    id: "4",
    menteeName: "Priya Menon",
    mentorName: "Prof. Suresh Hegde",
    lastInteractionDate: "2026-03-10",
    daysSinceInteraction: 17,
    status: "needs-attention",
    aiSuggestion: "Mid-semester approaching. Consider discussing academic progress and career goals in the next session."
  },
  {
    id: "5",
    menteeName: "Karthik Shetty",
    mentorName: "Dr. Anand Bhat",
    lastInteractionDate: "2026-03-08",
    daysSinceInteraction: 19,
    status: "needs-attention",
    aiSuggestion: "Student showed interest in research projects last meeting. Follow up on potential opportunities."
  },
  {
    id: "6",
    menteeName: "Divya Kulkarni",
    mentorName: "Dr. Priya Nair",
    lastInteractionDate: "2026-03-20",
    daysSinceInteraction: 7,
    status: "on-track",
    aiSuggestion: "Regular engagement observed. Continue current mentoring approach. Consider setting long-term goals."
  },
  {
    id: "7",
    menteeName: "Arjun Nayak",
    mentorName: "Prof. Rajesh Kumar",
    lastInteractionDate: "2026-03-22",
    daysSinceInteraction: 5,
    status: "on-track",
    aiSuggestion: "Strong progress noted. Student is on track for academic milestones. Encourage participation in extracurriculars."
  },
  {
    id: "8",
    menteeName: "Meera Gowda",
    mentorName: "Dr. Kavitha Rao",
    lastInteractionDate: "2026-03-25",
    daysSinceInteraction: 2,
    status: "on-track",
    aiSuggestion: "Excellent engagement. Recent interaction covered placement preparation. Continue supporting career development."
  },
  {
    id: "9",
    menteeName: "Vishnu Prasad",
    mentorName: "Prof. Suresh Hegde",
    lastInteractionDate: "2026-02-25",
    daysSinceInteraction: 30,
    status: "at-risk",
    aiSuggestion: "Critical threshold reached. Student has not been contacted in 30 days. Priority follow-up required."
  },
  {
    id: "10",
    menteeName: "Anjali Rao",
    mentorName: "Dr. Anand Bhat",
    lastInteractionDate: "2026-03-18",
    daysSinceInteraction: 9,
    status: "on-track",
    aiSuggestion: "Consistent progress. Student expressed interest in higher studies. Provide guidance on entrance exams."
  },
  {
    id: "11",
    menteeName: "Rohan Shenoy",
    mentorName: "Dr. Priya Nair",
    lastInteractionDate: "2026-03-02",
    daysSinceInteraction: 25,
    status: "needs-attention",
    aiSuggestion: "Engagement declining. Last session noted some academic concerns. Schedule a follow-up to assess progress."
  },
  {
    id: "12",
    menteeName: "Lakshmi Kamath",
    mentorName: "Prof. Rajesh Kumar",
    lastInteractionDate: "2026-03-24",
    daysSinceInteraction: 3,
    status: "on-track",
    aiSuggestion: "Excellent rapport established. Student is actively seeking guidance. Maintain current meeting frequency."
  }
]

const statusConfig = {
  "at-risk": {
    label: "At Risk",
    bgColor: "bg-red-50 border-red-200",
    headerBg: "bg-red-100",
    textColor: "text-red-700",
    icon: AlertTriangle,
    iconColor: "text-red-500"
  },
  "needs-attention": {
    label: "Needs Attention",
    bgColor: "bg-amber-50 border-amber-200",
    headerBg: "bg-amber-100",
    textColor: "text-amber-700",
    icon: AlertCircle,
    iconColor: "text-amber-500"
  },
  "on-track": {
    label: "On Track",
    bgColor: "bg-green-50 border-green-200",
    headerBg: "bg-green-100",
    textColor: "text-green-700",
    icon: CheckCircle,
    iconColor: "text-green-500"
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

export function AIInsightsGrid() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [insights, setInsights] = useState(mockInsights)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Sort by status priority: at-risk first, then needs-attention, then on-track
  const sortedInsights = [...insights].sort((a, b) => {
    const priority = { "at-risk": 0, "needs-attention": 1, "on-track": 2 }
    return priority[a.status] - priority[b.status]
  })

  const atRiskCount = insights.filter(i => i.status === "at-risk").length
  const needsAttentionCount = insights.filter(i => i.status === "needs-attention").length
  const onTrackCount = insights.filter(i => i.status === "on-track").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground">AI-powered analysis of mentor-mentee engagement</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Refreshing..." : "Refresh Insights"}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-700">{atRiskCount}</p>
            <p className="text-sm text-red-600">At Risk</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-700">{needsAttentionCount}</p>
            <p className="text-sm text-amber-600">Needs Attention</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">{onTrackCount}</p>
            <p className="text-sm text-green-600">On Track</p>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedInsights.map((insight) => {
          const config = statusConfig[insight.status]
          const StatusIcon = config.icon
          
          return (
            <div
              key={insight.id}
              className={cn(
                "overflow-hidden rounded-xl border transition-shadow hover:shadow-md",
                config.bgColor
              )}
            >
              {/* Card Header */}
              <div className={cn("flex items-center justify-between px-4 py-3", config.headerBg)}>
                <div className="flex items-center gap-2">
                  <StatusIcon className={cn("h-4 w-4", config.iconColor)} />
                  <span className={cn("text-sm font-medium", config.textColor)}>
                    {config.label}
                  </span>
                </div>
                <span className={cn("text-xs", config.textColor)}>
                  {insight.daysSinceInteraction} days ago
                </span>
              </div>
              
              {/* Card Content */}
              <div className="space-y-3 p-4">
                {/* Mentee Info */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{insight.menteeName}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span>Mentor: {insight.mentorName}</span>
                  </div>
                </div>

                {/* Last Interaction */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Last Interaction: {formatDate(insight.lastInteractionDate)}</span>
                </div>

                {/* AI Suggestion */}
                <div className="rounded-lg bg-white/60 p-3">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">AI Suggestion</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    {insight.aiSuggestion}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
