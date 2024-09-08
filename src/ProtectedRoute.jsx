import React from 'react';

import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = () => {
        const auth_token = Cookies.get('auth_token')
        const token = localStorage.getItem('token')
        const resolved_token = JSON.parse(token)
        if (resolved_token === auth_token) {
            return true
        } else {

            Cookies.remove('auth-token')
            return false
        }

    };

    return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;