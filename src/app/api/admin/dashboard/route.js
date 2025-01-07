import connectDb from "@/lib/db";
import CourseModel from "@/Models/admin/course";
import Users from "@/Models/users";


export async function GET(req){
    try{
        const users = await Users.find();
        const TotalUser = await Users.countDocuments();
        const courses = await CourseModel.find();
        const data = {users, TotalUser, courses};
        return new Response(JSON.stringify(data), {status: 200});
    }catch(e){
        console.error(e);
        return new Response(JSON.stringify({error:'Error in fetching videos'}), {status:500});
    }
}