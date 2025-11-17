"use client";
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard"); // successful login
    } else {
      toast.error(res?.error || "Login failed");
    }
  };
  return (
    <div className='flex flex-col gap-4 items-center my-2'>
      <h1 className='text-xl underline'>Login Here</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-xs'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Your Email" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Your Password" required />
        </fieldset>
        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>
      <p>Not have any account?<Link href="/register" className='text-blue-600 underline'> Register Here</Link></p>
    </div>
  )
}

export default Login