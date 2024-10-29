import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
import Alert from '@/components/ui/Alert'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(null); // State to hold the alert details

    const { loading, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setAlert({
                type: 'warning',
                message: `Username or Password cannot be blank`
            })
        } else {
            let userCredentials = {
                username, password
            }
            dispatch(loginUser(userCredentials)).then((result) => {
                // console.log(result)
                if (result.payload) {
                    setAlert({
                        type: 'success',
                        message: `Login Successful!`
                    })
                    navigate('/')
                    window.location.reload(true);
                } if (result.error) {
                    setAlert({
                        type: 'error',
                        message: `Login failed! ${result.error}`
                    })
                }
            })
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Hero Section with Pure CSS Background */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between py-10 px-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 opacity-100"></div>
                <div className="absolute inset-0 flex flex-col justify-center text-white px-10 z-10 space-y-8">
                    <h1 className="text-4xl font-bold">BrightPath CRM</h1>
                    <p className="text-lg max-w-sm">
                        Empower your team, streamline workflows, and manage client relationships efficiently.
                    </p>
                    <ul className="space-y-3 text-base text-left max-w-xs">
                        <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2" /> Seamless Communication</li>
                        <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2" /> Intelligent Analytics</li>
                        <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 mr-2" /> Intuitive Interface</li>
                    </ul>
                </div>

                {/* Additional Footer Text for Hero Section */}
                <div className="absolute bottom-12 left-10 text-white text-sm z-10">
                    <p className="font-semibold">Join us in transforming client management. BrightPath: where simplicity meets excellence.</p>
                    <p className="mt-1 text-gray-200">Start your journey with us today and see the difference.</p>
                </div>

                {/* New CSS Shapes and Patterns */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 right-16 w-48 h-48 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 rounded-full filter blur-2xl opacity-60"></div>
                    <div className="absolute bottom-20 left-24 w-64 h-64 bg-gradient-to-tl from-purple-300 to-pink-300 rounded-full filter blur-3xl opacity-50"></div>
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400 via-purple-400 to-transparent rounded-full filter blur-2xl opacity-40"></div>
                </div>
            </div>

            {/* Login Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onActionClick={() => setAlert(null)} // Close the alert when action button is clicked
                    />
                )}
                <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <form onSubmit={handleLogin}>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
                                Welcome to BrightPath
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
                                    Username
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter your Username"
                                    className="w-full"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-bold rounded-lg transition duration-300"
                                onClick={handleLogin}
                            >
                                {loading ? 'Loading' : "Log In"}
                            </Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
