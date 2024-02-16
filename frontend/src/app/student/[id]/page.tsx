import { DataTable } from "./data-table";
import { CourseType, columns } from "./columns"


async function getData(studentId: string): Promise<CourseType[]> {
  console.log("---------------------------------------");
  try {
    const response = await fetch(`http://localhost:3001/student/${studentId}/courses`,  { cache: 'no-store' });
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    if (data.courses && data.courses.length > 0) {
      // Assuming the API response contains an array of courses
      return data.courses;
    } else {
      throw new Error("No courses found in the API response");
    }
  } catch (error) { 
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export default async function Home({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
       <DataTable columns={columns} data={data} /> 
    </main>
  );
}
