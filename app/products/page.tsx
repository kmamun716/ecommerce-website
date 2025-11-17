import ProductCard from '@/ui/ProductCard';

type Props = { };

const AllProducts = async ({ }: Props) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const { products } = await res.json();
    return (
        <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
            <div className="flex flex-col items-end pt-12">
                <p className="text-2xl font-medium">All products</p>
                <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} currency={process.env.NEXT_PUBLIC_CURRENCY} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};



export default AllProducts;
