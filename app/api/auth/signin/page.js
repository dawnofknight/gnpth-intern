import { signIn } from "next-auth/react";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400 }
      );
    }

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Login API Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
