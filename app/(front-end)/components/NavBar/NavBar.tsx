"use client";

import Link from "next/link";
import Icons from "@/components/ui/icons";
import { Role, UserProfile } from "@/@types";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LandingNavbarLink from "./LandingNavbarLink";
import NavbarLink from "./NavbarLink";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useNavBar } from "./hooks/useNavBar";
import { LandingLinks } from "./constant";
import Notifications from "../Notifications";

type NavbarProps = {
  user: UserProfile | undefined;
};

export default function Navbar({ user }: NavbarProps) {
  const { activeSection, setActiveSection, handleLogout } = useNavBar();
  const pathname = usePathname();

  const createNavLinks = (type: "mobile" | "desktop") => {
    if (pathname === "/") {
      return LandingLinks.map((section) => (
        <LandingNavbarLink
          key={section.id}
          isActive={section.id === activeSection}
          sectionId={section.id}
          sectionName={section.name}
          setActiveSection={setActiveSection}
          type={type}
        />
      ));
    } else {
      return (
        <>
          <NavbarLink
            href="/"
            isActive={pathname === "/"}
            label="Home"
            type={type}
          />
          {user?.role == Role.Donor && (
            <NavbarLink
              href="/post-donation"
              isActive={pathname === "/post-donation"}
              label="Post Donation"
              type={type}
            />
          )}
          {user?.role == Role.Recipient && (
            <NavbarLink
              href="/donations"
              isActive={pathname === "/donations"}
              label="Donations"
              type={type}
            />
          )}
          {user?.role == Role.Admin && (
            <NavbarLink
              href="/analytics"
              isActive={pathname === "/analytics"}
              label="Analytics"
              type={type}
            />
          )}
        </>
      );
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-green-600 text-xl font-bold">FRC</span>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            {createNavLinks("desktop")}
          </div>
          <div className="flex items-center space-x-4">
            {!Boolean(user) ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            ) : ( <div className="flex items-center space-x-4">
                {/* Notification Icon with Dropdown */}
                <Notifications userId={user?.id || ''}/>
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        {/* <AvatarImage src={user?.image || ""} alt={user?.name || "User"} /> */}
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>)}
            <div className="lg:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => {
                  const mobileMenu = document.getElementById("mobile-menu");
                  mobileMenu?.classList.toggle("hidden");
                }}
              >
                <Icons.IconListNavBar />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {createNavLinks("mobile")}
        </div>
      </div>
    </nav>
  );
}
