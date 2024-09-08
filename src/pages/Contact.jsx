import React, { useState } from 'react'
import DataTable from '../components/ui/Datatable';
import { ButtonIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react';

const ContactData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890", company: "TruAdvantage", title: "VP-Strategy" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987 654 321" },
];

const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "title", label: "Position" },
    { key: "type", label: "Type" },
];

const Contact = () => {
    const [selectedTab, setSelectedTab] = useState("list"); // Tracks current tab
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleSort = (key, order) => {
        // Backend handles sorting; just placeholder logic for now
        console.log(`Sorting by ${key} in ${order} order`);
    };

    const handleFilterChange = (key, value) => {
        // Backend handles filtering; just placeholder logic for now
        console.log(`Filtering ${key} by ${value}`);
    };


    const handleRowClick = (record) => {
        setSelectedRecord(record);
        setSelectedTab("detail");
    };
    return (
        <div className="flex min-h-screen overflow-hidden">

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-4 bg-transparent dark:bg-gray-800 overflow-y-auto">
                {/* Header */}
                <header className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    Contacts
                </header>

                <div className='flex flex-row justify-end'>

                    <Button className='bg-violet-50 min-w-24 hover:bg-gray-700 text-gray-900 hover:text-green-50 mr-4 p-4 border-l-violet-600'>
                        Clear
                    </Button>
                    <Button className='min-w-24 hover:bg-violet-900 mr-14 hover:text-gray-50'>
                        Search
                    </Button>
                    <Button className='min-w-24 bg-green-700 hover:bg-green-900 hover:text-gray-50'>
                        <PlusIcon />
                        Add New Contact
                    </Button>
                </div>

                {/* Tabs for List and Details */}
                <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
                    <button
                        className={`py-2 px-4 ${!selectedRecord
                            ? "border-b-2 border-violet-500 text-violet-500"
                            : "text-gray-600 dark:text-gray-400"
                            }`}
                        onClick={() => setSelectedRecord(null)}
                    >
                        Contact List
                    </button>
                    <button
                        className={`py-2 px-4 ${selectedRecord
                            ? "border-b-2 border-violet-500 text-violet-500"
                            : "text-gray-600 dark:text-gray-400"
                            }`}
                        disabled={!selectedRecord}
                    >
                        Contact Details
                    </button>
                </div>

                {/* Table or Details */}
                {!selectedRecord ? (
                    <div style={{ width: '100%' }}>
                        <DataTable
                            data={ContactData}
                            columns={columns}
                            onRowClick={handleRowClick}
                            onFilterChange={handleFilterChange}
                            onSort={handleSort}
                        />
                    </div>
                ) : (
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            Contact Details: {selectedRecord.name}
                        </h2>
                        <div className="text-gray-600 dark:text-gray-400">
                            <p><strong>Email:</strong> {selectedRecord.email}</p>
                            <p><strong>Phone:</strong> {selectedRecord.phone}</p>
                        </div>
                        {/* Edit Button */}
                        <Button
                            className="mt-4 px-4 py-2"
                            onClick={() => handleEdit(selectedRecord)}
                        >
                            Edit Contact
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contact