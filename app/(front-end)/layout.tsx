import { fetchUser } from "@/lib/getUserData";
import Navbar from "./components/NavBar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();
  return (
    <section>
      <Navbar user={user} />
      <main>{children}</main>
    </section>
  );
}
