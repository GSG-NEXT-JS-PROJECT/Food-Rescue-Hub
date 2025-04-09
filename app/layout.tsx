import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Food Rescue Hub",
  description:
    "Application combat food waste by connecting food donors—such as restaurants, grocery stores, and farms—with recipients, including charities and individuals. The platform facilitates the redistribution of surplus food before it expires, offering a practical solution to a pressing real-world problem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
