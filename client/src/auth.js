import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: session => session?.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('/auth/update-token', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.refreshToken}`,
            },
        }).then(r => r.json()),
        defaultSession: "eji",
});
