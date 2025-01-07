import connectDb from "@/lib/db";
import jwt from "jsonwebtoken";
import Users from "@/Models/users";

const secret = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDb();
  try {
    const formData = await req.json();
    const isLogin = formData.isLogin;
    if (isLogin) {
      const ValidUser = await handleLogin(formData);
      if (ValidUser) {
        const token = generateToken(ValidUser);

        return new Response(
          JSON.stringify({ token, userType: ValidUser.userType }),
          {
            status: 200,
          }
        );
      }
    } else {
      const existUser = await Users.findOne({ mobile: formData.mobile });

      if (existUser) {
        return new Response(JSON.stringify({ error: "User already exist" }), {
          status: 400,
        });
      }
      const user = new Users(formData);
      console.log(user);
      await user.save();
      const token = generateToken(user);
      return new Response(JSON.stringify({ token, userType: user.userType }), {
        status: 200,
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error in registration" }), {
      status: 500,
    });
  }
}

const handleLogin = async (formData) => {
  try {
    const user = await Users.findOne({
      mobile: formData.mobile,
      password: formData.password,
    });
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      userType: user.userType,
    },
    secret,
    { expiresIn: "8000h" }
  );
  return token;
};
