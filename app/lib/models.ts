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
    photo: { type: String, required: true },
    stock: { type: Number, required: true, min: 0  },
}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);