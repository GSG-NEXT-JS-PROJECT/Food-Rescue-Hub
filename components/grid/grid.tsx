"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
    { title: "Pizza", description: "Delicious cheese pizza", location: "New York", status: "Available", foodType: "Fast Food" },
    { title: "Sushi", description: "Fresh salmon sushi", location: "Tokyo", status: "Sold Out", foodType: "Japanese" },
    { title: "Burger", description: "Beef burger with fries", location: "Los Angeles", status: "Available", foodType: "Fast Food" },
    { title: "Pasta", description: "Italian pasta with sauce", location: "Rome", status: "Available", foodType: "Italian" },
    { title: "Tacos", description: "Mexican chicken tacos", location: "Mexico City", status: "Available", foodType: "Mexican" },
    { title: "Ramen", description: "Hot spicy ramen", location: "Seoul", status: "Available", foodType: "Korean" },
    { title: "Steak", description: "Grilled steak with sauce", location: "Texas", status: "Available", foodType: "American" },
    { title: "Salad", description: "Healthy green salad", location: "London", status: "Available", foodType: "Vegan" },
];


const Grid = () => {
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const paginatedData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="container mx-auto p-4">
            <Table className="w-full rounded-lg border border-gray-300 shadow-md my-4">
                <TableHeader>
                    <TableRow className="bg-green-700 hover:bg-green-700">
                        <TableHead className="py-3 px-4 text-left text-sm font-semibold text-white">Title</TableHead>
                        <TableHead className="py-3 px-4 text-left text-sm font-semibold text-white">Description</TableHead>
                        <TableHead className="py-3 px-4 text-left text-sm font-semibold text-white">Location</TableHead>
                        <TableHead className="py-3 px-4 text-left text-sm font-semibold text-white">Status</TableHead>
                        <TableHead className="py-3 px-4 text-left text-sm font-semibold text-white">Food Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item, index) => (
                        <TableRow key={index} className={`bg-white }`}>
                            <TableCell className="py-4 px-4 text-sm font-medium text-gray-700">{item.title}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-700">{item.description}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-700">{item.location}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-700">{item.status}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-700">{item.foodType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-4 gap-3">
                <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-green-700 text-white border-2 border-transparent rounded-xl px-4 py-2 my-5 transition-all duration-300 ease-in-out hover:bg-green-800 hover:border-green-700 hover:text-white cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`bg-green-700 text-white border-2 border-transparent rounded-xl px-4 py-2 my-5 transition-all duration-300 ease-in-out hover:bg-green-800 hover:border-green-700 hover:text-white cursor-pointer ${currentPage === i + 1 ? 'bg-green-800 text-white' : ''}`}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-green-700 text-white border-2 border-transparent rounded-xl px-4 py-2 my-5 transition-all duration-300 ease-in-out hover:bg-green-800 hover:border-green-700 hover:text-white cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default Grid;
