"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    btnText: string;
    placeholder: string;
    searchOnClick?: () => void;
    btnLink: string;
}

const SearchComp = ({btnText, placeholder, searchOnClick, btnLink}: Props) => {
    const router = useRouter();
    return (
        <div className='flex justify-between px-4 bg-gray-100 py-3 rounded-lg mb-4'>
            <div className="input">
                <input type="text" placeholder={placeholder} className="input-field" />
                <button className="btn btn-ghost btn-circle" onClick={searchOnClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
            </div>
            <button onClick={()=>router.push(`/dashboard/${btnLink}`)} className="btn btn-primary">{btnText}</button>
        </div>
    )
}

export default SearchComp