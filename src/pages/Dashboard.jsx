import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileBox, ShoppingCart, Tag, Calendar } from 'lucide-react';
import ActivityFeed from '../features/dashboard/ActivityFeed';
import DonutChart from "@/components/ui/DonutChart"
import FeedItem from '../features/dashboard/FeedItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData, getTotalData } from '../features/dashboard/dashboardSlice';

const Dashboard = () => {
    const dispatch = useDispatch()
    const { data, loading, error, totalData } = useSelector((state) => state.dashboard);
    useEffect(() => {
        // Dispatch the action to load dashboard data when component mounts
        dispatch(getDashboardData());
        dispatch(getTotalData())
    }, [dispatch]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;
    if (data && totalData) {

        const transformData = (data) => {
            return Object.entries(data).map(([key, value]) => ({
                name: key,
                value
            }));
        }
        const dashboardData = [
            {
                title: 'Tasks',
                icon: <FileBox className="text-blue-500 dark:text-blue-300" />,
                data: transformData(data.tasks),
                totalData: totalData.tasks,
                footerText: `Sample Footer Text`,
                footerText1: `Another Sample for Footer Text`,
                style: `bg-blue-100 dark:bg-blue-900`
            },
            {
                title: 'Tickets',
                icon: <Tag className="text-red-500 dark:text-red-300" />,
                data: transformData(data.tickets),
                totalData: totalData.tickets,
                footerText: `Sample Footer Text`,
                footerText1: `Another Sample for Footer Text`,
                style: "bg-red-100 dark:bg-red-900"
            },
            {
                title: 'Opportunities',
                icon: <ShoppingCart className="text-yellow-500 dark:text-yellow-300" />,
                data: transformData(data.opportunities),
                totalData: totalData.opportunities,
                footerText: `Sample Footer Text`,
                footerText1: `Another Sample for Footer Text`,
                style: `bg-yellow-100 dark:bg-yellow-800`
            },
            {
                title: 'Campaigns',
                icon: <Calendar className="text-purple-500 dark:text-purple-300" />,
                data: transformData(data.campaigns),
                totalData: totalData.campaigns,
                footerText: `Sample Footer Text`,
                footerText1: `Another Sample for Footer Text`,
                style: `bg-purple-100 dark:bg-purple-900`
            }
        ]

        return (
            <>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Tasks Due Today */}

                    {dashboardData.map(({ title, icon, data, footerText, footerText1, style }) => {
                        return (
                            <Card className={style}>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                                        {icon}
                                        <span>{title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DonutChart data={data} totalData={totalData} title={title} />
                                </CardContent>
                                <CardFooter className="flex-col gap-1 mt-4 text-sm">
                                    <div className="flex items-center gap-2 font-medium leading-none">
                                        {footerText}
                                    </div>
                                    <div className="leading-none text-muted-foreground">
                                        {footerText1}
                                    </div>
                                </CardFooter>
                            </Card>)
                    })}
                </div >
                <div className='flex flex-row flex-wrap w-full mt-2'>
                    <div className="w-2/3 mr-12 min-h-80">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">News Feed</h2>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full max-h-96 overflow-y-auto flex flex-wrap">
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                            <FeedItem />
                        </div>
                    </div >
                    <div className="w-1/4 min-h-80">
                        <ActivityFeed />
                    </div>
                </div>
            </>
        );
    }
};

export default Dashboard;