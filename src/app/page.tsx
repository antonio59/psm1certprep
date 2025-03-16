import { auth } from '@clerk/nextjs';
import Dashboard from '@/components/Dashboard';
import Navigation from '@/components/Navigation';

export default async function Home() {
  const { userId } = await auth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Dashboard userId={userId} />
      </main>
    </div>
  );
}