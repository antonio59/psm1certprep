import { auth } from '@clerk/nextjs';
import Navigation from '@/components/Navigation';
import ExamSimulator from '@/components/ExamSimulator';

export default async function ExamPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ExamSimulator userId={userId} examId={params.id} />
      </main>
    </div>
  );
}