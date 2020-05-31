const setTimeoutForLogout = (logoutFn) => {
    const logoutTime = localStorage.getItem('logout-time');
    const now = Date.now();

    setTimeout(() => {
        logoutFn();
    }, logoutTime - Date.now());
}

export default setTimeoutForLogout;