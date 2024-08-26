import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileBox, ShoppingCart, Tag, Calendar } from 'lucide-react';
import ActivityFeed from '../features/ActivityFeed';
import DonutChart from "@/components/ui/DonutChart"
const Dashboard = () => {
    return (
        <>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Tasks Due Today */}
                <Card className="bg-blue-100 dark:bg-blue-900">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <FileBox className="text-blue-500 dark:text-blue-300" />
                            <span>Tasks</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart />
                    </CardContent>
                    <CardFooter className="flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                {/* Card 2: Critical Tasks */}
                <Card className="bg-red-100 dark:bg-red-900">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <Tag className="text-red-500 dark:text-red-300" />
                            <span>Tickets</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart />
                    </CardContent>
                    <CardFooter className="flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                {/* Card 3: Tickets Due Today */}
                <Card className="bg-yellow-100 dark:bg-yellow-800">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <ShoppingCart className="text-yellow-500 dark:text-yellow-300" />
                            <span>Opportunities</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart />
                    </CardContent>
                    <CardFooter className="flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                {/* Card 4: Overdue Tickets */}
                <Card className="bg-purple-100 dark:bg-purple-900">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <Calendar className="text-purple-500 dark:text-purple-300" />
                            <span>Campaigns</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart />
                    </CardContent>
                    <CardFooter className="flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className='flex flex-row flex-wrap w-full mt-2'>
                <div className="w-2/3 min-w-96 mr-28">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Performance Overview</h2>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        {/* Insert your chart component here, ensuring it adapts to theme colors */}
                    </div>
                </div >
                <div className=" w-1/4">
                    <ActivityFeed />
                </div>
            </div>
        </>
    );
};

export default Dashboard;