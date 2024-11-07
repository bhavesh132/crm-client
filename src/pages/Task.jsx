import { useState } from 'react';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import KanbanBoard from '../features/tasks/KanbanBoard';
import ListTable from '../features/tasks/ListTable'
import TaskCalendar from '../features/tasks/TaskCalendar';

const Task = () => {
    const [view, setView] = useState('kanban');

    return (
        <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-indigo-700">Tasks</h1>
            </div>

            <Tabs defaultValue="kanban">
                <TabsList className="space-x-4">
                    <TabsTrigger value="kanban" onClick={() => setView('kanban')}>Kanban View</TabsTrigger>
                    <TabsTrigger value="list" onClick={() => setView('list')}>List View</TabsTrigger>
                    <TabsTrigger value="calendar" onClick={() => setView('calendar')}>Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value="kanban">
                    <KanbanBoard />
                </TabsContent>

                <TabsContent value="list">
                    <ListTable />
                </TabsContent>

                <TabsContent value="calendar">
                    <TaskCalendar />
                </TabsContent>
            </Tabs>
        </div>
    );
}


export default Task