import React from 'react'

type Props = {}

const CategoryPageById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/categorys/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { categorys } = await res.json();
  console.log("Categorys:", categorys);
  return (
    <>
      <div>
        <h1>Category Page for: <span className='text-blue-300'>{categorys.name}</span></h1>
      </div>
    </>
  )
}

export default CategoryPageById