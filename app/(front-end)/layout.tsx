import { fetchUser } from "@/lib/getUserData";
import Navbar from "./components/NavBar";
import TokenRegistration from "./TokenRegistration";

export const metadata = {
  title: 'Food Rescue Hub | Reduce Food Waste, Feed Communities',
  description:
    'Join Food Rescue Hub to donate or receive surplus food. Together we fight hunger and waste.',
  keywords: [
    'food rescue',
    'donate food',
    'food waste',
    'zero waste',
    'community support',
    'sustainable food',
  ],
}

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
