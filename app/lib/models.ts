import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String},
    isAdmin: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    photo: { type: String, required: true },
    gallery: [{ type: String }],
    stock: { type: Number, required: true, min: 0  },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    brand: { type: String },
    sku: { type: String, unique: true }, // product tracking code
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }], // search-friendly keywords
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
      },
    ],
    avgRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },    
}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);