"use client";

import { DonationWithDonor, DonationWithRecipient } from "@/@types";
import DonationForm from "@/components/DonationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEditDonation from "./hooks/useEditDonation";
import { IEditDonation } from "./type";

interface EditDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (values: IEditDonation) => void;
  donation: DonationWithDonor | DonationWithRecipient;
}

export default function EditDonationModal({
  isOpen,
  onClose,
  onUpdate,
  donation,
}: EditDonationModalProps) {
  const { formik } = useEditDonation(donation, onUpdate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Donation</DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <DonationForm formik={formik} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
