import Link from 'next/link'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 items-center my-2'>
      <h1 className='text-xl underline'>Login Here</h1>
      <form action="">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input" placeholder="Your Email" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" className="input" placeholder="Your Password" required />
        </fieldset>
        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>
      <p>Not have any account?<Link href="/register" className='text-blue-600 underline'> Register Here</Link></p>
    </div>
  )
}

export default Login