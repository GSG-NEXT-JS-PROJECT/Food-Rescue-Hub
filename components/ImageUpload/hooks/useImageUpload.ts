"use client";

import { useEffect, useState } from "react";

export const useImageUpload = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  useEffect(() => {
    if (isWidgetOpen) {
      document.body.style.pointerEvents = "auto";
      const modalOverlay = document.querySelector(
        "[data-radix-dialog-overlay]"
      );
      if (modalOverlay) {
        (modalOverlay as HTMLElement).style.pointerEvents = "none";
      }
    }
    return () => {
      document.body.style.pointerEvents = "";
      const modalOverlay = document.querySelector(
        "[data-radix-dialog-overlay]"
      );
      if (modalOverlay) {
        (modalOverlay as HTMLElement).style.pointerEvents = "";
      }
    };
  }, [isWidgetOpen]);

  return {
    setIsWidgetOpen
  }
};
