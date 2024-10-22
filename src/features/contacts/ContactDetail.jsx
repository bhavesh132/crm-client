import React from 'react'
import { Button } from "@/components/ui/button"

const ContactDetail = ({ selectedRecord, setSelectedTab, setSelectedRecord }) => {
    return (
        <div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Contact Details: {selectedRecord.full_name}
                </h2>
                <div className="text-gray-600 dark:text-gray-400">
                    <p><strong>Email:</strong> {selectedRecord.email}</p>
                    <p><strong>Phone:</strong> {selectedRecord.contact_number}</p>
                </div>
                {/* Edit Button */}
                <Button
                    className="mt-4 px-4 py-2 hover:bg-violet-900"
                    onClick={() => handleEdit(selectedRecord)}
                >
                    Edit Contact
                </Button>
                <Button variant='destructive'
                    className="mt-4 ml-8 px-4 min-w-24 bg-violet-50 hover:bg-gray-700 text-gray-900 hover:text-green-50 mr-4 p-4 border-l-violet-600"
                    onClick={() => {
                        setSelectedTab("list")
                        setSelectedRecord(null)
                    }}
                >
                    Back
                </Button>
            </div></div>
    )
}

export default ContactDetail