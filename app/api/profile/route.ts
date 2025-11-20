import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectToDb } from "@/app/lib/utils";
import { User } from "@/app/lib/models";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDb();
    const user = await User.findById(session.user.id).select("-password");
    return NextResponse.json({ user });
}
