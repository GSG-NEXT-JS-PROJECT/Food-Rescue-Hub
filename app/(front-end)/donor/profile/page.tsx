"use client";
import { useEffect, useState } from "react";
import { DonationStatus, FoodType, Role } from "@/@types";
import ProfileSidebar from "./components/ProfileSidebar";
import DonationsList from "./components/DonationList";
import ImpactTracker from "./components/Impact";
import { useRouter } from "next/navigation";
import { UserData, DonationData } from "./constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { claimDonation, fetchUserProfile, updateUserProfile } from "@/app/api/user/route";
import { toast } from "@/components/ui/use-toast";


const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


const transformUserData = (apiUser: any): UserData => {
  return {
    id: apiUser.id || "",
    name: apiUser.name || "",
    email: apiUser.email || "",
    role: apiUser.role || Role.Recipient,
    location: apiUser.location?.lat && apiUser.location?.lng 
      ? `${apiUser.location.lat.toFixed(4)}, ${apiUser.location.lng.toFixed(4)}` 
      : "No location set",
    joinedDate: apiUser.createdAt ? formatDate(apiUser.createdAt) : "Unknown",
    bio: apiUser.bio || "No bio available",
    profileImage: apiUser.profileImage || "/api/placeholder/200/200",
    stats: {
      donationsCount: apiUser.donations?.filter(d => d.donorId === apiUser.id)?.length || 0,
      claimsCount: apiUser.donations?.filter(d => d.recipientId === apiUser.id)?.length || 0,
      foodSaved: `${apiUser.donations?.reduce((sum, d) => sum + (d.quantity || 0), 0) || 0} lbs`,
      foodRescued: `${apiUser.donations?.filter(d => d.recipientId === apiUser.id)
        .reduce((sum, d) => sum + (d.quantity || 0), 0) || 0} lbs`,
      peopleServed: Math.round((apiUser.donations?.filter(d => d.recipientId === apiUser.id)
        .reduce((sum, d) => sum + (d.quantity || 0), 0) || 0) / 3), 
      impactPoints: apiUser.impactPoints || Math.round((apiUser.donations?.reduce((sum, d) => sum + (d.quantity || 0), 0) || 0) * 1.5) 
    }
  };
};


const transformDonations = (apiDonations: any[]): DonationData[] => {
  return apiDonations.map(donation => ({
    id: donation._id || donation.id || "",
    donorId: donation.donorId?._id || donation.donorId || "",
    recipientId: donation.recipientId?._id || donation.recipientId || "",
    title: donation.title || "",
    date: donation.createdAt ? formatDate(donation.createdAt) : "Unknown",
    status: donation.status || DonationStatus.Available,
    claimedBy: donation.recipientId?.name || "",
    quantity: `${donation.quantity || 0} lbs`,
    type: donation.foodType || FoodType.Vegetables,
    image: donation.imageUrl || "/api/placeholder/80/80",
    description: donation.description || "",
    location: donation.location || { lat: 0, lng: 0 },
    pickupDeadline: donation.pickupDeadline ? formatDate(donation.pickupDeadline) : ""
  }));
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("donations");
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserProfile();
        
        
        const transformedUser = transformUserData(userData);
        setUser(transformedUser);
        
        
        if (userData.donations) {
          const transformedDonations = transformDonations(userData.donations);
          setDonations(transformedDonations);
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleUpdateUser = async (updatedUser: UserData) => {
    if (!user) return;
    
    try {
      
      const apiUserData = {
        name: updatedUser.name,
        location: user.location.includes(",") 
          ? { 
              lat: parseFloat(user.location.split(",")[0].trim()), 
              lng: parseFloat(user.location.split(",")[1].trim()) 
            }
          : undefined,
      };

      const response = await updateUserProfile(apiUserData);
      
      
      setUser({
        ...user,
        name: response.user.name,
        location: response.user.location?.lat && response.user.location?.lng
          ? `${response.user.location.lat.toFixed(4)}, ${response.user.location.lng.toFixed(4)}`
          : user.location
      });
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleCreateDonation = () => {
    router.push('/post-donation');
  };

  const handleClaimDonation = async (donationId: string) => {
    try {
      await claimDonation(donationId);
      
      
      setDonations(donations.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: DonationStatus.Claimed, claimedBy: user?.name || "" }
          : donation
      ));
      
      toast({
        title: "Success",
        description: "Donation claimed successfully!",
      });
    } catch (error) {
      console.error("Failed to claim donation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to claim donation. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium">Unable to load profile</h2>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

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
                  donationsCount={user.stats.donationsCount || 0}
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