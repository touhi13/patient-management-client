import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useDispatch, useSelector } from 'react-redux';
import { useGetPatientsQuery } from '@/features/patient/patientApi';
import { updateCacheKey } from '@/features/cacheKey/cacheKeySlice';
import AddPatient from './components/AddPatient';
import Delete from './components/Delete';

const Patient = () => {
    const patientCacheKey = useSelector((state) => state.cacheKey.patient);
    const dispatch = useDispatch();

    console.log(patientCacheKey)

    const { data, isLoading, isError, error, } = useGetPatientsQuery(patientCacheKey);

    const handlePagination = (e, page) => {
        e.preventDefault();
        console.log(typeof (page))
        dispatch(updateCacheKey({
            key: 'patient', payload: { "page": page }
        }))
    }

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Patients</h2>
                    {/* <p className='text-muted-foreground'>
                    Here&apos;s a list of your tasks for this month!
                </p> */}
                </div>
                <div className="ml-auto"> {/* Use ml-auto to push the AddPatient button to the right */}
                    <AddPatient />
                </div>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <Table>
                    <TableCaption>A list of your recent Requests.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Medical History</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.data?.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.date_of_birth}</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{patient.address}</TableCell>
                                <TableCell>{patient.phone_number}</TableCell>
                                <TableCell>{patient.medical_history}</TableCell>
                                <TableCell className="text-right">
                                    <AddPatient id={patient.id} />
                                    <Delete id={patient.id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={10}>
                                <Pagination>
                                    <PaginationContent>
                                        {data?.data.prev_page_url !== null &&
                                            <PaginationItem >

                                                <PaginationPrevious href="#" onClick={(e) => handlePagination(e, data?.data?.current_page - 1)} />

                                            </PaginationItem>
                                        }
                                        {data?.data?.links
                                            .filter((_, index, array) => index !== 0 && index !== array.length - 1)
                                            .map((link) => (
                                                <PaginationItem key={link.label}>
                                                    {link.active === true ?
                                                        <PaginationLink href="#" onClick={(e) => handlePagination(e, parseInt(link.label))} isActive>{link.label}
                                                        </PaginationLink> :
                                                        <PaginationLink href="#" onClick={(e) => handlePagination(e, parseInt(link.label))} >{link.label}
                                                        </PaginationLink>
                                                    }
                                                </PaginationItem>
                                            ))}
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        {data?.data.next_page_url !== null &&

                                            <PaginationItem>
                                                <PaginationNext href="#" onClick={(e) => handlePagination(e, data?.data?.current_page + 1)} />
                                            </PaginationItem>
                                        }
                                    </PaginationContent>
                                </Pagination>
                            </TableCell>
                            {/* <TableCell className="text-right">$2,500.00</TableCell> */}
                        </TableRow>

                    </TableFooter>
                </Table>
            </div>
        </>
    );
};

export default Patient;