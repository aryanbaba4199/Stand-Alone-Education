import CityModel from "@/Models/admin/city";

export async function POST(req) {
  try {
    const formData = await req.json();
    const city = new CityModel(formData);
    await city.save();
    return new Response(
      JSON.stringify({ message: "City saved successfully" }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const cities = await CityModel.find();
    return new Response(JSON.stringify(cities), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await CityModel.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "City deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
