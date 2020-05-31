import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({authenticated, component, path}){
    return (
        authenticated ? <Route path={path} component={component} /> : <Redirect to="/login" />
    );
}

export default ProtectedRoute;