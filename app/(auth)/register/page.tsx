"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import SocialLogin from "@/ui/SocialLogin";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Local registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="flex flex-col gap-4 items-center my-4">
      <h1 className="text-xl underline">Register Here</h1>

      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xs">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input
            type="text"
            placeholder="Your Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            placeholder="Your Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mobile</legend>
          <input
            type="text"
            placeholder="Your Mobile"
            className="input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            placeholder="Your Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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

      {/* social login */}
      <SocialLogin loading={loading} setLoading={setLoading} />

      <p className="mt-4">
        Already have an account?
        <Link href="/login" className="text-blue-600 underline ml-1">
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default Register;
