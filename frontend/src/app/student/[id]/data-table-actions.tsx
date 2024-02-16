'use client'
import { usePathname, useSearchParams } from 'next/navigation'

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const pathname = usePathname()

  const router = useRouter();

  console.log(pathname);



  const dropCourse = async (courseId: string) => {
    const studentId = pathname.split('/')[2];
    console.log(studentId);
    if (!studentId) {
      console.error('Student ID not found in the URL');
      return;
    }

    console.log("Dropping course " + courseId);

    try {
      // const response = await fetch(`http://localhost:3001/student/${studentId}/courses/${courseId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     credentials: 'include',
      //     'Authorization': `Bearer ${token}`,

      //   }
      // });

      // if (!response.ok) {
      //   throw new Error(`Failed to drop course: ${response.statusText}`);
      // }

      // console.log("Course dropped successfully");
      // // router.replace(pathname);
      // router.refresh();

      // with axios and cookies
      await axios.delete(`http://localhost:3001/student/${studentId}/courses/${courseId}`, {
        withCredentials: true,  // Include this option
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        // }
      }).then((response) => {
          console.log(response);
          console.log(response.data);
          router.refresh();
        })
        .catch((error) => {
          console.error('Drop course error:', error);
        })
      
    } catch (error) {
      console.error("Error dropping course:", error);
      throw error;
    }
  };
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
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => dropCourse((row.original as { courseId: string }).courseId)}>Drop</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}