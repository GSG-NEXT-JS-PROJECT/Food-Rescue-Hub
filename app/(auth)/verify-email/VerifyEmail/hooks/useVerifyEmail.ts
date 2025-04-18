"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const verifyToken = searchParams.get("verifyToken");
      const id = searchParams.get("id");
      verifyEmail(verifyToken, id);
    }
  }, [searchParams]);

  const verifyEmail = async (verifyToken: string | null, id: string | null) => {
    if (!verifyToken || !id) {
      return toast.error("Invalid URL");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/verify-email?verifyToken=${verifyToken}&id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        setVerified(true);
        toast.success("Email Verified!");
      } else {
        setError(true);
        toast.error("Verification failed!");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error("Verification failed!");
    } finally {
      setLoading(false);
    }
  };

  return {loading, verified, error}
};
