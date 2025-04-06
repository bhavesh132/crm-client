import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

const DataTable = ({ data, columns, onRowClick, onFilterChange, onSort, inputValues, orderBy, dataMapping }) => {

    // Define styles for specific headers
    const headerStyles = {
        priority: {
            p3: 'bg-green-600 text-gray-50',
            p4: 'bg-blue-500 text-gray-50',
            p2: 'bg-orange-500 text-gray-50',
            p1: 'bg-red-600 text-gray-50'
        },
        status: {
            assigned: 'bg-orange-600 text-gray-100',
            closed: 'bg-gray-300 text-gray-800',
            completed: 'bg-green-700 text-gray-100',
            cancelled: 'bg-gray-900 text-gray-100',
            pending: 'bg-yellow-200 text-yellow-800',
            'needs-review': 'bg-amber-600 text-yellow-50',
            'in-progress': 'bg-blue-600 text-blue-100',
            new: 'bg-indigo-800 text-gray-100'
        },
    };

    const priorityText = {
        p4: 'Priority 4: Scheduled',
        p3: 'Priority 3: Normal Response',
        p2: 'Priority 2: Urgent Response',
        p1: 'Priority 1: Emergency Response',
    };

    // Capitalize content and handle hyphens
    const capitalizeContent = (header, content) => {

        if (['priority', 'status', 'contact-type'].includes(header)) {
            return content.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        return content;
    };

    // Render cells with conditional styling
    const renderCell = (header, value) => {
        if (typeof value === 'boolean') {
            return value ? "Yes" : "No";
        }


        const content = header === 'priority' ? priorityText[value.toLowerCase()] || capitalizeContent(header, value) : capitalizeContent(header, value);
        if (headerStyles[header] && headerStyles[header][value.toLowerCase()]) {
            const styleClasses = headerStyles[header][value.toLowerCase()];
            return <div className='flex justify-center'><span className={`block w-[150px] whitespace-nowrap overflow-hidden text-center px-2 py-1 text-ellipsis ${styleClasses}`}>{content}</span></div>;
        }
        return content;
    };


    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-900">
            <table className="min-w-full overflow-y-auto text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className='sticky top-0 z-10 w-[40px] text-nowrap overflow-hidden'>
                    <tr className=''>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`${col.label === "ID" ? 'min-w-20' : 'min-w-80'}  px-4 py-2 text-left text-gray-800 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700`}
                            >
                                <div className="flex items-center space-x-2">
                                    <span>{col.label}</span>
                                    {/* Sort buttons */}
                                    <button
                                        className={`${orderBy === col.key
                                            ? "text-black" // Active state for ascending
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" // Default state
                                            }`}
                                        onClick={() => onSort(col.key, 'asc')}
                                    >
                                        <ChevronUp />
                                    </button>
                                    <button
                                        className={`${orderBy === `-${col.key}`
                                            ? "text-black" // Active state for descending
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" // Default state
                                            }`}
                                        onClick={() => onSort(col.key, 'desc')}
                                    >
                                        <ChevronDown />
                                    </button>
                                </div>
                                {/* Filter input */}
                                <input
                                    type="text"
                                    className="mt-1 p-1 px-2 w-full text-sm border-[1px] focus:border-[1.5px] focus:border-purple-400 focus:outline-none"

                                    value={inputValues[col.key] || ''}
                                    onChange={(e) => onFilterChange(col.key, e.target.value)}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-700 transition duration-1150 ease-in-out"
                            onClick={() => onRowClick(row)}
                        >
                            {columns.map((col) => {
                                const mapping = dataMapping[col.key];
                                const value = mapping && typeof mapping.extractor === 'function' ? mapping.extractor(row) : row[col.key];
                                return (
                                    <td key={col.key} className="overflow-hidden px-4 py-2 border-b-2 max-w-xs w-fit m-auto text-gray-700 dark:text-gray-400">
                                        {renderCell(col.key, value)}
                                    </td>
                                )
                            }
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
