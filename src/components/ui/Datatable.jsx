import React, { useState } from 'react';
import { useNavigate } from 'react-router';


const DataTable = ({ data, columns, onRowClick, onFilterChange, onSort, filters, orderBy }) => {

    return (
        <div>
            <table className="min-w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <thead className='sticky top-0 z-10'>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`${col.label === "ID" ? 'min-w-20' : 'min-w-80'} px-4 py-2 text-left text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700`}
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
                                        ▲
                                    </button>
                                    <button
                                        className={`${orderBy === `-${col.key}`
                                            ? "text-black" // Active state for ascending
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" // Default state
                                            }`}
                                        onClick={() => onSort(col.key, 'desc')}
                                    >
                                        ▼
                                    </button>
                                </div>
                                {/* Filter input */}
                                < input
                                    type="text"
                                    className="mt-1 border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full text-sm dark:bg-gray-900 dark:text-gray-300"
                                    placeholder={`${col.label}`}
                                    value={filters.hasOwnProperty(col.key) ? filters[col.key] : ""}
                                    onChange={(e) => onFilterChange(col.key, e.target.value)}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="overflow-x-auto w-full"   >
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-950"
                            onClick={() => onRowClick(row)}
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400"
                                >
                                    {typeof (row[col.key]) === 'string' ? row[col.key] : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default DataTable;
