import { Category } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDb();
        const categorys = await Category.find({});
        return NextResponse.json({categorys}, { status: 200 });
    } catch (error) {
        console.error("Error fetching categorys:", error);
        return NextResponse.json({ error: "Failed to fetch Categorys" }, { status: 500 });
    }
}