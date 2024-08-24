import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Pencil, Plus, Trash, X } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/services/firebase-connection";
import { AuthContext } from "@/context/auth-context";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TransactionProps {
    id: string;
    value: number;
    type: string;
    description: string;
    category: string;
    userUID: string;
    created: Date,
    updated: Date
}

const transactionSchema = z.object({
    value: z.number().min(0, { message: 'Valor deve ser maior que 0' }),
    description: z.string().min(1, { message: 'Descrição é obrigatória' }),
    category: z.string().min(1, { message: 'Categoria é obrigatória' }),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function Dashboard() {
    const { user } = useContext(AuthContext);
    const [selectType, setSelectType] = useState('income');
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false)
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
    });

    async function handleAddTransaction(data: TransactionFormData) {
        if (!user) return
        try {
            await addDoc(collection(db, 'transactions'), {
                value: data.value,
                type: selectType,
                description: data.description,
                category: data.category,
                userUID: user.uid,
                created: new Date()
            });

            reset();
        } catch (error) {
            console.error('Erro ao adicionar transação: ', error);
        }
    }

    async function handleUpdateTransaction(data: TransactionFormData) {
        if (!user || !selectedTransactionId) return;
        try {
            const transactionRef = doc(db, 'transactions', selectedTransactionId);

            await updateDoc(transactionRef, {
                value: data.value,
                type: selectType,
                description: data.description,
                category: data.category,
                updated: new Date(),
            });

            handleCloseEditTransaction()
            reset();
        } catch (error) {
            console.error('Erro ao atualizar transação: ', error);
        }
    }

    async function handleRemoveTransaction(id: string) {
        try {
            await deleteDoc(doc(db, 'transactions', id))
        } catch (error) {
            console.error('Erro ao remover transação: ', error);
        }
    }

    function handleEditTransaction(transaction: TransactionProps) {
        setIsOpenDialogEdit(true)
        setSelectedTransactionId(transaction.id);
        setValue('category', transaction.category)
        setValue('description', transaction.description)
        setValue('value', transaction.value)
        setSelectType(transaction.type)
    }

    function handleCloseEditTransaction() {
        setIsOpenDialogEdit(false)
        setSelectedTransactionId(null);
        setValue('category', '')
        setValue('description', '')
        setValue('value', 0)
        setSelectType('income')
    }

    useEffect(() => {
        if (!user) return;

        const transactionRef = collection(db, 'transactions');
        const queryRef = query(
            transactionRef,
            where('userUID', '==', user.uid),
            orderBy('created', 'desc')
        );

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const listTransaction = snapshot.docs.map(doc => ({
                id: doc.id,
                value: doc.data().value,
                type: doc.data().type,
                description: doc.data().description,
                category: doc.data().category,
                userUID: doc.data().userUID,
                created: doc.data().created.toDate(),
                updated: doc.data().updated.toDate()
            }));

            setTransactions(listTransaction);
        });

        return () => unsubscribe();
    }, [user]);

    const totalEntradas = transactions.reduce((acc, transaction) => acc + (transaction.type === 'income' ? transaction.value : 0), 0);
    const totalSaidas = transactions.reduce((acc, transaction) => acc + (transaction.type === 'outcome' ? transaction.value : 0), 0);
    const saldo = totalEntradas - totalSaidas;

    return (
        <section className="w-11/12 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Controle financeiro</h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="items-center gap-2">
                            <Plus className="h-4" />
                            Nova transação
                        </Button></DialogTrigger>
                    <DialogContent className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Nova transação</DialogTitle>
                            <DialogDescription>
                                Adicione uma nova transação e informe se é entrada ou saída.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(handleAddTransaction)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Input {...register('description')} id="description" placeholder="Descrição da transação" />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Preço</Label>
                                <Input type="number" id="price" placeholder="Valor da movimentação" {...register('value', { valueAsNumber: true })} />
                                {errors.value && <p className="text-red-500">{errors.value.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Categoria</Label>
                                <Input id="category" placeholder="Categoria da transação" {...register('category')} />
                                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                            </div>

                            <RadioGroup defaultValue={selectType} onValueChange={(value) => setSelectType(value)} className="flex justify-around gap-4">
                                <Label htmlFor="income" className="w-full flex items-center h-16">
                                    <div className={`flex w-full h-16 cursor-pointer items-center justify-center ${selectType === "income"
                                        ? "bg-primary/50 rounded-lg gap-2"
                                        : "bg-secondary hover:bg-primary/50 gap-2 p-4 rounded-lg"}`}
                                    >
                                        <RadioGroupItem className="sr-only" value="income" id="income" />
                                        <ArrowUpCircle />
                                        Entrada
                                    </div>
                                </Label>
                                <Label htmlFor="outcome" className="w-full flex items-center h-16">
                                    <div className={`flex w-full h-16 cursor-pointer items-center justify-center ${selectType === "outcome"
                                        ? "bg-destructive/50 rounded-lg gap-2"
                                        : "bg-secondary hover:bg-destructive/50 gap-2 p-4 rounded-lg"}`}
                                    >
                                        <RadioGroupItem className="sr-only" value="outcome" id="outcome" />
                                        <ArrowDownCircle />
                                        Saída
                                    </div>
                                </Label>
                            </RadioGroup>

                            <Button className="w-full" type="submit">Cadastrar</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col max-w-full md:flex-row gap-4">
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Entradas</CardDescription>
                        <ArrowUpCircle className="text-primary" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">{totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Saídas</CardDescription>
                        <ArrowDownCircle className="text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">- {totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</CardTitle>
                    </CardContent>
                </Card>
                <Card className={totalEntradas >= totalSaidas ? "w-full max-w-sm mx-auto bg-primary/50" : "w-full max-w-sm mx-auto bg-destructive/50"}>
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Total</CardDescription>
                        <DollarSign />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</CardTitle>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Table>
                    <TableCaption>Lista de movimentações.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Tipo</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead className="text-left">Descrição</TableHead>
                            <TableHead className="text-left">Data de criação</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="w-[100px]">
                                <Button variant="ghost">
                                    <Pencil />
                                </Button>
                            </TableHead>
                            <TableHead className="w-[100px]">
                                <Button variant="ghost">
                                    <Trash />
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.type === 'income' ? "Entrada" : "Saida"}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell className="text-left">{transaction.description}</TableCell>
                                <TableCell className="text-left">{Intl.DateTimeFormat('pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }).format(transaction.created)}</TableCell>
                                <TableCell className="text-right">
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(transaction.value)}
                                </TableCell>
                                <TableCell className="w-10">
                                    <Dialog open={isOpenDialogEdit}>
                                        <Button variant="outline" onClick={() => handleEditTransaction(transaction)}>
                                            <Pencil />
                                        </Button>
                                        <DialogContent>
                                            <DialogClose onClick={handleCloseEditTransaction} className="absolute right-3 top-3 border z-10">
                                                <X />
                                            </DialogClose>
                                            <DialogTitle>Editar transação</DialogTitle>

                                            <form onSubmit={handleSubmit(handleUpdateTransaction)} className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="description">Descrição</Label>
                                                    <Input {...register('description')} id="description" placeholder="Descrição da transação" />
                                                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="price">Preço</Label>
                                                    <Input type="number" id="price" placeholder="Valor da movimentação" {...register('value', { valueAsNumber: true })} />
                                                    {errors.value && <p className="text-red-500">{errors.value.message}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="category">Categoria</Label>
                                                    <Input id="category" placeholder="Categoria da transação" {...register('category')} />
                                                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                                                </div>

                                                <RadioGroup defaultValue={selectType} onValueChange={(value) => setSelectType(value)} className="flex justify-around gap-4">
                                                    <Label htmlFor="income" className="w-full flex items-center h-16">
                                                        <div className={`flex w-full h-16 cursor-pointer items-center justify-center ${selectType === "income"
                                                            ? "bg-primary/50 rounded-lg gap-2"
                                                            : "bg-secondary hover:bg-primary/50 gap-2 p-4 rounded-lg"}`}
                                                        >
                                                            <RadioGroupItem className="sr-only" value="income" id="income" />
                                                            <ArrowUpCircle />
                                                            Entrada
                                                        </div>
                                                    </Label>
                                                    <Label htmlFor="outcome" className="w-full flex items-center h-16">
                                                        <div className={`flex w-full h-16 cursor-pointer items-center justify-center ${selectType === "outcome"
                                                            ? "bg-destructive/50 rounded-lg gap-2"
                                                            : "bg-secondary hover:bg-destructive/50 gap-2 p-4 rounded-lg"}`}
                                                        >
                                                            <RadioGroupItem className="sr-only" value="outcome" id="outcome" />
                                                            <ArrowDownCircle />
                                                            Saída
                                                        </div>
                                                    </Label>
                                                </RadioGroup>

                                                <Button className="w-full" type="submit">Salvar</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell className="w-10">
                                    <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => handleRemoveTransaction(transaction.id)}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}