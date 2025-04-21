"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import NavbarLink from "./NavbarLink";

interface NavbarProps {
  isActive: boolean;
  sectionName: string;
  sectionId: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
  type: "mobile" | "desktop";
}

const LandingNavbarLink: FC<NavbarProps> = ({
  isActive,
  type,
  sectionName,
  sectionId,
  setActiveSection,
}) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setActiveSection(sectionId);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    document.getElementById("mobile-menu")?.classList.add("hidden");
    scrollToSection(sectionId);
  };

  return (
    <NavbarLink
      isActive={isActive}
      type={type}
      onClick={handleClick}
      label={sectionName}
    />
  );
};

export default LandingNavbarLink;
