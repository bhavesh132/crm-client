import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TaskSheet = ({ task, isOpen, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleEditToggle = () => setIsEditing(prev => !prev);

    const handleComplete = () => {
        onUpdate({ ...task, status: 'completed' });
        onClose();
    };

    const handleDelete = () => {
        onDelete(task.id);
        onClose();
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    return (
        <Sheet isOpen={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{isEditing ? "Edit Task" : task.title}</SheetTitle>
                    <SheetDescription>{task.subject}</SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    {isEditing ? (
                        <div className="space-y-4">
                            <Input name="title" value={editedTask.title} onChange={handleInputChange} placeholder="Task Title" />
                            <Input name="subject" value={editedTask.subject} onChange={handleInputChange} placeholder="Subject" />
                            <Input name="comments" value={editedTask.comments} onChange={handleInputChange} placeholder="Comments" />
                            <Button onClick={handleSave} className="w-full mt-2 bg-green-600 text-white">Save Changes</Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p><strong>Status:</strong> {task.status}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Start Date:</strong> {new Date(task.start_date).toLocaleString()}</p>
                            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleString()}</p>
                            <p><strong>Comments:</strong> {task.comments}</p>
                        </div>
                    )}
                    <div className="flex gap-2 mt-4">
                        {!isEditing && (
                            <>
                                <Button onClick={handleEditToggle} className="w-full bg-blue-500 text-white">Edit</Button>
                                <Button onClick={handleComplete} className="w-full bg-green-500 text-white">Complete</Button>
                            </>
                        )}
                        <Button onClick={handleDelete} className="w-full bg-red-500 text-white">Delete</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default TaskSheet;

