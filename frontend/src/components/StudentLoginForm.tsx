"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import axios from "axios"


const studentLoginSchema = z.object({
  studentNumber: z.string().min(3, { message: "Student number must be at least 3 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});



export function StudentLoginForm() {

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof studentLoginSchema>>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      studentNumber: "",
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof studentLoginSchema>) {

    // with axios and cookie

    await axios.post('http://localhost:3001/student/login', values, {
      withCredentials: true,  // Include this option
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data.studentId) {
          console.log('Student ID:', response.data.studentId);
          router.push("/student/" + response.data.studentId);
        } else {
          console.error('Student ID not found in the response');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });


    // console.log("login form submitted", values)
    // // Make a POST request to your server with the login data
    // const response = await fetch('http://localhost:3001/student/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // });
    // if (response.ok) {
    //   // Successful login
    //   const data = await response.json();
    //   console.log(data)

    //   if (data.studentId) {
    //     // Access the studentId and use it as needed
    //     console.log('Student ID:', data.studentId);
    //     // Perform actions with the studentId, such as redirecting
    //     // router.push("someBasePath/" + route)
    //     router.push("/student/" + data.studentId);
    //   } else {
    //     console.error('Student ID not found in the response');
    //   }

    // } else {
    //   // Handle login error
    //   const data = await response.json();
    //   console.error('Login error:', data.error);
    // }
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/4">
        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Number</FormLabel>
              <FormControl>
                <Input placeholder="301247544" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="301247544" type="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Login</Button>
          <Button type="button" variant="secondary" >
            <Link href="/student/register">Register</Link></Button>
        </div>
      </form>
    </Form >
  )
}
