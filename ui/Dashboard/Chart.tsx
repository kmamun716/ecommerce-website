"use client"
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {}

const Chart = (props: Props) => {
  const data = [
  {
    name: 'Sat',
    click: 4000,
    visit: 2400,
    amt: 2400,
  },
  {
    name: 'Sun',
    click: 3000,
    visit: 1398,
    amt: 2210,
  },
  {
    name: 'Mon',
    click: 2000,
    visit: 9800,
    amt: 2290,
  },
  {
    name: 'Tue',
    click: 2780,
    visit: 3908,
    amt: 2000,
  },
  {
    name: 'Wed',
    click: 1890,
    visit: 4800,
    amt: 2181,
  },
  {
    name: 'Thu',
    click: 2390,
    visit: 3800,
    amt: 2500,
  },
  {
    name: 'Fri',
    click: 3490,
    visit: 4300,
    amt: 2100,
  },
];
  return (
    <div>
      <h2 className='text-xl my-2'>Sales Analytics</h2>
      <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 15,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
    </LineChart>
    </div>
  )
}

export default Chart