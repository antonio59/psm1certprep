import Navigation from '@/components/Navigation';
import Resources from '@/components/Resources';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Resources />
      </main>
    </div>
  );
}