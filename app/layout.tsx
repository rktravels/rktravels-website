import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/Footer';
export const metadata: Metadata = {
  title: 'RK Travels | Your Journey Our Priority',
  description: 'Book city rides, outstation cabs, and airport transfers with RK Travels.',
  icons: {
    icon: '/favicon.PNG',
    shortcut: '/favicon.PNG',
    apple: '/favicon.PNG',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}