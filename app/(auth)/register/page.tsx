"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const Register = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password }),
    });

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success(data.message);
      router.push("/login"); // redirect to signin page
    } else {
      toast.error(data.error || "Signup failed");
    }
  };
  return (
    <div className='flex flex-col gap-4 items-center my-2'>
      <h1 className='text-xl underline'>Register Here</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-xs'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input type="text" onChange={(e) => setName(e.target.value)} className="input" placeholder="Your Name" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Your Email" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobile</legend>
          <input type="text" onChange={(e) => setMobile(e.target.value)} className="input" placeholder="Your Mobile" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Your Password" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="input" placeholder="Confirm Password" required />
        </fieldset>
        <button disabled={password !== confirmPassword} type="submit" className="btn btn-primary mt-4">Register</button>
      </form>
      <p>Already have an account?<Link href="/login" className='text-blue-600 underline'> Login Here</Link></p>
    </div>
  )
}

export default Register