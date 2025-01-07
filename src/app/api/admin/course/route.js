import connectDb from "@/lib/db";
import CourseModel from "@/Models/admin/course";


export async function POST(req) {
  try {
    await connectDb(); 
    const formData = await req.json();
    console.log(formData);
    const course = new CourseModel(formData);
    await course.save(); 
    return new Response(
      JSON.stringify({ message: "Course saved successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Error in saving course" }),
      { status: 500 }
    );
  }
}

// Handle GET request: Fetch all courses
export async function GET(req) {
  try {
    await connectDb(); // Connect to the database
    const courses = await CourseModel.find(); // Fetch all courses
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Error in fetching courses" }),
      { status: 500 }
    );
  }
}

// Handle DELETE request: Delete a course by ID
export async function DELETE(req) {
  try {
    await connectDb(); // Connect to the database

    // Extract the ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Course ID is required" }),
        { status: 400 }
      );
    }

    // Delete the course by ID
    await CourseModel.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "Course deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Error in deleting course" }),
      { status: 500 }
    );
  }
}
