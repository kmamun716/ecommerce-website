import Link from 'next/link'
import React from 'react'

type Props = {}

const Register = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 items-center my-2'>
      <h1 className='text-xl underline'>Register Here</h1>
      <form action="">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input type="text" className="input" placeholder="Your Name" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input" placeholder="Your Email" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobile</legend>
          <input type="text" className="input" placeholder="Your Mobile" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" className="input" placeholder="Your Password" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input type="password" className="input" placeholder="Confirm Password" required />
        </fieldset>
        <button type="submit" className="btn btn-primary mt-4">Register</button>
      </form>
      <p>Already have an account?<Link href="/login" className='text-blue-600 underline'> Login Here</Link></p>
    </div>
  )
}

export default Register