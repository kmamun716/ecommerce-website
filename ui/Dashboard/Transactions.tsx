import React from 'react'

type Props = {}

const Transactions = (props: Props) => {
  const tableData=[
    {
      img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      name: "Hart Hagerty",
      from: "United States",
      status: "pending",
      date: "May 20, 2023",
      amount: "$122.00"
    },
    {
      img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      name: "Hart Hagerty",
      from: "United States",
      status: "completed",
      date: "May 20, 2023",
      amount: "$122.00"
    },
    {
      img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      name: "Hart Hagerty",
      from: "United States",
      status: "cancelled",
      date: "May 20, 2023",
      amount: "$122.00"
    },
    {
      img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      name: "Hart Hagerty",
      from: "United States",
      status: "pending",
      date: "May 20, 2023",
      amount: "$122.00"
    },
  ]
  return (
    <div className='my-2'>
      <h2 className='text-xl'>Latest Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              tableData.map((data, index) => <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-8 w-8">
                      <img
                        src={data.img}
                        alt={data.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data.name}</div>
                    <div className="text-sm opacity-50">{data.from}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`px-2 py-1 rounded ${
                  data.status === "pending" && "bg-yellow-400" ||
                  data.status === "completed" && "bg-green-400" ||
                  data.status === "cancelled" && "bg-red-400"
                  }`}>{data.status}</span>
              </td>
              <td>{data.date}</td>
              <th>
                {data.amount}
              </th>
            </tr>)
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Transactions