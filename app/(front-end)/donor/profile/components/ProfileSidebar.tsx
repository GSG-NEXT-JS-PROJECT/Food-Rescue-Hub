// // src/components/profile/ProfileSidebar.tsx
// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   CalendarDays,
//   MapPin,
//   Edit3,
//   Save,
//   X,
// } from "lucide-react";
// import { UserData } from "../constant";
// import { Role } from "@/@types";

// interface ProfileSidebarProps {
//   userData: UserData;
//   onUpdateUser: (updatedUser: UserData) => void;
// }

// export default function ProfileSidebar({ userData, onUpdateUser }: ProfileSidebarProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState<UserData>({ ...userData });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     onUpdateUser({ ...editForm });
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditForm({ ...userData });
//     setIsEditing(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditForm({
//       ...editForm,
//       [name]: value,
//     });
//   };

//   const getRoleBadgeVariant = (role: Role) => {
//     switch (role) {
//       case Role.Donor:
//         return "info";
//       case Role.Recipient:
//         return "warning";
//       case Role.Admin:
//         return "destructive";
//       default:
//         return "default";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       {/* Profile Header */}
//       <div className="relative h-32 bg-gradient-to-r from-emerald-600 to-emerald-400">
//         {isEditing ? (
//           <div className="absolute top-2 right-2 flex space-x-2">
//             <Button
//               onClick={handleSave}
//               variant="outline"
//               size="icon"
//               className="bg-white text-emerald-600 hover:bg-emerald-50"
//             >
//               <Save size={16} />
//             </Button>
//             <Button
//               onClick={handleCancel}
//               variant="outline"
//               size="icon"
//               className="bg-white text-red-600 hover:bg-red-50"
//             >
//               <X size={16} />
//             </Button>
//           </div>
//         ) : (
//           <Button
//             onClick={handleEdit}
//             variant="outline"
//             size="icon"
//             className="absolute top-2 right-2 bg-white text-emerald-600 hover:bg-emerald-50"
//           >
//             <Edit3 size={16} />
//           </Button>
//         )}
//       </div>

//       <div className="relative px-4 py-5 text-center">
//         <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
//           <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
//             <Image
//               src={userData.profileImage}
//               alt={userData.name}
//               width={100}
//               height={100}
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={editForm.name}
//               onChange={handleInputChange}
//               className="text-xl font-semibold text-center w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500"
//             />
//           ) : (
//             <h2 className="text-xl font-semibold">{userData.name}</h2>
//           )}

//           <div className="mt-1 flex items-center justify-center">
//             <Badge variant={getRoleBadgeVariant(userData.role)}>
//               {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* Profile Info */}
//       <div className="border-t border-gray-200 px-4 py-5">
//         <dl className="space-y-4">
//           <div className="flex items-center">
//             <dt className="flex items-center text-sm font-medium text-gray-500">
//               <MapPin className="h-4 w-4 mr-2" />
//               Location:
//             </dt>
//             <dd className="ml-2 text-sm text-gray-900">
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="location"
//                   value={editForm.location}
//                   onChange={handleInputChange}
//                   className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500"
//                 />
//               ) : (
//                 userData.location
//               )}
//             </dd>
//           </div>
//           <div className="flex items-center">
//             <dt className="flex items-center text-sm font-medium text-gray-500">
//               <CalendarDays className="h-4 w-4 mr-2" />
//               Joined:
//             </dt>
//             <dd className="ml-2 text-sm text-gray-900">
//               {userData.joinedDate}
//             </dd>
//           </div>
//           <div>
//             <dt className="text-sm font-medium text-gray-500">Bio:</dt>
//             <dd className="mt-1 text-sm text-gray-900">
//               {isEditing ? (
//                 <textarea
//                   name="bio"
//                   value={editForm.bio}
//                   onChange={handleInputChange}
//                   className="w-full border rounded-md p-2 focus:outline-none focus:border-emerald-500"
//                   rows={3}
//                 />
//               ) : (
//                 userData.bio
//               )}
//             </dd>
//           </div>
//         </dl>
//       </div>

//       {/* Stats */}
//       <div className="border-t border-gray-200">
//         <div className="grid grid-cols-3 divide-x divide-gray-200">
//           <div className="px-4 py-3 text-center">
//             <dt className="text-sm font-medium text-gray-500">
//               Donations
//             </dt>
//             <dd className="mt-1 text-xl font-semibold text-emerald-600">
//               {userData.stats.donationsCount}
//             </dd>
//           </div>
//           <div className="px-4 py-3 text-center">
//             <dt className="text-sm font-medium text-gray-500">
//               Food Saved
//             </dt>
//             <dd className="mt-1 text-xl font-semibold text-emerald-600">
//               {userData.stats.foodSaved}
//             </dd>
//           </div>
//           <div className="px-4 py-3 text-center">
//             <dt className="text-sm font-medium text-gray-500">
//               Impact
//             </dt>
//             <dd className="mt-1 text-xl font-semibold text-emerald-600">
//               {userData.stats.impactPoints}
//             </dd>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/profile/ProfileSidebar.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import userImage from "../assets/osamaImage.jpeg"
import {
  CalendarDays,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
} from "lucide-react";
import { UserData } from "../constant";
import { Role } from "@/@types";

interface ProfileSidebarProps {
  userData: UserData;
  onUpdateUser: (updatedUser: UserData) => void;
}

export default function ProfileSidebar({ userData, onUpdateUser }: ProfileSidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserData>({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateUser({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const getRoleBadgeVariant = (role: Role) => {
    switch (role) {
      case Role.Donor:
        return "info";
      case Role.Recipient:
        return "warning";
      case Role.Admin:
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Profile Header */}
      <div className="relative h-36 bg-gradient-to-r from-emerald-600 to-emerald-400">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
        {isEditing ? (
          <div className="absolute top-3 right-3 flex space-x-2 z-10">
            <Button
              onClick={handleSave}
              variant="outline"
              size="icon"
              className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full"
            >
              <Save size={16} />
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
        <div className="absolute -top-16 left-2/6 transform -translate-x-1/2">
          <div className="group relative">
            <div className="h-28 w-28 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
              <Image
                src={userImage}                // userData.profileImage||
                alt={userData.name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
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
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleInputChange}
              className="text-2xl font-semibold text-center w-full border-b-2 border-emerald-200 focus:outline-none focus:border-emerald-500 px-2 py-1"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
          )}

          <div className="mt-2 flex items-center justify-center">
            <Badge variant={getRoleBadgeVariant(userData.role)} className="text-xs px-3 py-1">
              {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
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
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  className="w-full border-b border-emerald-200 focus:outline-none focus:border-emerald-500 px-2 py-1"
                />
              ) : (
                userData.location
              )}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <CalendarDays className="h-4 w-4 mr-2 text-emerald-500" />
              Joined:
            </dt>
            <dd className="ml-2 text-sm text-gray-900">
              {userData.joinedDate}
            </dd>
          </div>
          <div>
            <dt className="flex items-center text-sm font-medium text-gray-500 mb-2">
              Bio:
            </dt>
            <dd className="text-sm text-gray-900">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  rows={4}
                />
              ) : (
                <p className="bg-white rounded-md p-3 shadow-sm">{userData.bio}</p>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Stats */}
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
             {userData.role==Role.Donor?"Donations":"Claims"} 
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
            {userData.role==Role.Donor?userData.stats.donationsCount:userData.stats.claimsCount} 
            </dd>
          </div>
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
              {userData.role==Role.Donor?" Food Saved":"Food Rescued"} 
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
            {userData.role==Role.Donor?userData.stats.foodSaved:userData.stats.foodRescued} 
            </dd>
          </div>
          <div className="px-4 py-4 text-center bg-white transition-colors hover:bg-emerald-50">
            <dt className="text-sm font-medium text-gray-500">
              {userData.role==Role.Donor?"Impact":"People Served"} 
            </dt>
            <dd className="mt-2 text-2xl font-bold text-emerald-600">
            {userData.role==Role.Donor?userData.stats.impactPoints:userData.stats.peopleServed} 
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}