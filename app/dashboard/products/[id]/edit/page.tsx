"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand?: string;
  category: string;
  sku?: string;
  tags?: string[];
  stock: number;
  isFeatured: boolean;
  status: string;
  photo?: string;
  gallery?: string[];
}

interface Props {

}

export default function EditProductForm({ }: Props) {
  const params = useParams();
  const productId = params.id;
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    price: 0,
    discountPrice: 0,
    brand: "",
    category: "",
    sku: "",
    tags: "",
    stock: 0,
    isFeatured: false,
    status: "active",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch existing product data
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      setProduct(data);

      // Prefill formData
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        discountPrice: data.discountPrice || 0,
        brand: data.brand || "",
        category: data.category,
        sku: data.sku || "",
        tags: data.tags?.join(",") || "",
        stock: data.stock,
        isFeatured: data.isFeatured,
        status: data.status,
      });
    }
    fetchProduct();
  }, [productId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));

    if (photo) body.append("photo", photo);
    if (gallery) {
      Array.from(gallery).forEach((file) => body.append("gallery", file));
    }

    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      body,
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) alert("✅ Product updated successfully!");
    else alert(`❌ Error: ${data.error}`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">✏️ Edit Product</h1>
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
                value={formData.brand}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Main Photo</legend>
              {product.photo && (
                <Image alt={product?.title} width={32} height={32} src={product.photo} className="w-32 h-32 object-cover mb-2" />
              )}
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gallery</legend>
              <div className="flex gap-2 mb-2 flex-wrap">
                {product.gallery?.map((url, i) => (
                  <Image key={i} src={url} alt={product?.title} className="w-20 h-20 object-cover" />
                ))}
              </div>
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
              <legend className="fieldset-legend">Category</legend>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Pick a Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="beauty">Beauty</option>
                <option value="grocery">Grocery</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Stock</legend>
              <input
                type="number"
                name="stock"
                className="input input-bordered w-full"
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
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
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
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </fieldset>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
