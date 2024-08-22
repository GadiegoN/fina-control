import { auth } from "@/services/firebase-connection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: ReactNode
}
interface UserProps {
    uid: string
    name: string | null
    email: string | null
}

type AuthContextData = {
    signed: boolean
    loadingAuth: boolean
    handleInfoUser: ({ email, name, uid }: UserProps) => void
    user: UserProps | null
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const onsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })

                setLoadingAuth(false)
            } else {
                setUser(null)
                setLoadingAuth(false)
            }
        })

        return () => {
            onsub()
        }
    }, [])

    function handleInfoUser({ email, name, uid }: UserProps) {
        setUser({
            name, email, uid
        })
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            loadingAuth,
            handleInfoUser,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider