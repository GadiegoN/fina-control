import { AuthContext } from "@/context/auth-context"
import { useContext } from "react"

export function Home() {
    const { user } = useContext(AuthContext)
    return (
        <section className="flex flex-col gap-6 w-11/12 max-w-7xl mx-auto">
            <div className="flex justify-center items-center rounded-lg bg-muted-foreground text-background">
                <article className="w-full p-10 space-y-4">
                    <h1 className="text-2xl font-bold">Olá, {user && user.name?.concat('!')} <br />Bem vindx ao Fina-Control</h1>

                    <p className="text-justify">
                        Gerencie suas finanças de forma simples e eficiente.
                        Aqui você pode adicionar e monitorar suas transações e
                        acompanhar seu saldo.
                        Explore o dashboard para ter uma visão detalhada de suas
                        entradas e saídas. Estamos aqui para ajudar
                        você a alcançar suas metas financeiras!
                    </p>
                </article>
                <img src="/banner.png" className="hidden md:flex h-96 w-6/12 object-cover rounded-lg" />
            </div>
        </section>
    )
}