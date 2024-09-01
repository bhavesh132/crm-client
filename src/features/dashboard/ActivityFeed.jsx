import React from 'react'
import { FileBox, Tag } from 'lucide-react'

const ActivityFeed = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <div className="mr-4">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <FileBox className="text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">New Task Created</p>
                        <p className="text-sm text-gray-600">You created a task "Design new UI for dashboard."</p>

                    </div>
                </li>
                <li className="flex items-start">
                    <div className="mr-4">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                            <Tag className="text-white" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Ticket Resolved</p>
                        <p className="text-sm text-gray-600">Ticket #12345 was resolved by John Doe.</p>
                    </div>
                </li>
                {/* Add more activities as needed */}
            </ul>
        </div>
    )
}

export default ActivityFeed