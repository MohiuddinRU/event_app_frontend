import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        total: 0
    });

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await axios.get('/api/events', {
                    params: {
                        "page[number]": pagination.pageNumber,
                        "page[size]": pagination.pageSize
                    }
                });
                const data = response.data;
                if (data.status === 'success') {
                    setEvents(data.events);
                    setPagination((prev) => ({
                        ...prev,
                        total: data.pagination.total
                    }));
                }
            } catch (error) {
                console.error("Error fetching events", error);
            }
        }

        fetchEvents();
    }, [pagination.pageNumber, pagination.pageSize]);

    const handleNextPage = () => {
        if (pagination.pageNumber * pagination.pageSize < pagination.total) {
            setPagination((prev) => ({
                ...prev,
                pageNumber: prev.pageNumber + 1
            }));
        }
    };

    const handlePrevPage = () => {
        if (pagination.pageNumber > 1) {
            setPagination((prev) => ({
                ...prev,
                pageNumber: prev.pageNumber - 1
            }));
        }
    };

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        <h3>{event.title}</h3>
                        <p>{event.location}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>

            <div>
                <button onClick={handlePrevPage} disabled={pagination.pageNumber === 1}>
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={pagination.pageNumber * pagination.pageSize >= pagination.total}
                >
                    Next
                </button>
            </div>

            <p>
                Page {pagination.pageNumber} of {Math.ceil(pagination.total / pagination.pageSize)}
            </p>
        </div>
    );
};

export default Events;
