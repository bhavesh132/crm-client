import React from 'react'
import { Button } from "@/components/ui/button"

const Actions = ({ setSelectedTab, setSelectedRecord, selectedRecord, actions }) => {
    if (!selectedRecord) {
        return <div>No record selected</div>;
    }

    return (
        <div className="action-buttons">
            {actions.map((actions, index) => (
                <Button
                    key={index}
                    className="px-2 w-[96px] text-gray-800 rounded-lg m-2 hover:shadow-md bg-gray-200 hover:bg-gray-100 border-r-0"
                    onClick={actions.action} // Call the corresponding action function
                >
                    {actions.icon}{actions.label}
                </Button>
            ))}
        </div>
    );
};

export default Actions