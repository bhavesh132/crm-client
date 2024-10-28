import React from "react";

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-1 border-4 border-t-transparent border-blue-300 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 border-4 border-t-transparent border-blue-200 rounded-full animate-spin"></div>
            </div>
            <div className="flex flex-col justify-center text-center">
                <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                    Loading...
                </p>

                {/* Fun Footer */}
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                    Hang tight! Even the best things take a moment...
                </p>
            </div>
        </div>
    );
};

export default Loader;