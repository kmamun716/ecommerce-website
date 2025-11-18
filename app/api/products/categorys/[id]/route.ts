import { Category } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request,  ctx: RouteContext<'/api/products/categorys/[id]'> ) {
    try {
        const {id} = await ctx.params;
        await connectToDb();
        const categorys = await Category.findById(id).populate('products');
        return NextResponse.json({categorys}, { status: 200 });
    } catch (error) {
        console.error("Error fetching categorys:", error);
        return NextResponse.json({ error: "Failed to fetch Categorys" }, { status: 500 });
    }
}