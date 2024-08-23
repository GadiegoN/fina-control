import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/services/firebase-connection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner"

const schemaSignUp = z.object({
    name: z.string().min(3, "O campo nome precisa conter pelo menos 3 caracteres!!"),
    email: z.string().email("Insira um e-mail válido").min(1, "O campo email é obrigatório!"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!!")
})

type FormData = z.infer<typeof schemaSignUp>

export function SignUp() {
    const { handleInfoUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schemaSignUp),
        mode: "onChange"
    })

    function handleSignUp(data: FormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, {
                    displayName: data.name
                });

                await setDoc(doc(db, 'users', user.user.uid), {
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid,
                    role: 'user'
                });

                handleInfoUser({
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid
                })

                toast.success("Conta criada com sucesso.")

                reset()
                navigate('/dashboard', { replace: true });
            })
            .catch((error) => {
                reset()
                toast.success("Erro ao criar conta. Tente novamente!")
                console.error('Erro ao criar usuário:', error);
            });
    }

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    return (
        <section className="flex flex-col gap-10 items-center justify-between w-11/12 max-w-7xl mx-auto">
            <Card className="w-full md:w-6/12 mt-32">
                <CardHeader>
                    <CardTitle>Crie sua conta</CardTitle>
                    <CardDescription>Para gerenciar suas financias de forma simples</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="create-name">Nome completo</Label>
                            <Input
                                id="create-name"
                                placeholder="Digite seu nome"
                                {...register('name')}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="create-email">E-mail</Label>
                            <Input
                                id="create-email"
                                placeholder="Digite seu e-mail"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="create-password">Senha</Label>
                            <Input
                                id="create-password"
                                placeholder="Digite sua senha"
                                {...register('password')}
                                type="password"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full">Criar conta</Button>
                    </form>
                    <div className="flex items-center">
                        <div className="h-1 border-b border-primary w-full" />
                        <p className="border-t rounded-full p-2 border-primary hover:bg-muted">ou</p>
                        <div className="h-1 border-b border-primary w-full" />
                    </div>
                    <Button type="button" className="w-full" variant="ghost">
                        <Link to="/sign-in">Faça login</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}