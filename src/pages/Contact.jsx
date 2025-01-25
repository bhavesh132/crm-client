import React, { useState, useEffect } from 'react'
import DataTable from '../components/ui/Datatable';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './generics/Loader';
import ErrorPage from './generics/Error';
import { getAllContacts } from '../features/contacts/contactSlice';
import { useNavigate } from 'react-router';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import AddContact from '../features/contacts/AddContact';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setCurrentPage, setPageSize, setTotalCount } from '../features/generics/paginationSlice';
import { setFilterParams } from '../features/generics/filterSlice'
import { setSortingParams } from '../features/generics/filterSlice'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react';

const columns = [
    { key: "num_id", label: "ID" },
    { key: "full_name", label: "Name" },
    { key: "company_name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "contact_number", label: "Contact" },
    { key: "contact_type", label: "Type" },
    { key: "title", label: "Position" },
];

const dataMapping = {}

const Contact = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.global);
    const { pageSize, currentPage } = useSelector((state) => state.pagination);
    const [inputValues, setInputValues] = useState({});
    const dispatch = useDispatch();
    const { data, loading, isError, error, totalCount } = useSelector((state) => state.contact);
    const [filterQuery, setFilterQuery] = useState({})
    const { orderBy, filters } = useSelector((state) => state.filter)

    const totalPages = Math.ceil(totalCount / pageSize);
    const ContactData = data
    useEffect(() => {
        dispatch(getAllContacts())
        dispatch(setTotalCount(totalCount))
    }, [dispatch, orderBy, pageSize, filters, currentPage])

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
        };
        const handleRowClick = (record) => {
            navigate(`/contact/${record.id}`);
        };

        const handleFilterChange = (key, value) => {
            setInputValues(prev => ({ ...prev, [key]: value }));

            if (dataMapping[key]) {
                const propertyName = dataMapping[key].name;
                let filterParams;

                // Check if the propertyName corresponds to a related field where you want to use icontains
                if (propertyName === 'username' || propertyName === 'name') {
                    filterParams = { [`${key}__${propertyName}__icontains`]: value }; // Using icontains
                } else {
                    filterParams = { [`${key}__${propertyName}`]: value }; // Default exact match
                }

                setFilterQuery(prev => ({
                    ...prev,
                    ...filterParams
                }));
            } else {
                const filterParams = { [key]: value };

                setFilterQuery(prev => ({
                    ...prev,
                    ...filterParams
                }));
            }
        };

        const handleViewValue = async (value) => {
            if (value === "my_contacts") {
                const newFilterQuery = { owner__num_id: `${user.num_id}` }
                dispatch(setCurrentPage('1'))
                handleFilterChange(newFilterQuery)
                dispatch(setFilterParams(newFilterQuery))
            } else if (value === "all_contacts") {
                handleClear()
            }
        }

        const handlePageChange = (page) => {
            dispatch(setCurrentPage(page));
        }

        const handleSearch = () => {
            console.log("button clicked")
            dispatch(setFilterParams(filterQuery))
        }


        const handleClear = () => {
            setFilterQuery({})
            dispatch(setFilterParams({}))
        }

        return (
            <div className="flex h-full">
                {/* Main Content */}
                <div className="flex-1 p-2 space-y-1 bg-transparent dark:bg-gray-800 overflow-y-auto">

                    <header className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Contacts
                    </header>
                    <div className='flex flex-col justify-end'>
                        <div className='flex flex-row justify-end'>
                            <Button onClick={handleClear} className='bg-violet-50 min-w-24 border-gray-400 border-[1px] hover:bg-gray-700 text-gray-900 hover:text-green-50 mr-4 p-4 border-l-violet-600'>
                                Clear
                            </Button>
                            <Button onClick={handleSearch} className='min-w-24 hover:bg-violet-900 mr-14 hover:text-gray-50'>
                                Search
                            </Button>
                            <Sheet>
                            <SheetTrigger className='min-w-24 bg-gray-900 rounded-md text-gray-50 p-2 w-fit transition-all ease-in-out hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 hover:border-[1px]'> 
                                <div className='flex flex-row justify-evenly align-middle items-center'>
                                    <span className='text-sm'><PlusIcon /></span>
                                        <span className='text-sm'>Add New Contact</span>
                                </div>
                                
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle>Fill this form to Add new Contact</SheetTitle>
                                <SheetDescription>
                                    <AddContact />
                                </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                            </Sheet>
                           
                        </div>

                        <div className='flex mt-4 flex-row justify-end items-center w-full'>
                            <div className="flex items-center ml-0 mr-auto mb-2">

                                <Select onValueChange={(value) => { handleViewValue(value) }}>
                                    <SelectTrigger className="w-fit dark:border-gray-400">
                                        <SelectValue placeholder="Select a View" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="my_contacts">My Contacts</SelectItem>
                                        <SelectItem value="all_contacts">All Contacts</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center ml-0 mr-auto mb-2">
                                <span className='mr-2 text-sm text-neutral-600 italic'>Records per view:</span>
                                <Select onValueChange={(value) => { dispatch(setPageSize(value)) }}>
                                    <SelectTrigger className="w-fit dark:border-gray-400">
                                        <SelectValue placeholder={pageSize} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
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
                                            <PaginationNext onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={totalPages <= currentPage ? true : false} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <div className='align-middle text-sm text-gray-700 w-[150px] h-full justify-end dark:text-gray-400'>
                                Displaying {totalCount} Records
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '75vh' }} className='overflow-y-scroll'>
                        <DataTable
                            data={ContactData}
                            columns={columns}
                            onRowClick={handleRowClick}
                            onFilterChange={handleFilterChange}
                            onSort={handleSort}
                            inputValues={inputValues}
                            orderBy={orderBy}
                            dataMapping={dataMapping}
                        />
                    </div>
                </div>
            </div >
        )
    }
}

export default Contact