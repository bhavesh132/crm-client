import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle, Card } from '../../components/ui/card';

import { XCircle } from 'lucide-react';
function ErrorPage() {
    return (
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <Card className="w-full p-6 items-center justify-center flex flex-col border-collapse border-none outline-none shadow-none">
        //         <CardTitle className="text-center text-5xl px-6 py-6 font-bold text-red-500">
        //             Something Went Wrong
        //         </CardTitle>
        //         <CardDescription className="text-center text-gray-500">
        //             We apologize for the inconvenience. Please try again later or contact our support team.
        //         </CardDescription>
        //         <Button className="mx-4 my-12">
        //             Take me home
        //         </Button>
        //     </Card>
        // </div>

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Error Icon */}
            <XCircle className="h-20 w-20 text-red-500 mb-4" />

            {/* Error Title */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We're having trouble loading the page. Please try again later.
            </p>

            {/* Button to Retry */}
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
            >
                Try Again
            </button>

            {/* Fun Footer Message */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                It’s not you, it’s us. We’ll get this fixed soon.
            </p>
        </div>
    );
}

export default ErrorPage;