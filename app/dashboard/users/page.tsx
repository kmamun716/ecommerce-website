import SearchComp from '@/ui/SearchComp'
import Pagination from '@/ui/Users/Pagination'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Users = (props: Props) => {
  const handleSearch = () => { }
  return (
    <div>
      <SearchComp btnText='Add User' placeholder='Search User.....' btnLink='users/addUser' />
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Created At</th>
                <th>Status</th>
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
                  <span>Cy Ganderton</span>
                </td>
                <td>a@b.com</td>
                <td>01775299499</td>
                <td>12/16/2020</td>
                <td><span className={`bg-yellow-300 p-1 rounded`}>pending</span></td>
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
                  Hart Hagerty
                </td>
                <td>a@b.com</td>
                <td>01775299499</td>
                <td>12/16/2020</td>
                <td><span className={`bg-green-300 p-1 rounded`}>success</span></td>
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

export default Users