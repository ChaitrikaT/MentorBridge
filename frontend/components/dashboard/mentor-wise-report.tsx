"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Users, MessageSquare, TrendingUp } from "lucide-react"

// Sample mentor data
const mentorData = [
  { 
    id: "1", 
    name: "Dr. Ramesh Kumar", 
    department: "CSE", 
    menteeCount: 8, 
    totalInteractions: 64, 
    avgInteractionsPerMentee: 8,
    lastActive: "2024-03-18",
    status: "active"
  },
  { 
    id: "2", 
    name: "Prof. Suresh Rao", 
    department: "ECE", 
    menteeCount: 6, 
    totalInteractions: 42, 
    avgInteractionsPerMentee: 7,
    lastActive: "2024-03-15",
    status: "active"
  },
  { 
    id: "3", 
    name: "Dr. Anita Menon", 
    department: "ME", 
    menteeCount: 7, 
    totalInteractions: 56, 
    avgInteractionsPerMentee: 8,
    lastActive: "2024-03-17",
    status: "active"
  },
  { 
    id: "4", 
    name: "Prof. Mahesh Shetty", 
    department: "CE", 
    menteeCount: 5, 
    totalInteractions: 35, 
    avgInteractionsPerMentee: 7,
    lastActive: "2024-03-10",
    status: "active"
  },
  { 
    id: "5", 
    name: "Dr. Priya Sharma", 
    department: "CSE", 
    menteeCount: 6, 
    totalInteractions: 48, 
    avgInteractionsPerMentee: 8,
    lastActive: "2024-03-16",
    status: "active"
  },
  { 
    id: "6", 
    name: "Prof. Kiran Bhat", 
    department: "ECE", 
    menteeCount: 4, 
    totalInteractions: 12, 
    avgInteractionsPerMentee: 3,
    lastActive: "2024-02-28",
    status: "inactive"
  },
  { 
    id: "7", 
    name: "Dr. Sunita Kamath", 
    department: "ME", 
    menteeCount: 7, 
    totalInteractions: 49, 
    avgInteractionsPerMentee: 7,
    lastActive: "2024-03-14",
    status: "active"
  },
  { 
    id: "8", 
    name: "Prof. Arun Nayak", 
    department: "CE", 
    menteeCount: 5, 
    totalInteractions: 15, 
    avgInteractionsPerMentee: 3,
    lastActive: "2024-02-20",
    status: "inactive"
  },
]

export function MentorWiseReport() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMentors = mentorData.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalMentors = mentorData.length
  const activeMentors = mentorData.filter(m => m.status === "active").length
  const totalInteractions = mentorData.reduce((sum, m) => sum + m.totalInteractions, 0)
  const totalMentees = mentorData.reduce((sum, m) => sum + m.menteeCount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Mentors</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalMentors}</div>
            <p className="text-xs text-muted-foreground">{activeMentors} active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Mentees</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalMentees}</div>
            <p className="text-xs text-muted-foreground">Across all mentors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Interactions</CardDescription>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalInteractions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Avg per Mentor</CardDescription>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{Math.round(totalInteractions / totalMentors)}</div>
            <p className="text-xs text-muted-foreground">Interactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Mentor Summary</CardTitle>
              <CardDescription>Overview of all mentors and their interaction counts</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-medium">Mentor Name</TableHead>
                  <TableHead className="font-medium">Department</TableHead>
                  <TableHead className="font-medium text-center">Mentees</TableHead>
                  <TableHead className="font-medium text-center">Total Interactions</TableHead>
                  <TableHead className="font-medium text-center">Avg/Mentee</TableHead>
                  <TableHead className="font-medium">Last Active</TableHead>
                  <TableHead className="font-medium text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentors.map((mentor) => (
                  <TableRow key={mentor.id}>
                    <TableCell className="font-medium text-foreground">{mentor.name}</TableCell>
                    <TableCell className="text-muted-foreground">{mentor.department}</TableCell>
                    <TableCell className="text-center">{mentor.menteeCount}</TableCell>
                    <TableCell className="text-center font-medium">{mentor.totalInteractions}</TableCell>
                    <TableCell className="text-center">{mentor.avgInteractionsPerMentee}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(mentor.lastActive).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={mentor.status === "active" ? "default" : "destructive"}
                        className={mentor.status === "active" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {mentor.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {filteredMentors.length} of {mentorData.length} mentors
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
