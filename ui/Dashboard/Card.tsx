import React from 'react'

type Props = {
    title: string;
    quantity: number;
    description: string;
}

const Card = ({title, quantity, description}: Props) => {
  return (
    <div className="card w-74 bg-base-100 card-xs shadow-sm cursor-pointer hover:shadow-md transition-shadow">
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <h3 className="text-2xl font-bold">{quantity}</h3>
    <p>{description}</p>
  </div>
</div>
  )
}

export default Card