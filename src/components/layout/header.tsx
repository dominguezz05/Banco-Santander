"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "#products", label: "Productos" },
  { href: "#news", label: "Noticias" },
  { href: "#", label: "Ayuda" },
];

const Logo = () => (
    <Image src="/santander-logo.png" alt="Santander Logo" width={32} height={32} className="h-8 w-8" />
);

export default function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <Logo />
            <span className="text-lg">Santander</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-primary mb-8">
                  <Logo />
                  <span className="text-lg">Santander</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                   {user && (
                    <>
                      <SheetClose asChild>
                        <Link href="/dashboard" className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">Dashboard</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button onClick={handleLogout} variant="ghost" className="justify-start text-lg font-medium text-destructive">Salir</Button>
                      </SheetClose>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          {!isUserLoading && (
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Button asChild variant="outline">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={handleLogout} variant="ghost" size="icon" title="Salir">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/registro">Abrir Cuenta</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
