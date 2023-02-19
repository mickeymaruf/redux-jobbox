import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashboardHomeRedirect = () => {
    const { role } = useSelector(state => state.auth.user);

    if(role === "employer"){
        return <Navigate to="posted-job" />
    }
    
    return <Navigate to="applied-job" />
};

export default DashboardHomeRedirect;