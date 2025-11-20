import { signIn } from 'next-auth/react';
import React from 'react'
import { FaFacebook, FaGoogle } from "react-icons/fa";

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function SocialLogin({ loading, setLoading }: Props) {    
  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };
  return (
    <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
        <button
          className="btn btn-red"
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
        >
          Continue with <FaGoogle />
        </button>

        <button
          className="btn btn-blue"
          onClick={() => handleSocialLogin("facebook")}
          disabled={loading}
        >
          Continue with <FaFacebook />
        </button>
      </div>
  )
}

export default SocialLogin