import { fetchUser } from "@/lib/getUserData";
import Navbar from "./components/NavBar";
import TokenRegistration from "./TokenRegistration";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();
  return (
    <section>
      <Navbar user={user} />
      {user && <TokenRegistration />}
      <main>{children}</main>
    </section>
  );
}
