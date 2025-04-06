import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, User, Briefcase, CircleArrowLeft, MailIcon, Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTickets } from "../tickets/ticketSlice";
import Modal from "../../components/ui/Modal";
import { getRecentActivity, getInstanceDetail } from "../audits/auditSlice"
import { formatDate, formatTime, capitalizeFirstLetter } from "../../lib/utils";
import Loader from "../../pages/generics/Loader";
import Actions from '../../components/Actions'
import { useNavigate, useParams } from 'react-router-dom';
import { getContactDetails, updateContact } from "./contactSlice";
import ErrorPage from "../../pages/generics/Error";
import EditContactForm from "./EditContact";

export default function ContactDetailsPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("details");
    const [localLoader, setLocalLoader] = useState(false);
    const [contact, setContact] = useState(null)
    const [records, setRecords] = useState([])
    const ticketsData = useSelector((state) => state.ticket.data);
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {
        contactDetail,
        error,
        isError, loading } = useSelector((state) => state.contact);

    const tabActions = {
        tickets: () => dispatch(getAllTickets({ customer_id__id: contact.id })),
        // opportunities: getOpportunities(),
        // campaigns: getCampaigns(),
        // audit: getAuditLog(),
    };

//     const handleTabChange = async (value) => {
//     setLocalLoader(true);
//     const action = tabActions[value];
//     if (action) {
//         try {
//             const response = await action();
//             setRecords(response.data);
//             console.log(response);
//             setActiveTab(value);
//         } catch (error) {
//             console.error('Error fetching records:', error);
//         } finally {
//             setLocalLoader(false);
//         }
//     } else {
//         console.log('Invalid tab');
//         setLocalLoader(false);
//     }
// };

    useEffect(() => {
        dispatch(getContactDetails(id));
    }, [id]);

    useEffect(() => {
        setLocalLoader(true)
        if(contact){
            dispatch(getAllTickets({ customer_id__id: contact.id }));
        }
        setLocalLoader(false)
    }, [contact]);

    useEffect(() => {
        if (contactDetail) {
            setContact(contactDetail);
            console.log(contactDetail)
        }
    }, [contactDetail]);

    useEffect(() => {
        setRecords(ticketsData);
    }, [ticketsData]);

    const contactActions = [
        { label: "Edit", action: () => setShowEditModal(true), icon: <Pencil />, color: 'from-yellow-500 to-yellow-500 hover:from-yellow-500 hover:to-yellow-500' },
        { label: "Delete", action: () => deleteContact(contactDetail), icon: <Trash2 />, color: 'from-red-500 to-red-500 hover:from-red-500 hover:to-red-500' },
        { label: "Send Email", action: () => setSelectedRecord(null), icon: <MailIcon />, color: 'from-violet-500 to-violet-500 hover:from-violet-500 hover:to-violet-500' },
        { label: "Back", action: () => navigate(`/contact`), icon: <CircleArrowLeft />, color: 'from-gray-500 to-gray-500 hover:from-gray-500 hover:to-gray-500' },
    ];

    const handleEditContact = async (updatedContact) => {
        try {
            await dispatch(updateContact({ id: contactDetail.id, data: updatedContact }));
            await dispatch(getContactDetails(id));
        } catch (error) {
            console.error(error);
        } finally {
            setShowEditModal(false);
        }
    };

    const handleRelatedClick = (cardType, records) => {
        if (cardType === "open") {
            console.log(`Open ${title} clicked`);

        } else if (cardType === "all") {
            console.log(`All ${title} clicked`);
        }
    }

    if (loading || !records) return <Loader />;
    if (isError) return <ErrorPage message={error.message} />;
    if (!contact) return <ErrorPage message='No contact found' />;
    if (contact && records) {
            const closeStatus = ["cancelled", "completed", "closed"];
            const openTickets = records.filter(record => !closeStatus.includes(record.status));
        return (
            <div className="flex-1 p-2 space-y-1 bg-transparent dark:bg-gray-800 overflow-y-auto">
                <Actions
                    entityType="contact"
                    actions={contactActions}
                />

                 <Modal
                    isOpen={showEditModal}
                    title="Edit Contact"
                    content={<EditContactForm contact={contactDetail} onClose={() => setShowEditModal(false)} onSubmit={handleEditContact} />}
                />

                <div className="container mx-auto my-4 p-4 space-y-6 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">{contact.full_name}: {contact.title}</h1>
                    <Tabs defaultValue="details" onValueChange={(value) => handleTabChange(value)}>
                        {/* Tabs Header */}
                        <TabsList className="flex border-b border-gray-200 space-x-4 justify-start">
                            <TabsTrigger value="details" className="px-4 py-2 text-gray-600">Details</TabsTrigger>
                            <TabsTrigger value="tickets" className="px-4 py-2 text-gray-600"> Tickets</TabsTrigger>
                            <TabsTrigger value="opportunities" className="px-4 py-2 text-gray-600"> Opportunities</TabsTrigger>
                            <TabsTrigger value="campaigns" className="px-4 py-2 text-gray-600"> Campaigns</TabsTrigger>
                            <TabsTrigger value="audit" className="px-4 py-2 text-gray-600">Audit Log</TabsTrigger>
                        </TabsList>

                        {/* Tabs Content */}
                        <TabsContent value="details">
                            <Card className="p-4 space-y-4">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold text-gray-900">
                                            {contact.full_name}
                                        </CardTitle>
                                        <Badge variant="outline" className="px-2 py-1 text-xs font-medium capitalize">
                                            {contact.contact_type}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{contact.title} at {contact.company_name}</p>
                                </CardHeader>

                                {localLoader ? (
                                    <Loader />
                                ) : (
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Briefcase className="w-5 h-5" />
                                            <span>Company: {contact.company_name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Mail className="w-5 h-5" />
                                            <span>Email: {contact.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Phone className="w-5 h-5" />
                                            <span>Phone: {contact.contact_number}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <User className="w-5 h-5" />
                                            <span>Owner: {contact.owner.first_name} {contact.owner.last_name}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 mt-4">
                                            <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                                <CardTitle className="text-sm font-medium text-gray-700">Open Tickets</CardTitle>
                                                <p className="text-lg font-semibold text-gray-900">{openTickets.length}</p>
                                            </Card>
                                            <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                                <CardTitle className="text-sm font-medium text-gray-700">Total Tickets Logged</CardTitle>
                                                <p className="text-lg font-semibold text-gray-900">{records.length}</p>
                                            </Card>
                                        </div>
                                            <div className="mt-6">
                                                <h3 className="text-md font-semibold text-gray-700 mb-2">CRM Note</h3>
                                               <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                       This is a sample note
                                                    </p>
                                                    <div className="flex justify-end mt-2">
                                                        <button variant="ghost" size="sm">
                                                        Edit Note
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    </CardContent>
                                )}


                                <CardFooter className="flex justify-between text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Created: {new Date(contact.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Updated: {new Date(contact.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="tickets">
                            <RelatedItemsList
                                title="Tickets"
                                items={records}
                                renderItem={(item) => (
                                    <div className="flex w-[40%]">
                                        <Card key={item.id}
                                            className="px-8 py-2 relative w-full bg-white shadow-sm rounded-sm cursor-pointer hover:shadow-md"
                                            onClick={() => navigate(`/tickets/${item.id}`)}>
                                            <span
                                                className={`absolute left-0 top-0 h-full w-[15px] rounded-l-sm ${item.priority === 'p1' ? 'bg-red-500' : item.priority === 'p2' ? 'bg-orange-500' : item.priority === 'p3' ? 'bg-blue-500' : 'bg-green-500'}`}
                                            ></span>
                                            <p className="text-sm text-gray-800">[{item.num_id}]: {item.title}</p>
                                            <p className="text-sm text-gray-500">{item.owner.first_name} {item.owner.last_name}</p>
                                            <p className="text-xs text-gray-500">{capitalizeFirstLetter(item.status)}</p>
                                            <p className="text-xs text-gray-500">Last Updated: {formatDate(new Date(item.updated_at))} / {formatTime(new Date(item.updated_at))}</p>
                                        </Card>
                                    </div>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="opportunities">
                            <RelatedItemsList
                                title="Opportunities"
                                items={records}
                                renderItem={(item) => (
                                    <Card key={item.id} className="p-4 bg-white shadow-md rounded-lg">
                                        <p className="text-sm text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.amount}</p>
                                    </Card>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="campaigns">
                            <RelatedItemsList
                                title="Campaigns"
                                handleRelatedClick={handleRelatedClick}
                                items={records}
                                renderItem={(item) => (
                                    <Card key={item.id} className="p-4 bg-white shadow-md rounded-lg">
                                        <p className="text-sm text-gray-800">{item.campaignName}</p>
                                        <p className="text-xs text-gray-500">{item.startDate}</p>
                                    </Card>
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        );
    }
}


function RelatedItemsList({ title, items, renderItem }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Related {title}</h2>
            <div className="grid grid-cols-6 gap-2 mt-4">
                <Card className="p-4 bg-indigo-700 rounded-md shadow-sm">
                    <CardTitle className="text-sm font-medium text-gray-100">Total {title} Logged</CardTitle>
                    <p className="text-lg font-semibold text-gray-50">{items.length}</p>
                </Card>
            </div>
            {items.length > 0 ? (
                items.map(renderItem)
            ) : (
                <p className="text-gray-500">No {title.toLowerCase()} found.</p>
            )}
        </div>
    );
}



function AuditLog({ items }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Audit Log</h2>
            {items.length > 0 ? (
                items.map((log, index) => (
                    <Card key={index} className="p-4 bg-white shadow-md rounded-lg">
                        <p className="text-sm text-gray-800">Created</p>
                        <p className="text-xs text-gray-500">Timestamp: {new Date().toLocaleString()}</p>
                    </Card>
                ))
            ) : (
                <p className="text-gray-500">No audit log entries found.</p>
            )}
        </div>
    );
}
