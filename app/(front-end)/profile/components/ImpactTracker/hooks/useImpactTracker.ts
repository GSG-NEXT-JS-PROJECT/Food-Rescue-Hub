"use client";

import {
  DonationStatus,
  DonationWithDonor,
  DonationWithRecipient,
} from "@/@types";
import { ENVIRONMENTAL_FACTORS } from "../constant";
import { CO2Result, WaterResult } from "../types";

type DonationsType = DonationWithDonor | DonationWithRecipient;

export const useImpactTracker = () => {
  const getDonationsCount = (
    donations: DonationsType[],
    statusFilter?: DonationStatus
  ): number => {
    if (statusFilter) {
      return donations.filter((d) => d.status === statusFilter).length;
    }
    return donations.length;
  };

  const getFoodSaved = (
    donations: DonationsType[],
    statusFilter?: DonationStatus
  ): number => {
    let filtered = donations;
    if (statusFilter) {
      filtered = donations.filter((d) => d.status === statusFilter);
    }
    return filtered.reduce((total, donation) => total + donation.quantity, 0);
  };

  const getPeopleHelped = (
    donations: DonationsType[],
    statusFilter?: DonationStatus
  ): number => {
    let filtered = donations;
    if (statusFilter) {
      filtered = donations.filter((d) => d.status === statusFilter);
    }

    const recipientIds = filtered
      .map((d) => d.recipientId?.toString())
      .filter((id): id is string => !!id);

    return new Set(recipientIds).size; // Unique count
  };

  const calculateCO2Saved = (
    foodSavedKg: number,
    co2PerKg: number = ENVIRONMENTAL_FACTORS.CO2_PER_KG,
    treesPerCO2Kg: number = ENVIRONMENTAL_FACTORS.TREES_PER_CO2_KG
  ): CO2Result => {
    const co2Saved = foodSavedKg * co2PerKg;
    const equivalentTrees = co2Saved * treesPerCO2Kg;
    return { co2Saved, equivalentTrees };
  };

  const calculateWaterSaved = (
    foodSavedKg: number,
    waterPerKg: number = ENVIRONMENTAL_FACTORS.WATER_PER_KG,
    showersPerGallon: number = ENVIRONMENTAL_FACTORS.SHOWERS_PER_GALLON
  ): WaterResult => {
    const waterSavedGallons = foodSavedKg * waterPerKg;
    const equivalentShowers = waterSavedGallons * showersPerGallon;
    return { waterSavedGallons, equivalentShowers };
  };

  return {
    getDonationsCount,
    getFoodSaved,
    getPeopleHelped,
    calculateCO2Saved,
    calculateWaterSaved,
  };
};
