const setAuthenticationStatusTrueAction = () => {
    return {type: 'SET_AUTHENTICATION_STATUS_TRUE'}
}
const setAuthenticationStatusFalseAction = () => {
    return {type: 'SET_AUTHENTICATION_STATUS_FALSE'}
}

export {setAuthenticationStatusFalseAction, setAuthenticationStatusTrueAction};