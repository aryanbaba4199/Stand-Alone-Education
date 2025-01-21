import connectDb from "@/lib/db";
import Subcategory from "@/Models/admin/course/subCategory";
import Category from "@/Models/admin/course/category";

export async function POST(req) {
  try {
    await connectDb();

    const  formData  = await req.json();

    console.log(formData);
   



    // Create a new subcategory
    const newSubCat = new Subcategory(formData);
    await newSubCat.save();

    return new Response(JSON.stringify(newSubCat), { status: 200 });
  } catch (err) {
    console.error("Error creating subcategory:", err);
    return new Response(
      JSON.stringify({ error: "Error in creating subcategory" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
    try {
      await connectDb();
  
      const url = new URL(req.url);
      const categoryId = url.searchParams.get("categoryId");
  
      let subcategories;
  
      // If categoryId is provided, filter by it; otherwise, fetch all subcategories
      if (categoryId) {
        subcategories = await Subcategory.find({ categoryId });
      } else {
        subcategories = await Subcategory.find();
      }
  
      return new Response(JSON.stringify(subcategories), { status: 200 });
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      return new Response(
        JSON.stringify({ error: "Error in fetching subcategories" }),
        { status: 500 }
      );
    }
  }