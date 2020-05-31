const userReducer = (user = {}, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return user;
    
        default:
            return user
    }
}

export default userReducer;