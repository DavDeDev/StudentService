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
import { useRouter } from 'next/router'
import { DataTableRowActions } from "./data-table-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// use zod schema
const courseSchema = z.object({
  courseId: z.string().min(1),
  courseCode: z.string().min(1),
  courseName: z.string().min(1),
  section: z.string().optional(),
  semester: z.string().optional(),
  numOfStudents: z.number(),
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
    accessorKey: "numOfStudents",
    header: "Students",

  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />

  }
]