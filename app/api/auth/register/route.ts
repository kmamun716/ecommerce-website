import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, ...rest } = body;

  if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

  await connectToDb();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({email, password: hashedPassword, ...rest });

  return NextResponse.json({ message: "User created", user: { id: user._id, email: user.email, name: user.name } }, { status: 201 });
}
