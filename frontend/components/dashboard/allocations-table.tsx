"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddAllocationModal } from "./add-allocation-modal"

type Allocation = {
  id: string
  mentorName: string
  department: string
  menteeName: string
  year: string
  status: "Active" | "Pending" | "Completed"
}

const initialAllocations: Allocation[] = [
  {
    id: "1",
    mentorName: "Dr. Rajesh Kumar",
    department: "Computer Science",
    menteeName: "Aditya Sharma",
    year: "2nd Year",
    status: "Active",
  },
  {
    id: "2",
    mentorName: "Prof. Priya Nair",
    department: "Electronics",
    menteeName: "Sneha Patel",
    year: "3rd Year",
    status: "Active",
  },
  {
    id: "3",
    mentorName: "Dr. Suresh Rao",
    department: "Mechanical",
    menteeName: "Vikram Singh",
    year: "1st Year",
    status: "Pending",
  },
  {
    id: "4",
    mentorName: "Prof. Anita Desai",
    department: "Civil",
    menteeName: "Meera Joshi",
    year: "4th Year",
    status: "Completed",
  },
  {
    id: "5",
    mentorName: "Dr. Kiran Shetty",
    department: "Computer Science",
    menteeName: "Rahul Menon",
    year: "2nd Year",
    status: "Active",
  },
]

const statusStyles: Record<Allocation["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Completed: "bg-slate-100 text-slate-700 border-slate-200",
}

export function AllocationsTable() {
  const [allocations, setAllocations] = useState<Allocation[]>(initialAllocations)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddAllocation = (mentorId: string, menteeId: string) => {
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

    const mentor = mentors.find((m) => m.id === mentorId)
    const mentee = mentees.find((m) => m.id === menteeId)

    if (mentor && mentee) {
      const newAllocation: Allocation = {
        id: String(allocations.length + 1),
        mentorName: mentor.name,
        department: mentor.department,
        menteeName: mentee.name,
        year: mentee.year,
        status: "Pending",
      }
      setAllocations([...allocations, newAllocation])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Mentor-Mentee Allocations
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and view all mentor-mentee assignments
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Allocation
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-semibold">Mentor Name</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Mentee Name</TableHead>
              <TableHead className="font-semibold">Year</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell className="font-medium">{allocation.mentorName}</TableCell>
                <TableCell>{allocation.department}</TableCell>
                <TableCell>{allocation.menteeName}</TableCell>
                <TableCell>{allocation.year}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusStyles[allocation.status]}
                  >
                    {allocation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <AddAllocationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={handleAddAllocation}
      />
    </div>
  )
}
