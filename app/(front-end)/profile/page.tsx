import { fetchUser } from "@/lib/getUserData";
import ProfileSidebar from "./components/ProfileSidebar";

export default async function ProfilePage() {
  const user = await fetchUser();
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar userData={user} />
          </div>
        </div>
      </main>
    </div>
  );
}
