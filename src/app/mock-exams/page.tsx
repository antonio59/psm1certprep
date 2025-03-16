import { auth } from '@clerk/nextjs';
import Navigation from '@/components/Navigation';
import MockExams from '@/components/MockExams';

export default async function MockExamsPage() {
  const { userId } = await auth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <MockExams userId={userId} />
      </main>
    </div>
  );
}