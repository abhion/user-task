const authenticateReducer = (authenticated = false, action) => {
    
    switch (action.type) {
        case 'SET_AUTHENTICATION_STATUS_TRUE':
            return true;
        case 'SET_AUTHENTICATION_STATUS_FALSE':
            localStorage.removeItem('logout-time');
            localStorage.removeItem('x-auth');
            return false;
    
        default:
            return authenticated;
    }
}

export default authenticateReducer;