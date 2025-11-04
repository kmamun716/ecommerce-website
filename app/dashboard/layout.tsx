import Navbar from '@/ui/Dashboard/Navbar'
import Sidebar from '@/ui/Dashboard/Sidebar'
import React from 'react'

type Props = {}

const layout = ({ children }: any) => {
    return (
        <div className='dashboard-container flex'>
            <div className="flex-1 sticky top-0 h-screen">
                <Sidebar />
            </div>
            <div className="flex-4">
                <Navbar />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout