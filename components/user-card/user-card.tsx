import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { UserCircle } from 'lucide-react';
import Link from 'next/link.js';

interface IProps {
    name: string;
    value: string | object;
}

const UserCard = (props: IProps) => {
    const renderValue = () => {
        if (typeof props.value === "object") {
            return (
                <p>
                    {Object.entries(props.value).map(([key, val]) => (
                        <span key={key}>
                            <span className="font-semibold capitalize">{key}: </span> {val.toString()}, </span>
                    ))}
                </p>
            );
        }
        return <p>{props.value}</p>;
    };

    return (
<Card className="w-full md:w-[45%] lg:w-[30%] my-6 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300 hover:scale-105">
    <CardHeader className="flex items-center">
        <UserCircle className="h-12 w-12 text-green-600 mr-4" />
        <div>
            <CardTitle className="text-gray-800 font-semibold text-lg">{props.name}</CardTitle>
            <CardDescription className="text-gray-600 text-sm">
                {renderValue()}
                <Link href="/edit-profile" className="text-green-600 hover:underline mt-2 inline-block">
                    Update your information
                </Link>
            </CardDescription>
        </div>
    </CardHeader>
</Card>

    );
}

export default UserCard;
