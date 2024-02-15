"use client";

import { StudentLoginForm } from "@/components/StudentLoginForm";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <StudentLoginForm />
    </main>
  );
}
