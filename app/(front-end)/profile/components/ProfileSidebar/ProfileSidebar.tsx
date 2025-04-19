"use client";

import Image from "next/image";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Edit3, Save, X, Camera } from "lucide-react";
import { type UserProfile } from "@/@types";
import { useProfileSidebar } from "./hooks/useProfileSidebar";
import { FormikProvider, Form } from "formik";
import Icons from "@/components/ui/icons";
import TextField from "@/components/text-field";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  userData: UserProfile | undefined;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ userData }) => {
  const {
    formik,
    isEditing,
    handleEdit,
    handleCancel,
    formatDate,
    getRoleBadgeVariant,
  } = useProfileSidebar(
    userData?.name || "",
    userData?.location || { lat: 0, lng: 0, address: "" }
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Profile Header */}
      <FormikProvider value={formik}>
        <Form>
          <div className="relative h-36 bg-gradient-to-r from-emerald-600 to-emerald-400">
            <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
            {isEditing ? (
              <div className="absolute top-3 right-3 flex space-x-2 z-10">
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="icon"
                  className="bg-white text-rose-600 hover:bg-rose-50 rounded-full"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleEdit}
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 bg-white text-emerald-600 hover:bg-emerald-50 rounded-full shadow-sm z-10"
              >
                <Edit3 size={16} />
              </Button>
            )}
          </div>

          <div className="relative px-4 py-5 text-center">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="group relative">
                <div className="h-28 w-28 rounded-full border-4 border-white bg-emerald-100 overflow-hidden shadow-lg flex items-center justify-center">
                  {userData?.profileImage ? (
                    <Image
                      src={userData?.profileImage || "/placeholder.svg"}
                      alt={userData?.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-emerald-600">
                      {userData?.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-14">
              {isEditing ? (
                <TextField
                  type="text"
                  label="name"
                  name="name"
                  placeholder="Enter user name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isLabelRemoved={true}
                  className={cn(
                    "border-0 ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none",
                    "text-2xl font-semibold text-center w-full",
                    "border-b-2 border-emerald-200",
                    "focus:outline-none focus:border-emerald-500",
                    "px-2 py-1",
                    "shadow-none"
                  )}
                />
              ) : (
                <h2 className="text-2xl font-semibold text-gray-800">
                  {formik.values.name}
                </h2>
              )}

              <div className="mt-2 flex items-center justify-center">
                <Badge
                  variant={getRoleBadgeVariant(userData.role)}
                  className="text-xs px-3 py-1"
                >
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="border-t border-gray-100 px-5 py-6 bg-gray-50">
            <dl className="space-y-5">
              <div className="flex items-center">
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  Location:
                </dt>
                <dd className="ml-2 text-sm text-gray-900">
                  {isEditing ? (
                    <GooglePlacesAutocomplete
                      defaultAddress={formik.values.location.address}
                      isLabelRemoved={true}
                      className={cn(
                        "border-0 ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none",
                        "text-center w-full",
                        "border-b-2 border-emerald-200",
                        "focus:outline-none focus:border-emerald-500",
                        "px-2 py-1",
                        "shadow-none"
                      )}
                    />
                  ) : (
                    formik.values.location.address
                  )}
                </dd>
              </div>
              <div className="flex items-center">
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <CalendarDays className="h-4 w-4 mr-2 text-emerald-500" />
                  Joined:
                </dt>
                <dd className="ml-2 text-sm text-gray-900">
                  {formatDate(userData?.createdAt || "")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Stats */}
          {/* <div className="border-t border-gray-200">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
              {userData.role == Role.Donor ? "Donations" : "Claims"}
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
              {userData.role == Role.Donor
                ? userData.stats.donationsCount
                : userData.stats.claimsCount}
            </dd>
          </div>
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
              {userData.role == Role.Donor ? " Food Saved" : "Food Rescued"}
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
              {userData.role == Role.Donor
                ? userData.stats.foodSaved
                : userData.stats.foodRescued}
            </dd>
          </div>
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
              {userData.role == Role.Donor ? "Impact" : "People Served"}
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
              {userData.role == Role.Donor
                ? userData.stats.impactPoints
                : userData.stats.peopleServed}
            </dd>
          </div>
        </div>
      </div> */}
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProfileSidebar;
