import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CreditCard, Landmark, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "product-card-1",
    icon: CreditCard,
    title: "Tarjetas de Crédito",
    description: "Elige la tarjeta que se adapta a tu estilo de vida. Beneficios exclusivos y seguridad en cada compra.",
    imageHint: "credit card"
  },
  {
    id: "product-card-2",
    icon: Landmark,
    title: "Cuentas Personales",
    description: "Nuestras cuentas te ofrecen flexibilidad y acceso digital para que gestiones tu dinero sin complicaciones.",
    imageHint: "piggy bank"
  },
  {
    id: "product-card-3",
    icon: Home,
    title: "Préstamos Hipotecarios",
    description: "Te ayudamos a encontrar el hogar de tus sueños con planes de financiamiento a tu medida.",
    imageHint: "house keys"
  },
];

export default function ProductShowcase() {
  const images = PlaceHolderImages;

  return (
    <section id="products" className="w-full py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-headline">
            Soluciones para cada etapa de tu vida
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Descubre nuestros productos y servicios diseñados para ti.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const image = images.find(img => img.id === product.id);
            const Icon = product.icon;
            return (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                {image && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader className="flex-row items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="mt-1">{product.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Saber más
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
