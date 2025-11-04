"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { MdNotifications, MdOutlineChat, MdPublic } from 'react-icons/md'

type Props = {}

const Navbar = (props: Props) => {
  const pathName = usePathname();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start none">
        <p className="text-xl">{pathName.split('/').pop()}</p>
      </div>
      <div className="navbar-center">

      </div>
      <div className="navbar-end">
        <label className='input'>
          <input type="text" placeholder="Search" className="grow" />
          <svg className=" h-6 opacity-50 btn btn-ghost" onClick={()=>console.log('search clicked')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </label>
        <div className='flex'>
          <MdOutlineChat size={24} className="ml-4 cursor-pointer" />
          <MdNotifications size={24} className="ml-4 cursor-pointer" />
          <MdPublic size={24} className="ml-4 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Navbar