"use client";

import SearchComp from "@/ui/SearchComp";
import Pagination from "@/ui/Users/Pagination";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  stock: number;
  photo?: string;
}

type Props = {};

const Products = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Product deleted successfully");
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div>
      <SearchComp
        btnText="Add Product"
        placeholder="Search Product....."
        btnLink="products/addProduct"
      />

      <h3 className="text-xl mb-4">All Products</h3>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Created At</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={p._id}>
                    <th>{index + 1}</th>
                    <td className="flex items-center gap-2">
                      <Link href={`/products/${p._id}`}>
                        <div className="avatar">
                        <div className="mask mask-squircle h-6 w-6">
                          <Image
                            src={p.photo || "/placeholder.png"}
                            alt={p.title}
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                      <span>{p.title}</span>
                      </Link>
                    </td>
                    <td>{p.description}</td>
                    <td>${p.price}</td>
                    <td>{p.category}</td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`${
                          p.stock > 20
                            ? "bg-green-300"
                            : p.stock > 10
                            ? "bg-yellow-300"
                            : "bg-red-300"
                        } p-1 rounded`}
                      >
                        {p.stock} pcs
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <Link
                        href={`/dashboard/products/${p._id}/edit`}
                        className="btn btn-xs btn-info"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-xs bg-red-400"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination />
      </div>
    </div>
  );
};

export default Products;
