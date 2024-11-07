import { useState } from 'react';
import { tasks } from '../../pages/static/tasks';
import { Card, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime, capitalizeFirstLetter } from "../../lib/utils";

const KanbanBoard = () => {
    const [filter, setFilter] = useState('priority');
    const [taskType, setTaskType] = useState('open');

    const filteredTasks = tasks
        .filter(task => {
            if (taskType === 'open') {
                return task.status !== 'cancelled' && task.status !== 'completed' && task.status !== 'closed';
            }
            return true;
        })
        .sort((a, b) => {
            if (filter === 'priority') {
                return a.priority.localeCompare(b.priority);  // Assuming priority is a string (e.g., "p1", "p2")
            } else if (filter === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });

    const columns = [
        {
            key: "new",
            value: "New",
            view: "status",
            type: "open"
        },
        {
            key: "in-progress",
            value: "In Progress",
            view: "status",
            type: "open"
        },
        {
            key: "assigned",
            value: "Assigned",
            view: "status",
            type: "open"
        },
        {
            key: "completed",
            value: "Completed",
            view: "status",
            type: "all"
        },
        {
            key: "cancelled",
            value: "Cancelled",
            view: "status",
            type: "all"
        },
        {
            key: "p1",
            value: "Priority 1",
            view: "priority",
            type: "all"
        },
        {
            key: "p2",
            value: "Priority 2",
            view: "priority",
            type: "all"
        },
        {
            key: "p3",
            value: "Priority 3",
            view: "priority",
            type: "all"
        },
        {
            key: "p4",
            value: "Priority 4",
            view: "priority",
            type: "all"
        },
    ];

    const filteredColumns = () => {
        if (taskType === "open" && filter === "status") {
            return columns.filter(column => column.type === 'open' && column.view === 'status');
        } else if (taskType === 'all' && filter === 'status') {
            return columns.filter(column => column.view === 'status');
        } else if (taskType === 'all' && filter === 'priority') {
            return columns.filter(column => column.view === 'priority');
        } else if (taskType === 'open' && filter === 'priority') {
            return columns.filter(column => column.view === 'priority');
        }
        return columns; // Default return if no conditions match
    };

    const priorityText = {
        p4: 'Priority 4',
        p3: 'Priority 3',
        p2: 'Priority 2',
        p1: 'Priority 1',
    };

    return (
        <div className="kanban-board">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <button
                        onClick={() => setTaskType('open')}
                        className={`btn p-2 rounded-l-md w-32 ${taskType === 'open' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Open Tasks
                    </button>
                    <button
                        onClick={() => setTaskType('all')}
                        className={`btn p-2 rounded-r-md w-32 ${taskType === 'all' ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        All Tasks
                    </button>
                </div>
                <div className="flex items-center">
                    <label className="mr-2 font-medium text-gray-700">Sort by:</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border rounded-md bg-white shadow-sm"
                    >
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-row w-full overflow-y-auto gap-4">
                {filteredColumns().map((column) => (
                    <div key={column.key} className="flex flex-col px-4 w-auto min-w-[300px] max-w-[40%] rounded-lg h-[68vh] overflow-auto relative">
                        <h2 className="text-lg font-semibold sticky top-0 bg-white w-full text-center py-2 text-indigo-700 mb-4">{column.value}</h2>
                        <div className="space-y-4">
                            {filteredTasks
                                .filter(task => filter === "priority" ? task.priority === column.key : task.status === column.key)
                                .map(task => (
                                    <Card key={task.id} className="p-4 bg-white shadow-sm rounded-sm hover:shadow-md border border-gray-200">
                                        <CardTitle className="text-md font-semibold text-gray-800">{task.title}</CardTitle>
                                        <p className="text-xs text-gray-500">Due: {formatDate(new Date(task.due_date))} {formatTime(new Date(task.due_date))}</p>
                                        <p className="text-sm text-gray-900">Status: {capitalizeFirstLetter(task.status)}</p>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${task.priority === 'p1' ? 'bg-red-500 text-white' :
                                                task.priority === 'p2' ? 'bg-yellow-500 text-white' :
                                                    task.priority === 'p3' ? 'bg-blue-500 text-white' :
                                                        'bg-green-500 text-white'
                                                }`}
                                        >
                                            {priorityText[task.priority] || 'No Priority'}
                                        </span>
                                    </Card>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default KanbanBoard;
