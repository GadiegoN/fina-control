import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine, ArrowUpToLine, DollarSign, Plus, Search } from "lucide-react";

export function Dashboard() {
    return (
        <section className="w-11/12 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Controle financeiro</h1>
                <Button className="items-center gap-2">
                    <Plus className="h-4" />
                    Nova transação
                </Button>
            </div>

            <div className="flex flex-col max-w-full md:flex-row gap-4">
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Entradas</CardDescription>
                        <ArrowUpToLine className="text-primary" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="line-clamp-1">R$ 00,00</CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader className="flex-row justify-between">
                        <CardDescription>Saídas</CardDescription>
                        <ArrowDownToLine className="text-destructive" />
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