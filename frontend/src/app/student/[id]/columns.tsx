"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { z } from "zod"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// use zod schema
const courseSchema = z.object({
  courseCode: z.string().min(1),
  courseName: z.string().min(1),
  section: z.string().optional(),
  semester: z.string().optional(),
  students: z.array(z.string()),
});

export type CourseType = z.infer<typeof courseSchema>

export const columns: ColumnDef<CourseType>[] = [
  {
    accessorKey: "courseCode",
    header: "Course Code",
  },
  {
    accessorKey: "courseName",
    header: "Name",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "students",
    header: "Students",
    cell: ({ row }) => {
      return (

        // count the number of students in the course

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {row.original.students.length}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Students</DropdownMenuLabel>
            {row.original.students.map((student) => (
              <DropdownMenuItem key={student}>{student}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]