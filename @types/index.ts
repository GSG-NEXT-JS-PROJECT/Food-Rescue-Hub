export type Roles = 'Donor' | 'Recipient' | 'Admin';

export interface LocationType{
    lat: Number;
    lng: Number;
}

export interface IUser {
    email: string;
    name: string;
    location: LocationType;
    password: string;
    role: Roles
}