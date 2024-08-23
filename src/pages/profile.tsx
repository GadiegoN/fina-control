import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { AuthContext } from "@/context/auth-context"
import { db } from "@/services/firebase-connection"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { User } from "lucide-react"
import { useContext, useEffect, useState } from "react"

interface UserProps {
    id: string
    name: string
    email: string
    role: string
}

export function Profile() {
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState<UserProps[]>([])

    useEffect(() => {
        if (!user) return

        const userRef = collection(db, 'users')
        const queryRef = query(userRef, where('uid', '==', user.uid))

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const listUser = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                role: doc.data().role
            }))

            setUsers(listUser)
        })

        return () => unsubscribe()
    }, [user])

    return (
        <section>
            {users.map((item) => (
                <Card key={item.id} className="w-11/12 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center gap-4 py-6">
                        <div className="size-20 bg-background border border-primary rounded-full flex justify-center items-center">
                            <User className="size-12" />
                        </div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.email}</CardDescription>
                    </div>
                </Card>
            ))}
        </section>
    )
}