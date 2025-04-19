// src/data/mockData.ts

import { DonationStatus, FoodType, LocationType, Role } from "@/@types";


export interface UserData {
    id: string;
    name: string;
    email: string;
    role: Role;
    location: string;
    joinedDate: string;
    bio: string;
    profileImage: string;
    stats: {
        donationsCount?: number;
        foodSaved: string;
        claimsCount?: number;
        foodRescued?: string;
        peopleServed?: number;
        impactPoints: number;
    };
}

export interface DonationData {
    id: string;
    donorId?: string;
    recipientId?: string;
    title: string;
    date: string;
    status: string;
    claimedBy?: string;
    quantity: string;
    type: FoodType;
    image: string;
    description?: string;
    location?: LocationType;
    pickupDeadline?: string;
}

// export const mockUser: UserData = {
//   id: "user123",
//   name: "Alex Johnson",
//   email: "alex@example.com",
//   role: Role.Donor,
//   location: "San Francisco, CA",
//   joinedDate: "January 2023",
//   bio: "Owner of Fresh Farms Market dedicated to reducing food waste in our community.",
//   profileImage: "/api/placeholder/200/200",
//   stats: {
//     donationsCount: 47,
//     foodSaved: "240 lbs",
//     impactPoints: 350,
//   },
// };
export const mockUser: UserData = {
    id: "user456",
    name: "Osama Ghneem",
    email: "maria@communitykitchen.org",
    role: Role.Recipient,
    organization: "Community Kitchen",
    location: "San Francisco, CA",
    password: "encrypted_password",
    isVerified: true,
    joinedDate: "November 2023",
    bio: "Community kitchen serving 200+ meals weekly to those in need. Looking for regular produce and protein donations.",
    profileImage: "/placeholder/200/200",
    stats: {
        claimsCount: 32,
        foodRescued: "180 lbs",
        peopleServed: 215,
    },

};

export const mockDonations: DonationData[] = [
    {
        id: "don1",
        donorId: "user123",
        title: "Organic Produce Bundle",
        date: "April 1, 2025",
        status: DonationStatus.Available,
        quantity: "15 lbs",
        type: FoodType.Vegetables,
        image: "/api/placeholder/80/80",
        description: "Fresh organic vegetables from our farm.",
        location: { lat: 37.7749, lng: -122.4194 },
        pickupDeadline: "April 3, 2025",
    },
    {
        id: "don2",
        donorId: "user123",
        recipientId: "rec456",
        title: "Bakery Goods Assortment",
        date: "March 28, 2025",
        status: DonationStatus.Claimed,
        claimedBy: "Community Kitchen",
        quantity: "24 items",
        type: FoodType.Bakery,
        image: "/api/placeholder/80/80",
    },
    {
        id: "don3",
        donorId: "user123",
        recipientId: "rec789",
        title: "Dairy Products",
        date: "March 25, 2025",
        status: "Completed",
        claimedBy: "Hope Shelter",
        quantity: "10 items",
        type: FoodType.Dairy,
        image: "/api/placeholder/80/80",
    },
];

export const environmentalImpact = {
    co2Saved: "45 kg",
    waterSaved: "1,240 gallons",
    peopleHelped: 14,
};