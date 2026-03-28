"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type AddAllocationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (mentorId: string, menteeId: string) => void
}

const mentors = [
  { id: "m1", name: "Dr. Rajesh Kumar", department: "Computer Science" },
  { id: "m2", name: "Prof. Priya Nair", department: "Electronics" },
  { id: "m3", name: "Dr. Suresh Rao", department: "Mechanical" },
  { id: "m4", name: "Prof. Anita Desai", department: "Civil" },
  { id: "m5", name: "Dr. Kiran Shetty", department: "Computer Science" },
]

const mentees = [
  { id: "s1", name: "Aditya Sharma", year: "2nd Year" },
  { id: "s2", name: "Sneha Patel", year: "3rd Year" },
  { id: "s3", name: "Vikram Singh", year: "1st Year" },
  { id: "s4", name: "Meera Joshi", year: "4th Year" },
  { id: "s5", name: "Rahul Menon", year: "2nd Year" },
  { id: "s6", name: "Priya Verma", year: "1st Year" },
]

export function AddAllocationModal({
  open,
  onOpenChange,
  onAdd,
}: AddAllocationModalProps) {
  const [selectedMentor, setSelectedMentor] = useState("")
  const [selectedMentee, setSelectedMentee] = useState("")

  const handleSubmit = () => {
    if (selectedMentor && selectedMentee) {
      onAdd(selectedMentor, selectedMentee)
      setSelectedMentor("")
      setSelectedMentee("")
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedMentor("")
      setSelectedMentee("")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Allocation</DialogTitle>
          <DialogDescription>
            Select a mentor and mentee to create a new allocation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Mentor Select */}
          <div className="space-y-2">
            <Label htmlFor="mentor">Select Mentor</Label>
            <Select value={selectedMentor} onValueChange={setSelectedMentor}>
              <SelectTrigger id="mentor" className="w-full">
                <SelectValue placeholder="Choose a mentor" />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    <span className="font-medium">{mentor.name}</span>
                    <span className="ml-2 text-muted-foreground">
                      - {mentor.department}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mentee Select */}
          <div className="space-y-2">
            <Label htmlFor="mentee">Select Mentee</Label>
            <Select value={selectedMentee} onValueChange={setSelectedMentee}>
              <SelectTrigger id="mentee" className="w-full">
                <SelectValue placeholder="Choose a mentee" />
              </SelectTrigger>
              <SelectContent>
                {mentees.map((mentee) => (
                  <SelectItem key={mentee.id} value={mentee.id}>
                    <span className="font-medium">{mentee.name}</span>
                    <span className="ml-2 text-muted-foreground">
                      - {mentee.year}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedMentor || !selectedMentee}
          >
            Add Allocation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
