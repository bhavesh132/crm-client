import React from 'react'
import { Button } from "@/components/ui/button"

const Actions = ({ setSelectedTab, setSelectedRecord, selectedRecord }) => {
    return (
        <div className='flex flex-row justify-end'>
            <Button
                className="mt-4 px-4 py-2 hover:bg-violet-900"
                onClick={() => handleEdit(selectedRecord)}
            >
                Edit Contact
            </Button>
            <Button
                className="mt-4 ml-8 px-4 min-w-24 bg-violet-50 hover:bg-gray-700 text-gray-900 hover:text-green-50 mr-4 p-4 border-l-violet-600"
                onClick={() => {
                    setSelectedTab("list")
                    setSelectedRecord(null)
                }}
            >
                Back
            </Button>
        </div>
    )
}

export default Actions