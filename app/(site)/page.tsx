import { fetchUser } from "@/lib/getUserData";
import LandingPage from "./components/LandingPage";

export default async function HomePage() {
  const user = await fetchUser();

  return <LandingPage user={user} />;
}
