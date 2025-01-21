import Category from "@/Models/admin/course/category";
import connectDb from "@/lib/db";

export async function POST(req) {
    try {
        await connectDb(); // Ensure the database connection is established
        const { name } = await req.json();
        console.log('the name is ', name);

        const newCat = new Category({ name });
        await newCat.save(); // Save the new category to the database

        return new Response(JSON.stringify(newCat), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: 'Error in creating category' }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        console.log('Connecting to database...');
        await connectDb(); // Ensure the database connection is established

        console.log('Fetching categories...');
        const cats = await Category.find({});

        console.log('Found categories:', cats);

        return new Response(JSON.stringify(cats), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: 'Error in fetching categories' }),
            { status: 500 }
        );
    }
}
