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


const studentRegistrationSchema = z.object({
  studentNumber: z.string().min(3),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email(),
  program: z.string().optional(),
  favoriteTopic: z.string().optional(),
  strongestTechnicalSkill: z.string().optional(),
});


export function StudentRegistrationForm() {

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof studentRegistrationSchema>>({
    resolver: zodResolver(studentRegistrationSchema)
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof studentRegistrationSchema>) {
    try {
      // Make a POST request to your server with the registration data with credentials
      // const response = await fetch('http://localhost:3001/student/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      // with axios and cookie
      const response = await axios.post('http://localhost:3001/student/signup', values, {
        withCredentials: true,  // Include this option
      }).then
        ((response) => {
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
          console.error('Registration error:', error);
        })
      ;

      
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <Form {...form}>
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
              <FormDescription></FormDescription>
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
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Anytown" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="555-1234" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="favoriteTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Topic</FormLabel>
              <FormControl>
                <Input placeholder="Web Development" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strongestTechnicalSkill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strongest Technical Skill</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Register</Button>
          <Button type="button" variant="secondary">
            <Link href="/">Login</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
