import React, { useState, useEffect, useMemo } from 'react';
import { tasks } from "./static/tasks"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardTitle } from "@/components/ui/card";
import { Bird, ListCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { capitalizeFirstLetter, formatDate, formatTime } from '../lib/utils';
import { useSelector } from 'react-redux';


const countTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status).length;

const countTasksDueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => task.due_date?.startsWith(today)).length;
};

const countOverdueTasks = () => {
    const today = new Date();
    return tasks.filter((task) => new Date(task.due_date) < today).length;
};

const countUpcomingTasks = () => {
    const today = new Date();
    return tasks.filter(
        (task) => new Date(task.due_date) > today && task.status !== "completed"
    ).length;
};

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const greeting = `Good ${currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}, ${user.first_name}!`;

    const COLORS_PRIORITY = ['#FF4B4B', '#FF9F40', '#00C49F', '#4FAAFF'];
    const COLORS_STATUS = ['#6366F1', '#22C55E', '#FDBA74', '#94A3B8'];


    // Memoize counts to prevent unnecessary recalculations
    const taskCounts = useMemo(() => ({
        openTasks: countTasksByStatus("new") + countTasksByStatus("in-progress"),
        dueToday: countTasksDueToday(),
        overdue: countOverdueTasks(),
        upcoming: countUpcomingTasks(),
    }), []);

    // Styling helper function
    const cardStyles = (count, color) => ({
        backgroundColor: count > 0 ? color : 'bg-transparent',
        textColor: count > 0 ? 'text-white' : 'text-indigo-700',
        borderColor: count > 0 ? 'border-transparent' : 'border-indigo-700',
    });

    // Data for the donut charts
    const priorityData = [
        { name: 'Priority 1', value: tasks.filter(task => task.priority === 'p1').length },
        { name: 'Priority 2', value: tasks.filter(task => task.priority === 'p2').length },
        { name: 'Priority 3', value: tasks.filter(task => task.priority === 'p3').length },
        { name: 'Priority 4', value: tasks.filter(task => task.priority === 'p4').length },
    ];

    const statusData = [
        { name: 'In Progress', value: tasks.filter(task => task.status === 'in-progress').length },
        { name: 'New', value: tasks.filter(task => task.status === 'new').length },
        { name: 'Assigned', value: tasks.filter(task => task.status === 'assigned').length },
    ];

    const [isPriorityChart, setIsPriorityChart] = useState(true);

    const handleToggleChart = () => {
        setIsPriorityChart(!isPriorityChart);
    };

    const filteredTasks = (tasks) => {
        const data = tasks.filter((task) => task.due_date?.startsWith(new Date().toISOString().split("T")[0]))
        return data

    }
    const chartData = isPriorityChart ? priorityData : statusData;
    const colors = isPriorityChart ? COLORS_PRIORITY : COLORS_STATUS;
    return (
        <div className="m-2">
            {/* Greeting Section */}
            <div className="shadow-sm p-4 -m-6 flex flex-row-reverse justify-between items-center">
                <h1 className="text-4xl text-right font-bold">{greeting} </h1>
                <div className='flex'>
                    <Avatar className='mx-3 w-20 h-20 text-4xl text-white'>
                        <AvatarFallback className='bg-blue-600'>{capitalizeFirstLetter(user.first_name).charAt(0)}{capitalizeFirstLetter(user.last_name).charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className="text-xl font-bold "> <span className='underline-offset-1'>{user.email}</span></h1>
                        <h1 className="text-xs font-bold ">{user.role} </h1>
                        <p className="text-sm mt-2">{currentTime.toLocaleDateString()}, {currentTime.toLocaleTimeString()}</p>
                    </div>
                </div>

            </div>

            <div className="flex flex-col mt-10 lg:flex-row gap-6">
                {/* Left Panel: Open Tasks */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[75vh] relative">
                    <h2 className="text-xl bg-white w-full font-semibold mb-4">Today's Open Tasks</h2>
                    {filteredTasks(tasks).length > 0 ? (
                        <ul className="space-y-4 mt-8">
                            {filteredTasks(tasks).map((task) => (
                                <li
                                    key={task.num_id}
                                    className="relative p-3 rounded-sm bg-white shadow-sm flex items-center hover:shadow-md cursor-pointer"
                                >
                                    <span
                                        className={`absolute left-0 top-0 h-full w-[15px] rounded-l-sm ${task.priority === 'p1' ? 'bg-red-500' : task.priority === 'p2' ? 'bg-orange-500' : task.priority === 'p3' ? 'bg-blue-500' : 'bg-green-500'}`}
                                    ></span>
                                    <div className="pl-4">
                                        <p className="font-bold">{task.title}</p>
                                        <p className="text-gray-900 text-xs">({capitalizeFirstLetter(task.subject)})</p>
                                        <p className='text-sm'>{task.comments}</p>
                                    </div>
                                    <div className='ml-auto'>
                                        <p className='text-xs'>Start: {formatDate(new Date(task.start_date))} <span className='ml-2'>{formatTime(new Date(task.start_date))}</span></p>
                                        <p className='text-xs'>Due: {formatDate(new Date(task.due_date))} <span className='ml-2'>{formatTime(new Date(task.due_date))}</span></p>
                                        <p>{capitalizeFirstLetter(task.status)}</p>
                                    </div>

                                </li>
                            ))}

                        </ul>
                    ) : (
                        <div className="flex flex-col items-center text-center py-12 space-y-4">
                            <div className="text-4xl text-gray-600"><Bird className='w-24 h-24' /></div>
                            <p className="text-gray-600 text-3xl font-semibold">Woo-hoo! No tasks for today!</p>
                            <p className="text-gray-500">Your schedule is wide open. Enjoy the freedom!</p>
                        </div>
                    )}
                </div>

                {/* Right Panel: Quick Actions & Daily Summary */}
                <div className="flex flex-col gap-6 w-full lg:w-1/3">
                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Open Tasks */}
                            <Card
                                className={`flex flex-col items-start p-4 rounded-lg shadow-sm border ${cardStyles(taskCounts.openTasks, 'bg-indigo-700').backgroundColor} ${cardStyles(taskCounts.openTasks, 'bg-indigo-700').borderColor}`}
                            >
                                <CardTitle className={`text-sm font-medium ${cardStyles(taskCounts.openTasks, 'bg-indigo-700').textColor}`}>
                                    Open Tasks
                                </CardTitle>
                                <p className={`text-lg font-semibold ${taskCounts.openTasks > 0 ? 'text-gray-50' : 'text-indigo-700'}`}>{taskCounts.openTasks}</p>
                            </Card>

                            {/* Due Today */}
                            <Card
                                className={`flex flex-col items-start p-4 rounded-lg shadow-sm border ${cardStyles(taskCounts.dueToday, 'bg-orange-500').backgroundColor} ${cardStyles(taskCounts.dueToday, 'bg-orange-500').borderColor}`}
                            >
                                <CardTitle className={`text-sm font-medium ${cardStyles(taskCounts.dueToday, 'bg-orange-500').textColor}`}>
                                    Due Today
                                </CardTitle>
                                <p className={`text-lg font-semibold ${taskCounts.dueToday > 0 ? 'text-gray-50' : 'text-indigo-700'}`}>{taskCounts.dueToday}</p>
                            </Card>

                            {/* Overdue */}
                            <Card
                                className={`flex flex-col items-start p-4 rounded-lg shadow-sm border ${cardStyles(taskCounts.overdue, 'bg-red-600').backgroundColor} ${cardStyles(taskCounts.overdue, 'bg-red-600').borderColor}`}
                            >
                                <CardTitle className={`text-sm font-medium ${cardStyles(taskCounts.overdue, 'bg-red-600').textColor}`}>
                                    Overdue
                                </CardTitle>
                                <p className={`text-lg font-semibold ${taskCounts.overdue > 0 ? 'text-gray-50' : 'text-indigo-700'}`}>{taskCounts.overdue}</p>
                            </Card>

                            {/* Upcoming */}
                            <Card
                                className={`flex flex-col items-start p-4 rounded-lg shadow-sm border ${cardStyles(taskCounts.upcoming, 'bg-green-700').backgroundColor} ${cardStyles(taskCounts.upcoming, 'bg-green-500').borderColor}`}
                            >
                                <CardTitle className={`text-sm font-medium ${cardStyles(taskCounts.upcoming, 'bg-green-700').textColor}`}>
                                    Upcoming
                                </CardTitle>
                                <p className={`text-lg font-semibold ${taskCounts.upcoming > 0 ? 'text-gray-50' : 'text-indigo-700'}`}>{taskCounts.upcoming}</p>
                            </Card>
                        </div>
                    </div>

                    {/* Daily Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md h-2/3">
                        <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
                        {tasks.length > 0 ? (
                            <div className="">
                                <button
                                    onClick={handleToggleChart}
                                    className={`mb-4 px-2 py-2 ${!isPriorityChart ? "bg-red-600" : "bg-indigo-600"} text-white rounded-md  ${!isPriorityChart ? "hover:bg-red-500" : "hover:bg-indigo-500"} transition-all duration-75`}
                                >
                                    {isPriorityChart ? 'Tasks by Status' : 'Tasks by Priority'}
                                </button>

                                <PieChart width={400} height={200}>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        fill="#8884d8"

                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                                </PieChart>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center py-12 space-y-4">
                                <div className="text-4xl"><ListCheck className='w-24 h-24' /></div>
                                <p className="text-gray-600 text-3xl font-semibold">Seems Like you are free!</p>
                                <p className="text-gray-500">Plan Something?</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
