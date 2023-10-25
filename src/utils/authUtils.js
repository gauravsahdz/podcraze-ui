export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    return !!token; // Return true if the user is logged in, false otherwise
};

export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('podcrazeUser'));
    return user && user.role === 'admin';
}

export const isModerator = () => {
    const user = JSON.parse(localStorage.getItem('podcrazeUser'));
    return user && user.role === 'moderator';
}

export const isUser = () => {
    const user = JSON.parse(localStorage.getItem('podcrazeUser'));
    return user && user.role === 'user';
}

export const user = () => {
    const user = JSON.parse(localStorage.getItem('podcrazeUser'));
    return user;
}