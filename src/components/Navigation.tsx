'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Brain, GraduationCap, Library } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/flashcards', label: 'Flashcards', icon: Brain },
    { path: '/mock-exams', label: 'Mock Exams', icon: BookOpen },
    { path: '/resources', label: 'Resources', icon: Library },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">PSM I Prep</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === path
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;