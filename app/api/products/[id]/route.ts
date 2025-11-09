// app/api/products/[id]/route.ts
import { saveImage } from "@/app/lib/middleware/upload/saveImage";
import { Product } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface ProductContext {
  params: Promise<{ id: string }>; // 👈 because params is async
}

//get single product by id
export async function GET(req: Request, context: ProductContext) {
  try {
    const {id} = await context.params;
    await connectToDb();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};

//update product by id
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDb();
    const { id } = params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await req.formData();

    // --- Text / Number Fields ---
    const title = (formData.get("title") as string) || product.title;
    const description = (formData.get("description") as string) || product.description;
    const price = Number(formData.get("price")) || product.price;
    const discountPrice = Number(formData.get("discountPrice")) || product.discountPrice;
    const brand = (formData.get("brand") as string) || product.brand;
    const category = (formData.get("category") as string) || product.category;
    const sku = (formData.get("sku") as string) || product.sku;
    const tags =
      (formData.get("tags") as string)
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || product.tags;
    const stock = Number(formData.get("stock")) || product.stock;
    const isFeatured = formData.get("isFeatured") === "true" || product.isFeatured;
    const status = (formData.get("status") as string) || product.status;

    // --- Image Upload ---
    const newPhoto = formData.get("photo") as File | null;
    const galleryFiles = formData.getAll("gallery") as File[];

    // Replace main photo
    let photoUrl = product.photo;
    if (newPhoto) {
      // Delete old photo
      if (photoUrl) {
        const oldPath = path.join(process.cwd(), "public", photoUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      photoUrl = await saveImage(newPhoto, "product-image");
    }

    // Replace/add gallery images
    let galleryUrls = product.gallery || [];
    if (galleryFiles.length > 0) {
      const newGalleryUrls: string[] = [];
      for (const file of galleryFiles) {
        const url = await saveImage(file, "product-image");
        newGalleryUrls.push(url);
      }
      // galleryUrls = [...product.gallery,...newGalleryUrls]; 
      galleryUrls = newGalleryUrls; //delete old gallery and add new ones
    }

    // --- Update Product ---
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        discountPrice,
        brand,
        category,
        sku,
        tags,
        stock,
        isFeatured,
        status,
        photo: photoUrl,
        gallery: galleryUrls,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "✅ Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectToDb();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
