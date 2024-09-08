import React, { useState, useEffect } from 'react'
import {
    Tag,
    ShoppingCart,
    LayoutList,
    Building2,
    CalendarClock,
    BookUser,
    Ticket,
    FileBox,
} from "lucide-react"
import { axiosInstance } from '../../lib/utils';

const ActivityFeed = ({ data }) => {
    const getLogIcon = (model) => {
        switch (model) {
            case 'Contact':
                return <div className="h-8 w-8 rounded-full bg-violet-700 flex items-center justify-center"><BookUser className="h-4 text-gray-50 w-4" /></div>;
            case 'Company':
                return <div className="h-8 w-8 rounded-full bg-yellow-600 flex items-center justify-center"><Building2 className="text-gray-50 h-4 w-4" /></div>;
            case 'Ticket':
                return <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center"><Ticket className="text-gray-50 h-4 w-4" /></div>;
            case 'Task':
                return <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center"><LayoutList className="text-gray-50 h-4 w-4" /></div>;
            case 'Opportunity':
                return <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center"><ShoppingCart className="text-gray-50 h-4 w-4" /></div>;
            case 'Campaign':
                return <div className="h-8 w-8 rounded-full bg-red-700 flex items-center justify-center"><CalendarClock className="text-gray-50 h-4 w-4" /></div>;
            default:
                return <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center"><FileBox className="text-gray-50 h-4 w-4" /></div>;
        }
    }

    const modelField = {}

    const getlogData = (app_label, model_name, object_id) => {
        const [instanceDetails, setInstanceDetails] = useState(null);
        useEffect(() => {
            const fetchInstanceDetails = async () => {
                try {
                    const response = await axiosInstance.get(`auth/instance-detail/${app_label}/${model_name}/${object_id}/`);
                    setInstanceDetails(response.data.data);
                } catch (error) {
                    console.error('Error fetching instance details:', error.message);
                }
            };
            fetchInstanceDetails();
        }, [data]);

        return instanceDetails
    }


    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
                {data.slice(0, 6).map((logValue) => {
                    const changes = JSON.parse(logValue.changes)
                    const user = getlogData('authentication', 'User', logValue.user)
                    const get_name = () => {
                        try {
                            if (logValue.model_name === 'Company') {
                                const company_name = getlogData('customer', 'Company', logValue.object_id).name
                                return company_name
                            } else if (logValue.model_name === 'Contact') {
                                const contact = getlogData('customer', 'Contact', logValue.object_id)
                                if (contact) {
                                    return contact.first_name
                                }
                            }
                        } catch (e) {
                            console.log(e)
                            return `${logValue.model_name} not found`
                        }
                    }

                    return (
                        <li key={logValue.id} className="flex items-start">
                            <div className="mr-4">
                                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                                    {getLogIcon(logValue.model_name)}
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold"> {logValue.model_name} {logValue.action}</p>
                                <p className="text-sm text-gray-600">
                                    {logValue.model_name}
                                    {(logValue.model_name === 'Ticket' || logValue.model_name === 'Task' || logValue.model_name === 'Opportunity' || logValue.model_name === 'Campaign') ?
                                        ' #' + logValue.object_id : ' ' + get_name()} was
                                    {' ' + logValue.action} by {user ? user.first_name : 'Unknown User'}.
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ActivityFeed