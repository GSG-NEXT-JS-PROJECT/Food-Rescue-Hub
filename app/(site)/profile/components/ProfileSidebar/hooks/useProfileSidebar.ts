"use client";

import { LocationType, Role } from "@/@types";
import { useFormik } from "formik";
import { generateInitialValues } from "../constant";
import { IUpdateUser } from "../type";
import { validationSchemaUpdateUser } from "../ValidationSchemaUpdateUser";
import { toast } from "sonner";
import { useState } from "react";

export const useProfileSidebar = (name: string, userLocation: LocationType, imageUrl: string) => {
  const [isEditing, setIsEditing] = useState(false);
  async function handleUpdateUser(
    values: IUpdateUser,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    setSubmitting(true);

    console.log(values);
    try {
      const userUpdatedData: IUpdateUser = {
        name: values.name,
        location: values.location,
        imageUrl: values.imageUrl
      };

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdatedData),
      });

      if (response.ok) {
        toast.success("user updated successfully!");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error || "Error updating user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error: Unable to connect to the server");
    } finally {
      setSubmitting(false);
    }
  }

  const formik = useFormik<IUpdateUser>({
    initialValues: generateInitialValues(name, userLocation, imageUrl),
    onSubmit: (values, { setSubmitting }) => {
      handleUpdateUser(values, setSubmitting);
    },
    validationSchema: validationSchemaUpdateUser,
    validateOnMount: true,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  function formatDate(isoString: string) {
    const localDate = new Date(isoString);

    const month = localDate.toLocaleString("default", { month: "long" });
    const year = localDate.getFullYear();

    return `${month} ${year}`;
  }

  const getRoleBadgeVariant = (
    role: Role
  ): "destructive" | "default" | "secondary" | "outline" | null | undefined => {
    switch (role) {
      case Role.Donor:
        return "secondary";
      case Role.Recipient:
        return "outline";
      case Role.Admin:
        return "destructive";
      default:
        return "default";
    }
  };

  return {
    formik,
    isEditing,
    handleEdit,
    handleCancel,
    formatDate,
    getRoleBadgeVariant
  };
};
