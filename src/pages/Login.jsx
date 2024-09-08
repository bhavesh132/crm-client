import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
                        message: `Login failed! Please check your Credentials and try again`
                    })
                }
            })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onActionClick={() => setAlert(null)} // Close the alert when action button is clicked
                />
            )}
            <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
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
                    <Button type='submit'
                        className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                        onClick={handleLogin}
                    >
                        {loading ? 'Loading' : "log In"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
