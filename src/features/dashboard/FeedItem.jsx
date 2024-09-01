import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const FeedItem = () => {
    return (
        <Card className="flex w-96 mr-12 mb-4 cursor-pointer items-center space-x-2 p-2 h-fit bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            {/* Image */}
            <img src="Static" alt="" className="w-10 h-10 rounded object-cover" />

            <div className="flex-1">
                {/* Title */}
                <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-200 text-sm -m-2 ml-0 font-semibold">
                        Heading for the Feed Item
                    </CardTitle>
                </CardHeader>

                {/* Description */}
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-xs -m-3 ml-0">
                        This is a brief Description of the feed item that is titled above
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}

export default FeedItem

