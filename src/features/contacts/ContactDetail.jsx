import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, User, Briefcase } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { getContactDetails } from "../contacts/contactSlice";
import { getRecentActivity, getInstanceDetail } from "../audits/auditSlice"
import Loader from "../../pages/generics/Loader";

export default function ContactDetailsPage({ contact, relatedData }) {
    const [activeTab, setActiveTab] = useState("details");
    const [loading, setLoading] = useState(true)
    const [owner, setOwner] = useState(null)
    const dispatch = useDispatch();
    const {
        recentActivity,
        instance,
        error,
        isError } = useSelector((state) => state.contact);

    const tabActions = {
        // tickets: getTickets(),
        // tasks: getTasks(),
        // opportunities: getOpportunities(),
        // campaigns: getCampaigns(),
        // audit: getAuditLog(),
    };

    useEffect(() => {
        console.log(contact)
        fetchOwner(contact.owner);
    }, [contact]);

    const handleTabChange = (value) => {
        setActiveTab(value)
        const action = tabActions[value];

        if (action) {
            console.log(instance)// Calls the corresponding function
        } else {
            console.log('Invalid tab');
        }
    };

    const fetchOwner = async (value) => {
        setLoading(true);
        const response = await dispatch(getInstanceDetail({
            app_label: 'authentication',
            model_name: 'User',
            object_id: value
        }));
        console.log(response)
        setOwner(response.payload.data); // Assuming `payload` has the owner data
        setLoading(false);
    };

    return (
        <div className="container mx-auto my-6 p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{contact.full_name} - {contact.title}</h1>
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

                        {loading ? (
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
                                    <span>Owner: {owner ? `${owner.first_name} ${owner.last_name}` : 'N/A'}</span>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <CardTitle className="text-sm font-medium text-gray-700">Open Tickets</CardTitle>
                                        <p className="text-lg font-semibold text-gray-900">1</p>
                                    </Card>
                                    <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <CardTitle className="text-sm font-medium text-gray-700">Total Tickets Logged</CardTitle>
                                        <p className="text-lg font-semibold text-gray-900">10</p>
                                    </Card>
                                    <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <CardTitle className="text-sm font-medium text-gray-700">Open Opportunities</CardTitle>
                                        <p className="text-lg font-semibold text-gray-900">10</p>
                                    </Card>
                                    <Card className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                        <CardTitle className="text-sm font-medium text-gray-700">Upcoming Campaigns</CardTitle>
                                        <p className="text-lg font-semibold text-gray-900">10</p>
                                    </Card>
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
                    <RelatedItemsList title="Related Tickets" items={contact} />
                </TabsContent>

                <TabsContent value="opportunities">
                    <RelatedItemsList title="Related Opportunities" items={contact} />
                </TabsContent>

                <TabsContent value="campaigns">
                    <RelatedItemsList title="Related Campaigns" items={contact} />
                </TabsContent>

                <TabsContent value="audit">
                    <AuditLog items={[{ item1: "Item" }, { item2: "Item2" }]} />
                </TabsContent>
            </Tabs>
        </div>
    );
}


function RelatedItemsList({ title, items }) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            {items.length > 0 ? (
                items.map((item) => (
                    <Card key={item.id} className="p-4 bg-white shadow-md rounded-lg">
                        <p className="text-sm text-gray-800">{item.description}</p>
                    </Card>
                ))
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
