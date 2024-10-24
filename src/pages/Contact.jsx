import React, { useState, useEffect } from 'react'
import DataTable from '../components/ui/Datatable';
import { Button } from '@/components/ui/button'
import { PlusIcon, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './generics/Loader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import ErrorPage from './generics/Error';
import { setSortingParams, setFilterParams } from '../features/contacts/contactSlice'
import Actions from '../components/Actions';
import { getAllContacts, getContactDetails } from '../features/contacts/contactSlice';
import ContactDetail from '../features/contacts/ContactDetail';
import { setCurrentPage, setPageSize, setTotalCount } from '../features/generics/paginationSlice';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
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
    const totalPages = Math.ceil(totalCount / pageSize);


    const contactActions = [
        { label: "View", action: () => viewDetails(selectedRecord) },
        { label: "Edit", action: () => editContact(selectedRecord) },
        { label: "Delete", action: () => deleteContact(selectedRecord) },
        { label: "Back", action: () => setSelectedRecord(null) }
    ];

    const ContactData = data
    console.log(ContactData)
    useEffect(() => {
        dispatch(getAllContacts())
        dispatch(setTotalCount(totalCount))
    }, [dispatch, orderBy, pageSize, filters, currentPage, selectedRecord])

    useEffect(() => {
        console.log("PageSize updated: ", pageSize);
    }, [pageSize]);

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

        const handlePageChange = (page) => {
            dispatch(setCurrentPage(page));
        }

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
            console.log(record)
            dispatch(getContactDetails(record.id))
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
                                <div className="flex items-center ml-0 mr-auto mb-2">
                                    <Select onValueChange={(value) => { dispatch(setPageSize(value)) }}>
                                        <SelectTrigger className="w-fit">
                                            <SelectValue placeholder={pageSize} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                            <SelectItem value="150">150</SelectItem>
                                            <SelectItem value="200">200</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='w-fit mr-6'>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem className='cursor-pointer'>
                                                <PaginationPrevious onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
                                            </PaginationItem>
                                            {/* Render pagination links */}

                                            <p className='text-sm italic px-4'>Page {currentPage} of {totalPages}</p>


                                            <PaginationItem className='cursor-pointer'>
                                                <PaginationNext onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                                <div className='align-middle text-sm text-gray-700 w-[150px] h-full justify-end dark:text-gray-400'>
                                    Displaying {totalCount} Records
                                </div>
                            </div>
                        </div>
                    ) :
                        <Actions
                            entityType="contact"
                            actions={contactActions}
                            selectedRecord={selectedRecord}
                            setSelectedRecord={setSelectedRecord}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    }

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
                                orderBy={orderBy}
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