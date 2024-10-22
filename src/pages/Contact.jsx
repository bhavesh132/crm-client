import React, { useState, useEffect } from 'react'
import DataTable from '../components/ui/Datatable';
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './generics/Loader';
import ErrorPage from './generics/Error';
import { setSortingParams, setFilterParams } from '../features/contacts/contactSlice'
import Actions from '../components/Actions';
import { getAllContacts } from '../features/contacts/contactSlice';
import ContactDetail from '../features/contacts/ContactDetail';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



const columns = [
    { key: "num_id", label: "ID" },
    { key: "full_name", label: "Name" },
    { key: "company_name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "contact_number", label: "Contact" },
    { key: "contact_type", label: "Type" },
    { key: "title", label: "Position" },
];

const Contact = () => {
    const [selectedTab, setSelectedTab] = useState("list"); // Tracks current tab
    const [selectedRecord, setSelectedRecord] = useState(null);
    const dispatch = useDispatch();
    const { data, loading, isError, error, filters, orderBy, totalCount } = useSelector((state) => state.contact);
    const { pageSize, currentPage } = useSelector((state) => state.pagination);
    const [filterQuery, setFilterQuery] = useState({})
    const ContactData = data
    useEffect(() => {
        dispatch(getAllContacts())
    }, [dispatch, orderBy, filters])


    if (loading) return <Loader />;
    if (isError) return <ErrorPage message={error.message} />;
    if (data) {

        const handleSort = (key, order) => {
            // Backend handles sorting; 
            if (order == 'asc') {
                dispatch(setSortingParams(key))
            } else if (order === 'desc') {
                dispatch(setSortingParams(`-${key}`))
            }
            console.log(`Sorting by ${key} in ${order} order`);
        };

        const handleFilterChange = (key, value) => {
            // Backend handles filtering;
            const filterParams = { [key]: value };
            setFilterQuery(prev => ({
                ...prev,
                ...filterParams
            }));
            console.log(`Filtering ${key} by ${value}`);
        };

        const handleSearch = () => {
            console.log("button clicked")
            dispatch(setFilterParams(filterQuery))
        }

        const handleClear = () => {
            setFilterQuery({})
            dispatch(setFilterParams({}))
        }

        const handleRowClick = (record) => {
            setSelectedRecord(record);
            setSelectedTab("detail");
        };
        return (
            <div className="flex h-full">

                {/* Main Content */}
                <div className="flex-1 p-2 space-y-1 bg-transparent dark:bg-gray-800 overflow-y-auto">
                    {/* Header */}
                    <header className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Contacts
                    </header>

                    {/* Actions Section Dynamically Loaded */}
                    {!selectedRecord ? (
                        <div className='flex flex-col justify-end'>
                            <div className='flex flex-row justify-end'>

                                <Button onClick={handleClear} className='bg-violet-50 min-w-24 hover:bg-gray-700 text-gray-900 hover:text-green-50 mr-4 p-4 border-l-violet-600'>
                                    Clear
                                </Button>
                                <Button onClick={handleSearch} className='min-w-24 hover:bg-violet-900 mr-14 hover:text-gray-50'>
                                    Search
                                </Button>
                                <Button className='min-w-24 bg-green-700 hover:bg-green-900 hover:text-gray-50'>
                                    <PlusIcon />
                                    Add New Contact
                                </Button>
                            </div>
                            <div className='flex mt-6 flex-row justify-end items-center w-full'>
                                <div className='w-fit mr-6'>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious onClick />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink onClick>1</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext onClick />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                                <div className='align-middle text-sm text-gray-700 w-[150px] h-full justify-end'>
                                    Displaying {totalCount} Records
                                </div>
                            </div>
                        </div>
                    ) :
                        <Actions
                            entityType="contact"
                            actions={['edit', 'delete', 'view details']}
                            selectedRecord={selectedRecord}
                            setSelectedRecord={setSelectedRecord}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    }




                    {/* Tabs for List and Details */}
                    {/* <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
                        <button
                            className={`py - 2 px - 4 ${!selectedRecord
                                ? "border-b-2 border-violet-500 text-violet-500"
                                : "text-gray-600 dark:text-gray-400"
                                } `}
                            onClick={() => setSelectedRecord(null)}
                        >
                            Contact List
                        </button>
                        <button
                            className={`py - 2 px - 4 ${selectedRecord
                                ? "border-b-2 border-violet-500 text-violet-500"
                                : "text-gray-600 dark:text-gray-400"
                                } `}
                            disabled={!selectedRecord}
                        >
                            Contact Details
                        </button>
                    </div> */}

                    {/* Table or Details */}
                    {!selectedRecord ? (
                        <div style={{ width: '100%', height: '70vh' }} className='overflow-y-scroll'>
                            <DataTable
                                data={ContactData}
                                columns={columns}
                                onRowClick={handleRowClick}
                                onFilterChange={handleFilterChange}
                                onSort={handleSort}
                                filters={filterQuery}
                            />
                        </div>
                    ) : (
                        <ContactDetail selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    )}
                </div>
            </div >
        )
    }
}

export default Contact