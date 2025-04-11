// src/api/user.ts
import { IUser } from "@/@types";

export async function fetchUserProfile() {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(userData: Partial<IUser>) {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// src/api/donation.ts
import { DonationRequestBody } from "@/app/api/donations/route";

export async function fetchDonations(params = {}) {
  const queryParams = new URLSearchParams();
  
  // Add any parameters to the query string
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  
  try {
    const response = await fetch(`/api/donations?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch donations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
}

export async function createDonation(donationData: DonationRequestBody) {
  try {
    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
}

export async function claimDonation(donationId: string) {
  try {
    const response = await fetch('/api/claim-donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ donationId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to claim donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error claiming donation:', error);
    throw error;
  }
}