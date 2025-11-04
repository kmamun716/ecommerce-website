"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserLogo from '@/assets/boy_with_laptop_image.png'
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdShowChart,
  MdSupervisedUserCircle
} from 'react-icons/md'
import { usePathname } from 'next/navigation'

type Props = {}

const menuItems = [
  {
    title: "pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />
      },
    ]
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdShowChart />
      },
      {
        title: "Rports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />
      },
    ]
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />
      },
      {
        title: "Logout",
        icon: <MdLogout />
      },
    ]
  }
]


const Sidebar = (props: Props) => {
  const pathName = usePathname();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="flex gap-2 mb-6">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <Image src={UserLogo} alt="User" className="mb-6 ml-2 " />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg">John Doe</h2>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
          <li><Link href='/'>Home</Link></li>
          {menuItems.map((menu, index) => (
            <li key={index}>
              <span className="menu-title mt-4"> {menu.title}</span>
              {menu.list.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.path ? (
                    <Link href={item.path} className={`flex items-center gap-2 w-full text-left ${pathName === item.path ? 'bg-primary text-white' : ''}`}>
                      {item.icon}
                      {item.title}
                    </Link>
                  ) : (
                    <button className={`flex items-center gap-2 w-full text-left ${pathName === item.path ? 'bg-primary text-white' : ''}`}>
                      {item.icon}
                      {item.title}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar