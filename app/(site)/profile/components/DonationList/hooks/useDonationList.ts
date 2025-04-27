"use client";

import {
  DonationWithDonor,
  DonationWithRecipient,
  UserProfile,
} from "@/@types";
import { useState } from "react";
import { IEditDonation } from "../../EditDonationModal/type";
import { toast } from "sonner";
import { DonationDeleteRequestBody } from "@/app/api/donations/type";

export const useDonationList = (userData: UserProfile | undefined) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of donations to show per page
  const [donations, setDonations] = useState(userData?.donations || []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<
    DonationWithDonor | DonationWithRecipient | null
  >(null);

  const handleEditClick = (
    donation: DonationWithDonor | DonationWithRecipient
  ) => {
    setSelectedDonation(donation);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (
    donation: DonationWithDonor | DonationWithRecipient
  ) => {
    setSelectedDonation(donation);
    setDeleteDialogOpen(true);
  };

  const handleUpdateClick = (values: IEditDonation) => {
    if (!selectedDonation) return;
    const updatedDonation: DonationWithDonor | DonationWithRecipient = {
      ...selectedDonation,
      ...values,
    };
    const newDonations = donations.map((d) =>
      d._id === selectedDonation?._id ? updatedDonation : d
    ) as DonationWithDonor[] | DonationWithRecipient[];

    setDonations(newDonations);
    setEditModalOpen(false);
    setSelectedDonation(null);
  };

  const handleCloseClick = () => {
    setEditModalOpen(false);
    setSelectedDonation(null);
  };
  const handleDeleteDonation = async () => {
    try {
      const body : DonationDeleteRequestBody = {
        donationId: selectedDonation?._id || '',
        donorId: userData?.id || ''
      }
      console.log(body)
      const response = await fetch("/api/donations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body }),
      });

      if (response.ok) {
        toast.success("Donation updated successfully!");
        setDonations(donations.filter(d => d._id !== selectedDonation?._id) as DonationWithDonor[] | DonationWithRecipient[])
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.message || "Error updating donation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error: Unable to connect to the server");
    }
    setDeleteDialogOpen(false);
    setSelectedDonation(null);
  };

  const getStatusBadgeVariant = (
    status: string
  ): "secondary" | "outline" | "default" | "destructive" | null | undefined => {
    switch (status.toLowerCase()) {
      case "available":
        return "outline";
      case "claimed":
        return "secondary";
      case "completed":
        return "default";
      case "confirmed":
        return "secondary";
      default:
        return "destructive";
    }
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donations.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    donations,
    currentItems,
    handlePageChange,
    getStatusBadgeVariant,
    itemsPerPage,
    currentPage,
    editModalOpen,
    deleteDialogOpen,
    handleEditClick,
    handleDeleteClick,
    handleCloseClick,
    handleDeleteDonation,
    handleUpdateClick,
    setDeleteDialogOpen,
    selectedDonation
  };
};
