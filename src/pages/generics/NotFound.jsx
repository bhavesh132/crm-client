
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-6">
            <AlertTriangle className="text-red-500 w-24 h-24 mb-6 animate-bounce" />
            <h1 className="text-7xl font-extrabold text-gray-700 mb-4">404</h1>
            <p className="text-2xl font-light text-gray-600 mb-4">Oops! This page is lost in space.</p>
            <p className="text-gray-500 max-w-md text-center mb-6">
                It seems you've traveled to a page that doesn't exist. Maybe it got sucked into a black hole?
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 transition duration-200"
            >
                Take Me Back Home
            </Link>
            <footer className="absolute bottom-4 text-sm text-gray-400 mt-8">
                <p>
                    "I used to have a web page here, but it 404-got away! <span className="italic">(404 ever lost in the void)</span>"
                </p>
            </footer>
        </div>
    );
};

export default NotFound;
