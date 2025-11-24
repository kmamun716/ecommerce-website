"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import SocialLogin from "@/ui/SocialLogin";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful");
        router.push("/dashboard"); // redirect after login
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="flex flex-col gap-4 items-center my-4">
      <h1 className="text-xl underline">Login</h1>

      <form onSubmit={handleCredentialsLogin} className="flex flex-col w-full max-w-xs">
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

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* social login */}
      <SocialLogin loading={loading} setLoading={setLoading} />

      <p className="mt-4">
        Don't have an account?
        <Link href="/register" className="text-blue-600 underline ml-1">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
