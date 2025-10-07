import Image from "next/image";
import LoginForm from "./login-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-background");

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover object-center opacity-5"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative container mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl font-headline">
              Tu futuro financiero, más claro que nunca.
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              Gestiona tus finanzas con herramientas sencillas y seguras. Todo lo que necesitas, en un solo lugar.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button size="lg">
                Más Información <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="w-full max-w-md justify-self-center lg:justify-self-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
