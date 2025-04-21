"use client";

import { fetchToken } from "@/lib/firebase";
import { useEffect } from "react";

const TokenRegistration = () => {
  useEffect(() => {
    fetchToken()
  });
  return null;
};

export default TokenRegistration;
