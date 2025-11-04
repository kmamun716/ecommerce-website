import React from 'react'

type Props = {}

const RightBar = (props: Props) => {
  return (
    <div>
      <div className="card bg-base-100 w-60 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-60 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar