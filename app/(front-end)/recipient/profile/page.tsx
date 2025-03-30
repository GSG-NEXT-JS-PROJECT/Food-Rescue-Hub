import React from 'react';
import Grid from '@/components/grid/grid';
import UserCard from '@/components/user-card';

const user = {
    name: "Lara Samara",
    email: "larasamara@gmail.com",
    location: { iat: 10, lat: 20 },
};

const Profile = () => {
    return (
        <div>
            <div className="flex items-center justify-between container m-auto my-8">
                {Object.entries(user)
                    .map(([key, value]) => (
                        <UserCard key={key} name={key} value={value} />
                    ))}
            </div>
            <Grid />
        </div>
    );
}

export default Profile;
