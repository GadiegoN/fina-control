import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebase-connection";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const schema = z.object({
    email: z.string().email("Insira uma e-mail válido").min(1, "O campo email é obrigatório!"),
    password: z.string().min(6, "O campo senha precisa ter no mínimo 6 caracteres!")
})

type FormData = z.infer<typeof schema>

export function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const navigate = useNavigate()

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    function handleSignIn(data: FormData) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate('/dashboard', { replace: true })
            })
            .catch((err) => {
                console.log('Erro signin: ', err)
            })
    }

    return (
        <section className="flex flex-col gap-10 items-center justify-between w-11/12 max-w-7xl mx-auto">
            <Card className="w-full md:w-6/12 mt-32">
                <CardHeader>
                    <CardTitle>Fazer login</CardTitle>
                    <CardDescription>Entre e gerencie suas finanças</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                placeholder="Digite seu e-mail"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                placeholder="Digite sua senha"
                                {...register('password')}
                                type="password"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full">Acessar conta</Button>

                    </form>
                    <div className="flex items-center">
                        <div className="h-1 border-b border-primary w-full" />
                        <p className="border-t rounded-full p-2 border-primary hover:bg-muted">ou</p>
                        <div className="h-1 border-b border-primary w-full" />
                    </div>
                    <Button type="button" className="w-full" variant="ghost">Criar conta</Button>
                </CardContent>
            </Card>
        </section>
    )
}