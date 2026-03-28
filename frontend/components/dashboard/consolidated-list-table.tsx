"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type MentorMenteeRecord = {
  id: string
  mentorName: string
  department: string
  menteeName: string
  academicYear: string
  lastInteractionDate: string
  status: "Active" | "Inactive"
}

const records: MentorMenteeRecord[] = [
  {
    id: "1",
    mentorName: "Dr. Rajesh Kumar",
    department: "Computer Science",
    menteeName: "Aditya Sharma",
    academicYear: "2nd Year",
    lastInteractionDate: "2026-03-20",
    status: "Active",
  },
  {
    id: "2",
    mentorName: "Prof. Priya Nair",
    department: "Electronics",
    menteeName: "Sneha Patel",
    academicYear: "3rd Year",
    lastInteractionDate: "2026-03-18",
    status: "Active",
  },
  {
    id: "3",
    mentorName: "Dr. Suresh Rao",
    department: "Mechanical",
    menteeName: "Vikram Singh",
    academicYear: "1st Year",
    lastInteractionDate: "2026-02-28",
    status: "Inactive",
  },
  {
    id: "4",
    mentorName: "Prof. Anita Desai",
    department: "Civil",
    menteeName: "Meera Joshi",
    academicYear: "4th Year",
    lastInteractionDate: "2026-03-22",
    status: "Active",
  },
  {
    id: "5",
    mentorName: "Dr. Kiran Shetty",
    department: "Computer Science",
    menteeName: "Rahul Menon",
    academicYear: "2nd Year",
    lastInteractionDate: "2026-01-15",
    status: "Inactive",
  },
  {
    id: "6",
    mentorName: "Prof. Lakshmi Iyer",
    department: "Electronics",
    menteeName: "Arjun Nair",
    academicYear: "3rd Year",
    lastInteractionDate: "2026-03-25",
    status: "Active",
  },
  {
    id: "7",
    mentorName: "Dr. Venkat Reddy",
    department: "Mechanical",
    menteeName: "Kavya Reddy",
    academicYear: "1st Year",
    lastInteractionDate: "2026-03-10",
    status: "Active",
  },
  {
    id: "8",
    mentorName: "Prof. Maya Hegde",
    department: "Civil",
    menteeName: "Sanjay Kulkarni",
    academicYear: "2nd Year",
    lastInteractionDate: "2026-02-05",
    status: "Inactive",
  },
]

const departments = ["All Departments", "Computer Science", "Electronics", "Mechanical", "Civil"]
const years = ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"]

const statusStyles: Record<MentorMenteeRecord["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Inactive: "bg-red-100 text-red-700 border-red-200",
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function ConsolidatedListTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        searchQuery === "" ||
        record.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.menteeName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        record.department === selectedDepartment

      const matchesYear =
        selectedYear === "All Years" || record.academicYear === selectedYear

      return matchesSearch && matchesDepartment && matchesYear
    })
  }, [searchQuery, selectedDepartment, selectedYear])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Consolidated List
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View all mentor-mentee pairs with their interaction status
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by mentor or mentee name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px] bg-card">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-semibold">Mentor Name</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Mentee Name</TableHead>
              <TableHead className="font-semibold">Academic Year</TableHead>
              <TableHead className="font-semibold">Last Interaction</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No records found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.mentorName}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.menteeName}</TableCell>
                  <TableCell>{record.academicYear}</TableCell>
                  <TableCell>{formatDate(record.lastInteractionDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusStyles[record.status]}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredRecords.length} of {records.length} records
      </p>
    </div>
  )
}
