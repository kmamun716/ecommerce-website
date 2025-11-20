import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
    provider: {
        type: String,
        enum: ["local", "google", "facebook", "github"],
        default: "local"
    },
    providerId: { type: String }, // Google/Facebook/Github unique ID
    addresses: [
        {
            label: String,
            address: String,
            city: String,
            area: String,
            postalCode: String,
            country: { type: String, default: "Bangladesh" }
        }
    ],
    isAdmin: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });


// Product Schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    gallery: [{ type: String }],
    stock: { type: Number, required: true, min: 0 },
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

// Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    photo: { type: String },
}, { timestamps: true });

// Coupon Schema
const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });


// Cart Schema
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            price: { type: Number }, // product price snapshot
        }
    ],

    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

//order Schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
            price: Number,
        }
    ],
    totalAmount: Number,
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing",
    },
    shippingAddress: {
        address: String,
        city: String,
        area: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: { type: String, enum: ["cod", "online"], default: "cod" },
}, { timestamps: true });



export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);