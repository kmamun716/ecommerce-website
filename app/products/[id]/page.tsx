import { console } from 'inspector';
import React from 'react'

interface Props {
  params: Promise<{ id: string }>;
}

const SingleProduct = async ({params}: Props) => {
 const { id } = await params;

 const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: 'no-store',
  });
  const product = await data.json();

  console.log("Single Product Data:", product);
  
  return (
    <div>SignleProduct</div>
  )
}

export default SingleProduct