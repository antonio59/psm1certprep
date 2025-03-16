import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            layout: {
              socialButtonsPlacement: 'bottom',
              socialButtonsVariant: 'iconButton',
            },
            variables: {
              colorPrimary: '#4F46E5',
              colorTextOnPrimaryBackground: '#ffffff',
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}