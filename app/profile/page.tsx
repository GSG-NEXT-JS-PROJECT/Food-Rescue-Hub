"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Settings,
  LogOut,
  Check,
  MapPin,
  Calendar,
  ChevronRight,
  User,
  BellIcon,
  Shield,
  Clock,
  Building,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  // This would typically come from authentication/user context
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");

  const toggleUserType = () => {
    setUserType(userType === "donor" ? "recipient" : "donor");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-green-600">
          Food Rescue Hub
        </h1>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <Settings className="w-5 h-5 text-gray-600" />
          <LogOut className="w-5 h-5 text-gray-600" />
        </div>
      </header> */}
      <div>
        <Button variant="outline" onClick={toggleUserType} className="mr-4">
          Switch to {userType === "donor" ? "Recipient" : "Donor"} View
        </Button>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white border-r">
          {/* Profile Section */}
          <div className="relative">
            <div
              className={`h-20 ${
                userType === "donor" ? "bg-green-500" : "bg-purple-500"
              } relative`}
            >
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                  <Image
                    src={
                      userType === "donor"
                        ? "/profile/donor.jpg"
                        : "/profile/recipient.jpg"
                    }
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-white p-1 rounded-full">
                <Check
                  className={`w-4 h-4 ${
                    userType === "donor" ? "text-green-500" : "text-purple-500"
                  }`}
                />
              </div>
            </div>

            <div className="mt-14 text-center p-4">
              <h2 className="text-xl font-semibold">
                {userType === "donor" ? "Alex Johnson" : "Maria Rodriguez"}
              </h2>
              <Badge
                variant="outline"
                className={`mt-1 ${
                  userType === "donor" ? "text-blue-600" : "text-purple-600"
                }`}
              >
                {userType === "donor" ? "Donor" : "Recipient"}
              </Badge>

              {userType === "recipient" && (
                <p className="text-sm text-gray-600 mt-1">Community Kitchen</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    Location:{" "}
                    {userType === "donor" ? "San Francisco, CA" : "Oakland, CA"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    Joined:{" "}
                    {userType === "donor" ? "January 2023" : "November 2023"}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-left">
                <p className="text-sm font-medium text-gray-600">
                  {userType === "donor" ? "Bio:" : "Bio/Needs:"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {userType === "donor"
                    ? "Owner of Fresh Farms Market dedicated to reducing food waste in our community."
                    : "Community kitchen serving 200+ meals weekly to those in need. Looking for regular produce and protein donations."}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 mt-6 border-t border-b py-4">
                <div className="text-center">
                  <p
                    className={`${
                      userType === "donor"
                        ? "text-green-600"
                        : "text-purple-600"
                    } font-semibold`}
                  >
                    {userType === "donor" ? "47" : "32"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userType === "donor" ? "Donations" : "Claims"}
                  </p>
                </div>
                <div className="text-center border-l border-r">
                  <div>
                    <p
                      className={`${
                        userType === "donor"
                          ? "text-green-600"
                          : "text-purple-600"
                      } font-semibold`}
                    >
                      {userType === "donor" ? "240" : "180"}
                    </p>
                    <p
                      className={`${
                        userType === "donor"
                          ? "text-green-600"
                          : "text-purple-600"
                      } text-xs`}
                    >
                      lbs
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {userType === "donor" ? "Food Saved" : "Food Rescued"}
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className={`${
                      userType === "donor"
                        ? "text-green-600"
                        : "text-purple-600"
                    } font-semibold`}
                  >
                    {userType === "donor" ? "350" : "215"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userType === "donor" ? "Impact" : "People Served"}
                  </p>
                </div>
              </div>
            </div>

            {userType === "donor" && (
              <div className="p-4">
                <h3 className="font-semibold mb-4">Account Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Personal Information</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <BellIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Notification Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Privacy & Security</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {userType === "donor" ? <DonorView /> : <RecipientView />}
        </div>

        {/* Notifications Panel - Only for Recipient */}
        {userType === "recipient" && (
          <div className="hidden lg:block w-80 bg-white border-l p-4">
            <h3 className="font-semibold text-purple-600 mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <BellIcon className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New donation available matching your preferences
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Pickup reminder: Fresh Vegetables Assortment today at 3:00
                    PM
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-0.5">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Downtown Bakery confirmed your claim
                  </p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>

              <Button
                variant="link"
                className="text-purple-600 p-0 h-auto text-sm"
              >
                Mark all as read
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DonorView() {
  return (
    <Tabs defaultValue="my-donations">
      <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
        <TabsTrigger
          value="my-donations"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 px-4 py-2 font-medium"
        >
          My Donations
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 px-4 py-2 font-medium"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="impact-tracker"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 px-4 py-2 font-medium"
        >
          Impact Tracker
        </TabsTrigger>
      </TabsList>

      <TabsContent value="my-donations" className="mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Donations</h2>
          <Button className="bg-green-600 hover:bg-green-700">
            Create Donation
          </Button>
        </div>

        {/* Donation Items */}
        <div className="space-y-4">
          {/* Item 1 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/vegetables.jpg"
                  alt="Organic Produce"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Organic Produce Bundle</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <span>15 lbs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>April 1, 2025</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Available
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/bread.jpg"
                  alt="Bakery Goods"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Bakery Goods Assortment</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <span>24 items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>March 28, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Community Kitchen</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Claimed
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/dairy.jpg"
                  alt="Dairy Products"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Dairy Products</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <span>10 items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>March 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Hope Shelter</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                Completed
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Notifications will appear here</p>
        </div>
      </TabsContent>

      <TabsContent value="impact-tracker">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Impact tracking data will appear here</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function RecipientView() {
  return (
    <Tabs defaultValue="my-claims">
      <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
        <TabsTrigger
          value="my-claims"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 px-4 py-2 font-medium"
        >
          My Claims
        </TabsTrigger>
        <TabsTrigger
          value="available-nearby"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 px-4 py-2 font-medium"
        >
          Available Nearby
        </TabsTrigger>
        <TabsTrigger
          value="schedule"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 px-4 py-2 font-medium"
        >
          Schedule
        </TabsTrigger>
        <TabsTrigger
          value="impact"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 px-4 py-2 font-medium"
        >
          Impact
        </TabsTrigger>
      </TabsList>

      <TabsContent value="my-claims" className="mt-0">
        <Alert className="bg-amber-50 border-amber-200 mb-6">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-800">
            You have an upcoming pickup scheduled for today at 3:00 PM
          </AlertDescription>
        </Alert>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Claims</h2>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Find Donations
          </Button>
        </div>

        {/* Claim Items */}
        <div className="space-y-4">
          {/* Item 1 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/vegetables.jpg"
                  alt="Fresh Vegetables"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Fresh Vegetables Assortment</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>Fresh Farms Market</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>25 lbs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Today, 3:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Upcoming Pickup
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/bread.jpg"
                  alt="Bread and Pastries"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Bread and Pastries</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>Downtown Bakery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>18 items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>March 30, 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Picked Up
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md border">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                <Image
                  src="/profile/dairy2.jpg"
                  alt="Dairy and Eggs"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Dairy and Eggs</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>Local Dairy Farm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>12 items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>March 25, 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Completed
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="available-nearby">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">
            Available donations nearby will appear here
          </p>
        </div>
      </TabsContent>

      <TabsContent value="schedule">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Your pickup schedule will appear here</p>
        </div>
      </TabsContent>

      <TabsContent value="impact">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Impact data will appear here</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
