// 

"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role } from "@/@types";
import { mockDonations, mockUser } from "./constant";
import ProfileSidebar from "./components/ProfileSidebar";
import DonationsList from "./components/DonationList";
import ImpactTracker from "./components/Impact";

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [donations] = useState(mockDonations);
  const [activeTab, setActiveTab] = useState("donations");

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleCreateDonation = () => {
    // This would open a modal or navigate to donation creation page
    console.log("Create donation clicked");
  };

  return (
    <div className="min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar 
              userData={user} 
              onUpdateUser={handleUpdateUser} 
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs 
              defaultValue="donations" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="bg-white rounded-lg shadow mb-6">
                <TabsList className="w-full border-b border-gray-200 rounded-none grid grid-cols-2">
                  <TabsTrigger
                    value="donations"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 py-3 rounded-none"
                  >
                    {user.role === Role.Donor ? "My Donations" : "My Claims"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="impact"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 py-3 rounded-none"
                  >
                    Impact Tracker
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="donations" className="mt-0">
                <DonationsList
                  donations={donations}
                  userRole={user.role}
                  onCreateDonation={handleCreateDonation}
                />
              </TabsContent>

              <TabsContent value="impact" className="mt-0">
                <ImpactTracker
                  userRole={user.role}
                  donationsCount={user.stats.donationsCount}
                  foodSaved={user.stats.foodSaved}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}