import axios from 'axios';

const setLoggedInUserAction = (user) => {
    
    return {type: 'SET_LOGGED_IN_USER', payload: user}
}

const startGetLoggedInUserAction = () => {

    return (dispatch) => {
        axios.get(`http://localhost:3035/user`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
        .then(response => {
            console.log(response);
            dispatch(setLoggedInUserAction(response.data));
        })
    }
}

export {setLoggedInUserAction, startGetLoggedInUserAction};