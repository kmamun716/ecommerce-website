"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const {getCategorys, categorys} = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    brand: "",
    category: "",
    stock: "",
    sku: "",
    tags: "",
    isFeatured: false,
    status: "active",
  });
  const router = useRouter();

  const [gallery, setGallery] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, String(value));
    });

    if (gallery) Array.from(gallery).forEach((file) => form.append("gallery", file));

    const res = await fetch("/api/products", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      toast.success("✅ Product added successfully!");
      router.push("/dashboard/products");
    } else {
      toast.error("❌ Something went wrong!");
    }
  };

  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">🛍️ Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side */}
          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                placeholder="Product Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price</legend>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Discount Price</legend>
              <input
                type="number"
                name="discountPrice"
                className="input input-bordered w-full"
                placeholder="Discount Price (optional)"
                value={formData.discountPrice}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Brand</legend>
              <input
                type="text"
                name="brand"
                className="input input-bordered w-full"
                placeholder="Brand Name"
                value={formData.brand}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gallery (Multiple Images)</legend>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                accept="image/*"
                onChange={(e) => setGallery(e.target.files)}
              />
            </fieldset>
          </div>

          {/* Right side */}
          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Select Category</legend>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Pick a Category</option>
                {
                  categorys.map((cat: any) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                }
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Stock</legend>
              <input
                type="number"
                name="stock"
                className="input input-bordered w-full"
                placeholder="Product Stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">SKU</legend>
              <input
                type="text"
                name="sku"
                className="input input-bordered w-full"
                placeholder="Unique Product Code"
                value={formData.sku}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Tags</legend>
              <input
                type="text"
                name="tags"
                className="input input-bordered w-full"
                placeholder="comma,separated,tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset flex items-center justify-between">
              <label className="label cursor-pointer">
                <span className="label-text">Featured Product?</span>
                <input
                  type="checkbox"
                  name="isFeatured"
                  className="toggle toggle-primary ml-3"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Status</legend>
              <select
                name="status"
                className="select select-bordered w-full"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </fieldset>
          </div>
        </div>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            name="description"
            className="textarea textarea-bordered h-32 w-full"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </fieldset>

        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
