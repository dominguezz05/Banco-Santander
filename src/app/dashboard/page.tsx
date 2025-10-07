
'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-8 w-80" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Bienvenido a tu área de cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">Hola, <span className="font-semibold">{user.displayName || 'Usuario'}</span>.</p>
              <p>Aquí podrás gestionar tus productos y servicios.</p>
              <Button onClick={handleLogout} variant="destructive">
                Cerrar sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
