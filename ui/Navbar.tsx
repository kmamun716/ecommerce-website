"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdLogout, MdOutlineSettings, MdOutlineShoppingBag } from "react-icons/md";

type Props = {}

export default function Navbar({ }: Props) {
  const { isSeller, router } = useAppContext();
  const path = usePathname();

  if (path?.includes('/dashboard')) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/dashboard')} className="btn text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-60 p-2 shadow">
            <li>
              <a className="justify-between">
                <Image className="rounded" width={60} height={60} src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="" />
                <div>
                  <p className="badge">John Doe</p>
                  <p className="text-xs text-gray-500">kazimamun716@gmail.com</p>
                </div>
              </a>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdOutlineSettings />
                <span>Manage Account</span>
              </Link>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdOutlineShoppingBag />
                <span>My Orders</span>
              </Link>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdLogout />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/dashboard')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <p className="badge">John Doe</p>
              <p className="text-xs text-gray-500">kazimamun716@gmail.com</p>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdOutlineSettings />
                <span>Manage Account</span>
              </Link>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdOutlineShoppingBag />
                <span>My Orders</span>
              </Link>
            </li>
            <li>
              <Link href="" className="justify-start gap-2">
                <MdLogout />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}