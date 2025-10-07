import Link from "next/link";
import Image from "next/image";

const Logo = () => (
    <Image src="/santander-logo.png" alt="Santander Logo" width={24} height={24} className="h-6 w-6" />
);


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-primary">Santander</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:gap-6">
            <Link href="#" className="hover:text-primary">Aviso Legal</Link>
            <Link href="#" className="hover:text-primary">Política de Privacidad</Link>
            <Link href="#" className="hover:text-primary">Política de Cookies</Link>
            <Link href="#" className="hover:text-primary">Contacto</Link>
          </nav>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Santander. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
