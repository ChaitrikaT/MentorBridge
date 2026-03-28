"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Calendar, MessageSquare, CheckCircle2, User } from "lucide-react"

// Sample mentor-mentee pairs
const mentorMenteePairs = [
  { id: "1", mentor: "Dr. Ramesh Kumar", mentee: "Aditya Sharma", department: "CSE" },
  { id: "2", mentor: "Dr. Ramesh Kumar", mentee: "Sneha Patel", department: "CSE" },
  { id: "3", mentor: "Prof. Suresh Rao", mentee: "Vikram Singh", department: "ECE" },
  { id: "4", mentor: "Dr. Anita Menon", mentee: "Priya Nair", department: "ME" },
  { id: "5", mentor: "Prof. Mahesh Shetty", mentee: "Rahul Gowda", department: "CE" },
]

// Sample interactions for a pair
const sampleInteractions = [
  {
    id: "1",
    date: "2024-03-15",
    mode: "In-Person",
    notes: "Discussed academic progress and upcoming semester registration. Student is performing well in core subjects.",
    actionItems: "Complete course registration by next week. Submit internship applications.",
    status: "completed"
  },
  {
    id: "2",
    date: "2024-02-28",
    mode: "Online",
    notes: "Career counseling session. Discussed various career paths in software development and data science.",
    actionItems: "Research companies for campus placements. Prepare resume draft.",
    status: "completed"
  },
  {
    id: "3",
    date: "2024-02-10",
    mode: "Phone",
    notes: "Quick check-in regarding exam preparation. Student expressed some concerns about one subject.",
    actionItems: "Schedule extra tutoring sessions for weak subject. Meet with course instructor.",
    status: "completed"
  },
  {
    id: "4",
    date: "2024-01-20",
    mode: "In-Person",
    notes: "Initial meeting to establish mentorship goals and expectations for the semester.",
    actionItems: "Set up regular meeting schedule. Define semester goals.",
    status: "completed"
  },
]

export function IndividualReport() {
  const [selectedPair, setSelectedPair] = useState<string>("")
  const [interactions, setInteractions] = useState(sampleInteractions)

  const selectedPairData = mentorMenteePairs.find(p => p.id === selectedPair)

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download started...")
  }

  return (
    <div className="space-y-6">
      {/* Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Mentor-Mentee Pair</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1 max-w-md space-y-2">
              <Label htmlFor="pair-select">Mentor-Mentee Pair</Label>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger id="pair-select">
                  <SelectValue placeholder="Select a pair" />
                </SelectTrigger>
                <SelectContent>
                  {mentorMenteePairs.map((pair) => (
                    <SelectItem key={pair.id} value={pair.id}>
                      {pair.mentor} - {pair.mentee} ({pair.department})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedPair && (
              <Button onClick={handleDownloadPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {selectedPair && selectedPairData && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Interaction Timeline</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">{selectedPairData.mentor}</span> with <span className="font-medium">{selectedPairData.mentee}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              {interactions.length} interactions
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              {/* Timeline items */}
              <div className="space-y-8">
                {interactions.map((interaction, index) => (
                  <div key={interaction.id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div className="absolute left-2 top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                    </div>
                    
                    {/* Content */}
                    <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(interaction.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {interaction.mode}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Discussion Notes</h4>
                          <p className="text-sm text-muted-foreground">{interaction.notes}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Action Items</h4>
                          <p className="text-sm text-muted-foreground">{interaction.actionItems}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!selectedPair && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-secondary p-4 mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No Pair Selected</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Select a mentor-mentee pair from the dropdown above to view their interaction timeline.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
