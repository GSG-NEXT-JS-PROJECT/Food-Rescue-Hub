"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LandingLinks } from "../constant";

export const useNavBar = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      for (const link of LandingLinks) {
        const activeSection = document.getElementById(link.id);
        if (activeSection) {
          const rect = activeSection.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return {
    activeSection,
    setActiveSection,
    handleLogout,
  };
};
