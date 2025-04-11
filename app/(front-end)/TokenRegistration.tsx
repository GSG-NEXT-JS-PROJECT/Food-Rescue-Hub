"use client";

import { fetchToken } from "@/lib/firebase";
import { useEffect } from "react";

const TokenRegistration = () => {
  useEffect(() => {
    fetchToken().then(token => console.log(token))
  });
  return null;
};

export default TokenRegistration;
