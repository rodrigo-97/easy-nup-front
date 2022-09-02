import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ContextProps = {
    isAuthenticated: boolean,
    setToken: Function
    setIsAuthenticated: Function
}

type Props = {
    children: ReactElement
}

const AuthContext = createContext({} as ContextProps)

export function AuthProvider({ children }: Props) {

    const [token, setToken] = useState(localStorage.getItem("APP_TOKEN") ?? '')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const localStorageToken = localStorage.getItem("APP_TOKEN")
        setToken(localStorageToken ?? '')

        console.log(localStorageToken)

        if (token) {
            setIsAuthenticated(true)
        } else {
            console.log("desgraça")
            navigate('/')
        }
    }, [])

    console.log(token)

    return (
        <AuthContext.Provider value={{ isAuthenticated, setToken, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}