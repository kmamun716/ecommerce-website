import Card from '@/ui/Dashboard/Card'
import Chart from '@/ui/Dashboard/Chart'
import RightBar from '@/ui/Dashboard/RightBar'
import Transactions from '@/ui/Dashboard/Transactions'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='flex gap-2 mt-2'>
      <div className='flex-3'>
        <div className='flex gap-2 space-between'>
          <Card description='Users of this site' title='Total Users' quantity={40}/>
          <Card description='Products of this site' title='Total Products' quantity={40}/>
          <Card description='Sales of products' title='Total Sales' quantity={40}/>
        </div>
        <Transactions/>
        <Chart/>
      </div>
      <div className='flex-1 sticky top-2 h-fit'>
        <RightBar />
      </div>
    </div>
  )
}

export default Dashboard