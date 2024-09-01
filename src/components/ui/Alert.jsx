import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const Alert = ({ type, message, onActionClick }) => {

    useEffect(() => {

        const timeout = setTimeout(() => {
            onActionClick(); // Automatically close the alert after 5 seconds
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [onActionClick]);

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'error':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'info':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    }

    return (
        <div className={`absolute top-4 right-4 z-50 max-w-80 flex items-center px-2 py-2 border rounded-lg ${getAlertStyles()}`}>
            <div className="flex-1">
                <p className="text-sm font-medium mr-6">{message}</p>
            </div>
            <div className="absolute top-2 right-2">
                {onActionClick && (
                    <X size={16}
                        className="cursor-pointer" onClick={onActionClick} />
                )}
            </div>
        </div>
    )
}

export default Alert