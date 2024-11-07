import React from 'react'
import { Button } from "@/components/ui/button"

const Actions = ({ actions }) => {


    return (
        <div className="action-buttons">
            {actions.map((actions, index) => (
                <Button
                    key={index}
                    className={
                        `px-2 min-w-[96px] bg-gradient-to-r ${actions.color} bg-no-repeat
                         bg-[length:5px_100%] bg-left hover:bg-[length:100%_100%] 
                          transition-all duration-30 w-fit 
                         rounded-none text-gray-800 hover:text-gray-100 m-2 hover:shadow-md bg-gray-100 border-r-0`}
                    onClick={actions.action} // Call the corresponding action function
                >
                    {actions.icon} {actions.label}
                </Button>
            ))}
        </div>
    );
};

export default Actions