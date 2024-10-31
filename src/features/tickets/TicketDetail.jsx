import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { PlusIcon, EllipsisVertical, CircleEllipsisIcon, User2Icon } from 'lucide-react'

const TicketDetail = ({ ticketData }) => {
    console.log(ticketData)
    const headerStyles = {
        priority: {
            p3: 'bg-green-400 text-green-800',
            p4: 'bg-blue-300 text-blue-900',
            p2: 'bg-orange-500 text-gray-50',
            p1: 'bg-red-700 text-gray-200',
        },
        status: {
            assigned: 'bg-orange-600 text-gray-100',
            closed: 'bg-gray-300 text-gray-800',
            completed: 'bg-green-700 text-gray-100',
            cancelled: 'bg-gray-900 text-gray-100',
            pending: 'bg-yellow-200 text-yellow-800',
            'needs-review': 'bg-yellow-200 text-yellow-800',
            'in-progress': 'bg-blue-600 text-blue-100',
            new: 'bg-green-300 text-gray-900',
        },
    };

    const priorityText = {
        p4: 'Priority 4: Scheduled',
        p3: 'Priority 3: Normal Response',
        p2: 'Priority 2: Urgent Response',
        p1: 'Priority 1: Emergency Response',
    };

    const notes = [
        {
            "num_id": 1,
            "id": "53fde951-55d0-4e65-b8e1-09b9339a7382",
            "updated_at": "2024-10-31T18:20:42+05:30",
            "created_at": "2024-10-31T18:21:23.881708+05:30",
            "body": "This note is dynamically Generated with a ticket",
            "object_id": null,
            "modified_by": 50,
            "owner": {
                "first_name": "Bhavesh",
                "last_name": "Aggarwal"
            },
            "ticket": 3,
            "content_type": 13
        }
    ]
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 ">[ID: {ticketData.num_id}] {ticketData.title}</h1>
            <p className="text-sm font-bold w-full text-wrap text-gray-800 mb-4">{ticketData.description}</p>

            <div className="w-full flex justify-evenly h-full">

                <Tabs defaultValue="progress" className="w-1/2 mb-4 h-full overflow-y-auto">
                    <TabsList className="flex space-x-4 border-b mb-4">
                        <TabsTrigger value="progress" className="p-2">Progress</TabsTrigger>
                        <TabsTrigger value="tasks" className="p-2">Tasks</TabsTrigger>
                        <TabsTrigger value="auditLogs" className="p-2">Audit Logs</TabsTrigger>
                    </TabsList>

                    {/* Progress Tab */}
                    <TabsContent value="progress">
                        <div className="w-full mb-4 h-full overflow-y-auto">
                            {/* Progress Section */}
                            <div className="p-4 border rounded-lg bg-white shadow-sm">
                                <div className="space-y-3">
                                    <Button
                                        className="mt-2 bg-gray-900 text-white rounded px-4 py-2 hover:bg-gray-100 hover:text-gray-800 hover:border-spacing-0"
                                    >
                                        <PlusIcon /> Add New Note
                                    </Button>
                                    {/* Notes Cards */}
                                    {notes.map((note) => (

                                        <div key={note.id} className="p-4 border rounded-lg flex flex-col items-start justify-end">
                                            <div className="w-full my-2 mx-2 flex items-center justify-end">
                                                <div className="">
                                                    <User2Icon />
                                                </div>
                                                <p className="mr-auto">
                                                    {note.owner.first_name} {note.owner.last_name}
                                                </p>
                                                <div className="flex flex-col mr-4">
                                                    <span className="text-xs">Created: {new Date(note.created_at).toLocaleDateString()} {new Date(note.created_at).toLocaleTimeString()}</span>
                                                    <span className="text-xs">Updated: {new Date(note.updated_at).toLocaleDateString()} {new Date(note.updated_at).toLocaleTimeString()}</span>
                                                </div>
                                                <EllipsisVertical className="" />
                                                <hr className="my-2 border-gray-300" />
                                            </div>
                                            <p className="mt-4">{note.body}</p>

                                        </div>
                                    ))}
                                    <div className="p-4 border rounded-lg bg-gray-100">
                                        <h3 className="font-bold">Initial Description</h3>
                                        <p>{ticketData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>


                    {/* Tasks Tab */}
                    <TabsContent value="tasks">
                        {/* Task content will go here */}
                    </TabsContent>

                    {/* Audit Logs Tab */}
                    <TabsContent value="auditLogs">
                        {/* Audit log content will go here */}
                    </TabsContent>
                </Tabs>
                <div className="w-1/3 ml-4 h-full">
                    <div className="mb-6">
                        <p className="text-left text-lg font-semibold text-gray-700">Ticket Details</p>
                        <hr className="my-2 border-gray-300" />
                        <div className="mt-2 pl-4">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="py-1"><strong>Created:</strong></td>
                                        <td className="py-1">{new Date(ticketData.created_at).toLocaleDateString()} {new Date(ticketData.created_at).getHours()}:{new Date(ticketData.created_at).getMinutes()}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Status:</strong></td>
                                        <td className="py-1">
                                            <span className={`${headerStyles.status[ticketData.status]} whitespace-nowrap overflow-hidden text-center px-2 py-1 text-ellipsis`}>
                                                {ticketData.status.charAt(0).toUpperCase() + ticketData.status.slice(1).replace('-', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Priority:</strong></td>
                                        <td className="py-1">
                                            <span className={`${headerStyles.priority[ticketData.priority]} whitespace-nowrap overflow-hidden text-center px-2 py-1 text-ellipsis`}>
                                                {priorityText[ticketData.priority]}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Due Date:</strong></td>
                                        <td className="py-1">{ticketData.due_date}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Type:</strong></td>
                                        <td className="py-1">{ticketData.ticket_type.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Subtype:</strong></td>
                                        <td className="py-1">{ticketData.ticket_subtype.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1"><strong>Owner:</strong></td>
                                        <td className="py-1">{ticketData.owner.first_name} {ticketData.owner.last_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="p-4 border rounded-lg bg-white shadow-sm h-full overflow-y-auto flex flex-col items-stretch">
                        <div className="mb-4">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="cutomer-details">
                                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-700">Customer Details</AccordionTrigger>
                                    <AccordionContent>
                                        <>
                                            <hr className="my-2 border-gray-300" />
                                            <div className="mt-2 pl-4">
                                                <table className="w-full">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-1"><strong>Company:</strong></td>
                                                            <td className="py-1">{ticketData.customer_id.company_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Contact:</strong></td>
                                                            <td className="py-1">{ticketData.customer_id.contact_number}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Email:</strong></td>
                                                            <td className="py-1">{ticketData.customer_id.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Title:</strong></td>
                                                            <td className="py-1">{ticketData.customer_id.title}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="user-details">
                                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-700">User Details</AccordionTrigger>
                                    <AccordionContent>
                                        <>
                                            <hr className="my-2 border-gray-300" />
                                            <div className="mt-2 pl-4">
                                                <table className="w-full">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-1"><strong>Name:</strong></td>
                                                            <td className="py-1">{ticketData.created_by.first_name} {ticketData.created_by.last_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Email:</strong></td>
                                                            <td className="py-1">{ticketData.created_by.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Phone:</strong></td>
                                                            <td className="py-1">{ticketData.created_by.phone_number}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1"><strong>Role:</strong></td>
                                                            <td className="py-1">{ticketData.created_by.role}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TicketDetail;
