"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

const userInfo = {
  username: "john_doe",
  email: "johndoe@example.com",
  phone: "(123) 456-7890",
  location: "New York, USA",
  profilePicture: "/profile-pic.jpg", // Replace with actual image path
};

// Dummy data for testing
const dummyDonations = [
  {
    id: "1",
    title: "10 lbs of Apples",
    description: "Fresh organic apples from local farm",
    quantity: 10,
    foodType: ["Fruits"],
    pickupDeadline: new Date().toISOString(),
    status: "Available",
  },
  {
    id: "2",
    title: "5 lbs of Carrots",
    description: "Locally grown carrots, organic",
    quantity: 5,
    foodType: ["Vegetables"],
    pickupDeadline: new Date().toISOString(),
    status: "Claimed",
  },
  {
    id: "3",
    title: "Bread Loaf",
    description: "Whole wheat fresh-baked bread",
    quantity: 1,
    foodType: ["Bakery"],
    pickupDeadline: new Date().toISOString(),
    status: "Expired",
  },
  {
    id: "4",
    title: "Croissant",
    description: "fresh croissants that were not sold",
    quantity: 4,
    foodType: ["Bakery"],
    pickupDeadline: new Date().toISOString(),
    status: "Claimed",
  },
  {
    id: "5",
    title: "Fresh vegetables",
    description: "fresh veggies",
    quantity: 60,
    foodType: ["Vegetables"],
    pickupDeadline: new Date().toISOString(),
    status: "Available",
  },
  {
    id: "6",
    title: "Bananas",
    description: "3 packs of bananas",
    quantity: 3,
    foodType: ["Fruits"],
    pickupDeadline: new Date().toISOString(),
    status: "Expired",
  },
];

export default function ProfileManagement() {
  const [donations, setDonations] = useState(dummyDonations);
  const [sortOrder, setSortOrder] = useState("desc");
  const [foodType, setFoodType] = useState("all");
  const [hydrationComplete, setHydrationComplete] = useState(false);

  const formatDate = (date: string | Date) => new Date(date).toLocaleString();

  useEffect(() => {
    setHydrationComplete(true);
  }, []);

  const filteredDonations = donations
    .filter((d) => foodType === "all" || d.foodType.includes(foodType))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.pickupDeadline).getTime() -
          new Date(b.pickupDeadline).getTime()
        : new Date(b.pickupDeadline).getTime() -
          new Date(a.pickupDeadline).getTime()
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      {/* User Information Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white flex items-center gap-4">
        <Image
          src={userInfo.profilePicture}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{userInfo.username}</h3>
          <p>Email: {userInfo.email}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Location: {userInfo.location}</p>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <div className="px-4 py-2 bg-gray-100 rounded-md cursor-pointer">
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Oldest First</SelectItem>
            <SelectItem value="desc">Newest First</SelectItem>
          </SelectContent>
        </Select>

        {/* Food Type Select */}
        <Select value={foodType} onValueChange={setFoodType}>
          <SelectTrigger>
            <div className="px-4 py-2 bg-gray-100 rounded-md cursor-pointer">
              {foodType === "all" ? "All Types" : foodType}
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Fruits">Fruits</SelectItem>
            <SelectItem value="Vegetables">Vegetables</SelectItem>
            <SelectItem value="Bakery">Bakery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Wait until hydration is complete before rendering the table */}
      {hydrationComplete && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Food Type</TableHead>
              <TableHead>Pickup Deadline</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.title}</TableCell>
                <TableCell>{donation.description}</TableCell>
                <TableCell>{donation.quantity}</TableCell>
                <TableCell>{donation.foodType.join(", ")}</TableCell>
                <TableCell>{formatDate(donation.pickupDeadline)}</TableCell>
                <TableCell>{donation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
