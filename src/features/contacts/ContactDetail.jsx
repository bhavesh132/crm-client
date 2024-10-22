import React from 'react'


const ContactDetail = ({ selectedRecord }) => {
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
            </div>
        </div>
    )
}

export default ContactDetail