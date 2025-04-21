'use client'
import { FC, ReactNode } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarActiveButtonProps {
  href: string;
  title: string;
  icon: ReactNode;
  children?: ReactNode
}
const SidebarActiveButton: FC<SidebarActiveButtonProps> = ({
  title,
  href,
  icon,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={href}>
        {icon}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarActiveButton;