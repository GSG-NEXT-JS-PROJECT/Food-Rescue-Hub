import { Role, UserProfile } from "@/@types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { FC } from "react";
import DonationsList from "../DonationList";

interface MainContentProps {
  userData: UserProfile | undefined;
}

const MainContent: FC<MainContentProps> = ({ userData }) => {
  return (
    <div className="lg:col-span-3 p-4">
      <Tabs defaultValue="donations" className="w-full">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <TabsList className="w-full rounded-none bg-transparent grid grid-cols-2 h-13 p-0">
            <TabsTrigger
              value="donations"
              className="relative py-4 font-medium transition-all duration-200 rounded-none text-gray-600 data-[state=active]:shadow-none data-[state=active]:text-emerald-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-emerald-500 data-[state=active]:after:w-full hover:bg-gray-50 hover:text-emerald-500 border-none shadow-none"
            >
              {userData?.role === Role.Donor ? "My Donations" : "My Claims"}
            </TabsTrigger>
            <TabsTrigger
              value="impact"
              className="relative py-4 font-medium transition-all duration-200 rounded-none text-gray-600 data-[state=active]:shadow-none data-[state=active]:text-emerald-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-emerald-500 data-[state=active]:after:w-full hover:bg-gray-50 hover:text-emerald-500 border-none shadow-none"
            >
              Impact Tracker
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="donations" className="mt-0">
          <DonationsList userData={userData} />
        </TabsContent>

        <TabsContent value="impact" className="mt-0">
          {/* <ImpactTracker
            userRole={user.role}
            donationsCount={user.stats.donationsCount}
            foodSaved={user.stats.foodSaved}
          /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContent;
