"use client";

import Link from "next/link";
import React, { FC } from "react";

interface NavbarProps {
  isActive: boolean;
  label: string;
  type: "mobile" | "desktop";
  onClick?: () => void;
  href?: string
}

const NavbarLink: FC<NavbarProps> = ({
  isActive,
  type,
  label,
  onClick,
  href
}) => {
  return (
    <Link
    href={href || ""}
      onClick={onClick}
      className={`text-center ${
        type == "desktop"
          ? "inline-flex items-center p-4 text-sm font-medium"
          : "block px-3 py-2 rounded-md text-base font-medium w-full text-left"
      } ${
        isActive
          ? "border-green-500 text-green-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavbarLink;
