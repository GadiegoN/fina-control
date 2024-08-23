import { Button } from "@/components/ui/button";
import { Github, Globe, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
    return (
        <section className="flex flex-col gap-6 w-11/12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <article className="w-full px-10 space-y-6">
                    <h1 className="text-2xl font-bold">Sou o Gadiego Nogueira!<br />Desenvolvedor front-end</h1>

                    <p className="text-justify text-muted-foreground">
                        Minha trajetória com desenvolvedor começou em 2019 quando fiz um freelancer para a NatuContos,
                        onde desenvolvi as interfaces do projeto utilizando Flutter(Dart). Foi um periodo de 5 meses muito gratificante.
                        Em seguida recebi a proposta para trabalhar na dyndo tambem com desenvolvimento mobile utiliando Quasar(Vuejs). Fiquei por 1 ano e 5 meses,
                        até receber uma proposta da Bravo Serviços Logisticas para trabalhar com Angularjs(Typescript), pude aprender bastante por la.
                        Em 2022 retornei a Dyndo para recomeçar o App com um novo framework, e utilizando React Native pude refazelo durante 7 meses até o projeto ser parado.
                        Retornei em 2023 para continuar o desenvolvimento e lançamento do App em Reactnative e iniciar uma nova verção Web utilizando o NextJs até maio do 2024.
                    </p>
                </article>
                <img src="/profile.png" className="w-[480px] md:w-[350px] lg:w-6/12 mx-auto object-cover" />
            </div>
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-lg font-bold">Entre em contato</h1>
                <div className="flex gap-10">
                    <Button variant="ghost">
                        <Link to="https://github.com/GadiegoN" target="_blank">
                            <Github />
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link to="https://www.instagram.com/gadiego_nogueira/" target="_blank">
                            <Instagram />
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link to="https://www.linkedin.com/in/gadiegon/" target="_blank">
                            <Linkedin />
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link to="https://gadiego.com.br/" target="_blank">
                            <Globe />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}