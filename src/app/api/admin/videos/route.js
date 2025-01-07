import connectDb from "@/lib/db";
import VideoModel from "@/Models/admin/video";

export async function POST(req){
    
    try{
        await connectDb();
        const formData = await req.json();
        const video = new VideoModel(formData);
        await video.save();
        return new Response(JSON.stringify({message:'Video saved successfully'}), {status:200});
    }catch(err){
        console.error(err);
        return new Response(JSON.stringify({error:'Error in saving video'}), {status:500});
    }
}

export async function GET(req){
    try{
        await connectDb();
        const videos = await VideoModel.find();
        return new Response(JSON.stringify(videos), {status:200});
    }catch(err){
        console.error(err);
        return new Response(JSON.stringify({error:'Error in fetching videos'}), {status:500});
    }
}

export async function DELETE(req){
    const id = req.params.id;
    try{
       await connectDb();
       await VideoModel.findByIdAndDelete(id);
       return new Response(JSON.stringify({message:'Video deleted successfully'}), {status:200});
    }catch(err){
        console.error(err);
        return new Response(JSON.stringify({error:'Error in deleting video'}), {status:500});
    }
}