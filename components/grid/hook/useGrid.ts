"use client";

import { useState, useEffect } from "react";

const dummyData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Restaurant ${i + 1}`,
    description: `A great place for delicious meals ${i + 1}`,
    location: `City ${i % 5 + 1}`,
    status: i % 2 === 0 ? "Open" : "Closed",
    foodType: i % 3 === 0 ? "Vegan" : i % 3 === 1 ? "Fast Food" : "Desserts",
    thumbnailUrl: `https://via.placeholder.com/150/92c952?text=Food+${i + 1}`,
}));

export const useGrid = (page: number, limit: number = 6) => {
    const [data, setData] = useState<typeof dummyData>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Simulating API delay
        setTimeout(() => {
            const startIndex = (page - 1) * limit;
            const paginatedData = dummyData.slice(startIndex, startIndex + limit);
            setData(paginatedData);
            setLoading(false);
        }, 500);
    }, [page, limit]);

    return { data, loading, error };
};

