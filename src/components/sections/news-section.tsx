import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: "news-1",
    category: "Economía",
    title: "Análisis del Mercado Financiero Global",
    date: "15 de Julio, 2024",
    description: "Un resumen de las tendencias que marcarán la segunda mitad del año. Contenido de ejemplo.",
    imageHint: "finance newspaper"
  },
  {
    id: "news-2",
    category: "Tecnología",
    title: "La banca digital y la seguridad del futuro",
    date: "12 de Julio, 2024",
    description: "Exploramos las nuevas tecnologías que protegen tus datos y agilizan tus operaciones.",
    imageHint: "city skyline"
  },
  {
    id: "news-3",
    category: "Comunidad",
    title: "Nuestro compromiso con la educación financiera",
    date: "10 de Julio, 2024",
    description: "Conoce las iniciativas y programas que apoyamos para un futuro más próspero para todos.",
    imageHint: "community meeting"
  },
];

export default function NewsSection() {
  const images = PlaceHolderImages;

  return (
    <section id="news" className="w-full py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-headline">
              Actualidad y Noticias
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Mantente informado sobre las últimas novedades del sector financiero y de nuestro banco.
            </p>
          </div>
          <Link href="#" className="group inline-flex items-center gap-1 font-medium text-primary">
            Ver todas las noticias
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {newsItems.map((item) => {
            const image = images.find(img => img.id === item.id);
            return (
              <Link href="#" key={item.id} className="group block">
                <Card className="h-full overflow-hidden transition-all group-hover:shadow-xl">
                  {image && (
                    <div className="aspect-video relative">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{item.category}</Badge>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <CardTitle className="mt-2 text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
