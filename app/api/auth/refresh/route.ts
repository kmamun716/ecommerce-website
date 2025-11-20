import { NextResponse, NextRequest } from "next/server";
import { verifyToken, signAccessToken } from "@/app/lib/jwt";
import { connectToDb } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

    // Verify refresh
    let payload;
    try {
      payload = verifyToken(refreshToken);
    } catch (err) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    // Optional: ensure user still exists
    await connectToDb();
    const user = await User.findById((payload as any).id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newAccessToken = signAccessToken({ id: user._id, email: user.email, isAdmin: user.isAdmin });

    const res = NextResponse.json({ message: "Token refreshed" }, { status: 200 });
    res.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
