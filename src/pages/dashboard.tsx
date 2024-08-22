import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Plus, Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";


export function Dashboard() {
    const [selectType, setSelectType] = useState('income')

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

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Input id="description" placeholder="Descrição da transação" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Preço</Label>
                                <Input id="price" placeholder="Valor da movimentação" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Categoria</Label>
                                <Input id="category" placeholder="Categoria da transação" />
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

                            <Button className="w-full">Cadastrar</Button>
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
                        <CardTitle className="line-clamp-1">R$ 00,00</CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Saídas</CardDescription>
                        <ArrowDownCircle className="text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">- R$ 00,00</CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-sm mx-auto bg-primary/50">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Entradas</CardDescription>
                        <DollarSign />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">R$ 00,00</CardTitle>
                    </CardContent>
                </Card>
            </div>

            <form className="flex gap-4 items-end">

                <div className="w-full flex flex-col gap-4">
                    <Label>Filtrar transações</Label>
                    <Input className="w-full" placeholder="Buscar transação" />
                </div>
                <Button className="border-primary text-primary" variant="outline">
                    <Search className="h-4" />
                    Buscar
                </Button>
            </form>
        </section>
    )
}