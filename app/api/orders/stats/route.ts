import { NextResponse } from "next/server";
import { Order } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";

export async function GET(req: Request) {
  try {
    await connectToDb();

    const url = new URL(req.url);
    const mobile = url.searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json({ error: "mobile is required" }, { status: 400 });
    }

    // ---- 1) Total Orders ----
    const totalOrders = await Order.countDocuments({ buyerMobile: mobile });

    // ---- 2) Status Count (delivered / cancelled) ----
    const statusAgg = await Order.aggregate([
      { $match: { buyerMobile: mobile } },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    const statusCount: Record<string, number> = {};
    statusAgg.forEach(s => statusCount[s._id] = s.count);

    // ---- 3) Total products ordered (unit count) ----
    const itemAgg = await Order.aggregate([
      { $match: { buyerMobile: mobile } },
      { $unwind: "$items" },
      { $group: { _id: null, totalQty: { $sum: "$items.quantity" } } }
    ]);

    const totalProducts = itemAgg[0]?.totalQty || 0;

    // ---- 4) Per-product breakdown ----
    const productAgg = await Order.aggregate([
      { $match: { buyerMobile: mobile } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalOrdered: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          productId: "$_id",
          title: "$product.title",
          sku: "$product.sku",
          totalOrdered: 1
        }
      }
    ]);

    return NextResponse.json({
      mobile,
      totalOrders,
      delivered: statusCount["delivered"] || 0,
      cancelled: statusCount["cancelled"] || 0,
      processing: statusCount["processing"] || 0,
      shipped: statusCount["shipped"] || 0,
      totalProducts,
      perProduct: productAgg
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
