import React from 'react';
import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}

export const ProtectRoute = ({ children }) => {
    const username = localStorage.getItem("username");
    if (!username) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}