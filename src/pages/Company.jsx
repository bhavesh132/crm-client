import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/Datatable';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './generics/Loader';
import ErrorPage from './generics/Error';
import { getAllCompanies } from '../features/companies/companySlice';
import { useNavigate } from 'react-router';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
// import AddCompany from '../features/companies/AddCompany';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { setCurrentPage, setPageSize, setTotalCount } from '../features/generics/paginationSlice';
import { setFilterParams, setSortingParams } from '../features/generics/filterSlice';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';


const columns = [
    { key: "num_id", label: "ID" },
    { key: "name", label: "Company Name" },
    { key: "contact", label: "Point of Contact" },
    { key: "priority", label: "Priority" },
    { key: "is_active", label: "Active Status" },
    { key: "sla_agreement", label: "SLA Agreement" },
    { key: "revenue", label: "Revenue" },
    { key: "upsell_opportunity", label: "Upsell Opportunity" },
    { key: "industry", label: "Industry" },
    { key: "website", label: "Website" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Last Updated" },
    { key: "owner", label: "Owner" },
];

const dataMapping = {
    contact: {
        extractor: (row) => row.contact?.full_name || '',
        name: 'full_name'
    },
    owner: {
        extractor: (row) => row.owner?.username || '',
        name: 'username'
    },

};

const Company = () => {
    const navigate = useNavigate();
    const { user } = JSON.parse(localStorage.getItem('user'));
    const { pageSize, currentPage } = useSelector((state) => state.pagination);
    const [inputValues, setInputValues] = useState({});
    const dispatch = useDispatch();
    const { data, loading, isError, error, totalCount } = useSelector((state) => state.company);
    const [filterQuery, setFilterQuery] = useState({});
    const { orderBy, filters } = useSelector((state) => state.filter);

    const totalPages = Math.ceil(totalCount / pageSize);
    const companyData = data;

    useEffect(() => {
        dispatch(getAllCompanies());

        dispatch(setTotalCount(totalCount));
    }, [dispatch, orderBy, pageSize, filters, currentPage]);

    if (loading) return <Loader />;
    if (isError) return <ErrorPage message={error.message} />;
    if (data) {
        console.log(data)
    const handleSort = (key, order) => {
        if (order === 'asc') {
            dispatch(setSortingParams(key));
        } else if (order === 'desc') {
            dispatch(setSortingParams(`-${key}`));
        }
    };

    const handleRowClick = (record) => {
        navigate(`/company/${record.id}`);
    };

    const handleFilterChange = (key, value) => {
        setInputValues(prev => ({ ...prev, [key]: value }));
        const filterParams = { [key]: value };
        setFilterQuery(prev => ({
            ...prev,
            ...filterParams
        }));
    };

    const handleViewValue = async (value) => {
        if (value === "my_companies") {
            const newFilterQuery = { owner__num_id: `${user.num_id}` };
            dispatch(setCurrentPage('1'));
            dispatch(setFilterParams(newFilterQuery));
        } else if (value === "all_companies") {
            handleClear();
        }
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleSearch = () => {
        dispatch(setFilterParams(filterQuery));
    };

    const handleClear = () => {
        setFilterQuery({});
        dispatch(setFilterParams({}));
    };

    return (
        
        <div className="flex h-full">
            <div className="flex-1 p-2 space-y-1 bg-transparent dark:bg-gray-800 overflow-y-auto">
                <header className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    Companies
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
                                    <span className='text-sm'>Add New Company</span>
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Add a New Company</SheetTitle>
                                    <SheetDescription>
                                        {/* <AddCompany /> */}
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
                                    <SelectItem value="my_companies">My Companies</SelectItem>
                                    <SelectItem value="all_companies">All Companies</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='w-fit mr-6'>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem className='cursor-pointer'>
                                        <PaginationPrevious onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
                                    </PaginationItem>
                                    <p className='text-sm italic px-4'>Page {currentPage} of {totalPages}</p>
                                    <PaginationItem className='cursor-pointer'>
                                        <PaginationNext onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={totalPages <= currentPage} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', height: '75vh' }} className='overflow-y-scroll'>
                    <DataTable
                        data={companyData}
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
        </div>
    );
    }
}

export default Company;
