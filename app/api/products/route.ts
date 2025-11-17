// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "@/app/lib/utils";
import { Category, Product } from "@/app/lib/models";
import { saveImage } from "@/app/lib/middleware/upload/saveImage";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const formData = await req.formData();
    console.log(formData)

    // 📝 Parse fields
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const price = Number(formData.get("price"));
    const discountPrice = Number(formData.get("discountPrice")) || 0;
    const brand = (formData.get("brand") as string)?.trim() || "";
    const category = (formData.get("category") as string)?.trim() || "";
    const sku = (formData.get("sku") as string)?.trim() || `SKU-${Date.now()}`;
    const tags = ((formData.get("tags") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const stock = Number(formData.get("stock")) || 0;
    const isFeatured = formData.get("isFeatured") === "true";
    const status = (formData.get("status") as string)?.trim() || "active";
    const galleryFiles = formData.getAll("gallery") as File[];
    // ⚠️ Validate required fields
    if (!title || !description || !price || !galleryFiles || !category) {
      return NextResponse.json(
        { error: "Title, description, price, category, and gallery photo are required." },
        { status: 400 }
      );
    }

    if (discountPrice > price) {
      return NextResponse.json(
        { error: "Discount price cannot exceed regular price." },
        { status: 400 }
      );
    }

    // 🖼️ Save gallery photos
    const galleryUrls: string[] = [];
    for (const file of galleryFiles) {
      const url = await saveImage(file, "product-image");
      galleryUrls.push(url);
    }

    //category name to category id
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    // 🧾 Create Product in MongoDB
    const newProduct = await Product.create({
      title,
      description,
      price,
      discountPrice,
      brand,
      category: categoryDoc._id,
      sku,
      tags,
      stock,
      isFeatured,
      status,
      gallery: galleryUrls,
    });

    return NextResponse.json(
      { message: "✅ Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

//get all products with filters, pagination, sorting
export async function GET(req: Request) {
  try {
    await connectToDb();

    // --- Query Parameters ---
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
    const sort = searchParams.get("sort") || "newest";

    const query: any = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    // --- Sorting options ---
    const sortOptions: any = {
      newest: { createdAt: -1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
    };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOptions[sort] || {}).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}