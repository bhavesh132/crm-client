import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { tasks } from '../../pages/static/tasks';
import TaskSheet from './TaskSheet';

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [taskList, setTaskList] = useState(tasks);

    // Function to handle event click
    const handleEventClick = (event) => {
        const task = taskList.find(t => t.id === event.id);
        console.log("Clicked event:", event);       // Check event data
        console.log("Selected task:", task);        // Check if task is found
        setSelectedTask(task);
        setIsSheetOpen(true);
        console.log("Is Sheet Open:", isSheetOpen);
    };

    // Handle updating task data
    const handleUpdateTask = (updatedTask) => {
        setTaskList(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    // Handle deleting a task
    const handleDeleteTask = (taskId) => {
        setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };


    const events = tasks.map(task => ({
        id: task.id,
        title: `${task.title}`,
        start: new Date(task.start_date),
        end: new Date(task.due_date),
        status: task.status,
        allDay: task.start_date === task.due_date ? true : false,  // You can adjust this based on your data
    }));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleEventClick}
            />

            {isSheetOpen && selectedTask && (
                <TaskSheet
                    task={selectedTask}
                    isOpen={isSheetOpen}
                    onClose={() => setIsSheetOpen(false)}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                />
            )}

        </div>
    );
};

export default TaskCalendar;
