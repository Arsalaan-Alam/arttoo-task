'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit'

type AuthContextType = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children}: { children: ReactNode }) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const router = useRouter();
    const account = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt-sui');
        if (storedToken) {
            setTokenState(storedToken);
        }
    }, []);

    useEffect(() => {
		if (!account && tokenState) {
			logout();
		}
	}, [account]);

    const setToken = (newToken: string) => {
        localStorage.setItem('jwt-sui', newToken);
        setTokenState(newToken);
    }

    const logout = () => {
        localStorage.removeItem('jwt-sui');
        setTokenState(null);
        disconnect();
        router.push('/');
    }

    const isAuthenticated = !!tokenState;

    return (
        <AuthContext.Provider value = {{ token: tokenState, setToken, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}