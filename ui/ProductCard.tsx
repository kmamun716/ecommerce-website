import React from 'react';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import StarRating from './Ratings';

type Props = {
    product: any;
    currency: string | undefined; // `currency` passed as prop
}

const ProductCard = ({ product, currency }: Props) => {
    // Server-side logic: Remove client-specific logic like router.push and window.scrollTo
    return (
        <div className="flex flex-col items-start gap-0.5 max-w-[200px] w-full">
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.gallery[0]}
                    alt={product.title}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <CiHeart />
                </button>
            </div>

            {/* Linking to product page */}
            <Link href={`/products/${product._id}`} className="md:text-base font-medium pt-2 w-full truncate">
                {product.title}
            </Link>
            <Link href={`/products/categorys/${product.category._id}`} className="link text-blue-400">
                {product.category.name}
            </Link>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
                {product.description.length >= 50
                    ? product.description.slice(0, 50)
                    : product.description}
            </p>
            <div className="flex items-center gap-2">
                <StarRating rating={product.avgRating} />
                <span className="text-sm text-gray-600">({product.avgRating.toFixed(1)})</span>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">
                    {currency}{product.discountPrice > 0 ? product.discountPrice : product.price}
                </p>
                {/* Note: The button onClick function is now irrelevant in a server component */}
                <Link href={`/products/${product._id}`}>
                    <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:btn btn-sm transition">
                        Buy now
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
