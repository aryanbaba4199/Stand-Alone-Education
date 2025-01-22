import connectDb from "@/lib/db";
import VideoModel from "@/Models/admin/video";

export async function POST(req) {
  try {
    await connectDb();

    const formData = await req.json();
    const newRank = formData.rank;

    if (!newRank) {
      return new Response(JSON.stringify({ error: "Rank is required" }), {
        status: 400,
      });
    }

    // Increment the ranks of existing videos with ranks >= newRank
    await VideoModel.updateMany(
      { rank: { $gte: newRank } }, // Match videos with rank >= newRank
      { $inc: { rank: 1 } } // Increment rank by 1
    );

    // Create and save the new video
    const video = new VideoModel(formData);
    await video.save();

    return new Response(
      JSON.stringify({ message: "Video saved successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error in saving video" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectDb();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Use find for a list of videos matching the course ID
      const videos = await VideoModel.find({ course: id });
      return new Response(JSON.stringify(videos), { status: 200 });
    } else {
      // If no ID is provided, return all videos
      const videos = await VideoModel.find();
      return new Response(JSON.stringify(videos), { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error in fetching videos" }), {
      status: 500,
    });
  }
}




export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    await connectDb();
    await VideoModel.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "Video deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error in deleting video" }), {
      status: 500,
    });
  }
}



