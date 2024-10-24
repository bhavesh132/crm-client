import React from 'react'
import { Button } from "@/components/ui/button"

const Actions = ({ setSelectedTab, setSelectedRecord, selectedRecord, actions }) => {
    if (!selectedRecord) {
        return <div>No record selected</div>;
    }

    return (
        <div className="action-buttons">
            {actions.map((action, index) => (
                <Button
                    key={index}
                    className="p-2 w-[96px] text-white rounded-lg m-2"
                    onClick={action.action} // Call the corresponding action function
                >
                    {action.label}
                </Button>
            ))}
        </div>
    );
};

export default Actions