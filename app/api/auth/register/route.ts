import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";

export async function POST(req: Request) {
  try {
    const { name, email, mobile, password } = await req.json();

    // Basic validation
    if (!name || !email || !mobile || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Mobile validation
    if (!/^[0-9]{10,15}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    await connectToDb();

    // Check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      mobile,
      password: hashPassword,
    });

    return NextResponse.json(
      { message: "Registration successful!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Server error, please try again" },
      { status: 500 }
    );
  }
}
