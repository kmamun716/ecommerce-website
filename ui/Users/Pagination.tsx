import React from 'react'

type Props = {}

const Pagination = (props: Props) => {
  return (
    <div className='flex justify-between px-4 bg-gray-100 py-3 rounded-lg mt-4'>
        <button className='btn btn-accent btn-xs'>Prev</button>
        <button className='btn btn-info btn-xs'>Next</button>
    </div>
  )
}

export default Pagination