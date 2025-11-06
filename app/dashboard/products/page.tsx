import SearchComp from '@/ui/SearchComp'
import Pagination from '@/ui/Users/Pagination'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Products = (props: Props) => {
  return (
    <div>
      <SearchComp btnText='Add Product' placeholder='Search Product.....' btnLink='products/addProduct'/>
      <h3 className='text-xl'>All Products</h3>
      <div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
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
                    <tr>
                      <th>1</th>
                      <td className='flex gap-1'>
                        <div className="avatar">
                          <div className="mask mask-squircle h-6 w-6">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                              width={6}
                              height={6}
                            />
                          </div>
                        </div>
                        <span>I phone</span>
                      </td>
                      <td>apple mobile</td>
                      <td>$150</td>
                      <td>Mobile</td>
                      <td>12/16/2020</td>
                      <td><span className={`bg-yellow-300 p-1 rounded`}>40 pcs</span></td>
                      <td><button className='btn btn-xs btn-info'>Edit</button> <button className='btn btn-xs bg-red-400'>Delete</button></td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td className='flex gap-1'>
                        <div className="avatar">
                          <div className="mask mask-squircle h-6 w-6">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                              width={6}
                              height={6}
                            />
                          </div>
                        </div>
                        Samsung
                      </td>
                      <td>Mobile</td>
                      <td>$20</td>
                      <td>Mobile</td>
                      <td>12/16/2020</td>
                      <td><span className={`bg-green-300 p-1 rounded`}>35 pcs</span></td>
                      <td><button className='btn btn-xs btn-info'>Edit</button> <button className='btn btn-xs bg-red-400'>Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Pagination />
            </div>
    </div>
  )
}

export default Products