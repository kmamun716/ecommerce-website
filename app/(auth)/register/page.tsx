"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    if (!name || !email || !mobile || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(data.message || "Registration successful");
        router.push("/login");
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center my-4">
      <h1 className="text-xl underline">Register Here</h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input
            type="text"
            className="input"
            placeholder="Your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input"
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobile</legend>
          <input
            type="text"
            className="input"
            placeholder="Your Mobile"
            required
            onChange={(e) => setMobile(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-4"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account?
        <Link href="/login" className="text-blue-600 underline ml-1">
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default Register;
