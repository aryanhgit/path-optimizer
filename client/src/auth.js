import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: session => session?.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('http://localhost:5000/auth/update-token', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.refreshToken}`,
            },
        }).then(r => r.json()),
        defaultSession: "eji",
});
