import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import  './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import site from '@/data/site.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: site.siteName,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.siteName,
    description: site.description,
    url: site.url,
    siteName: site.shortName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.siteName,
    description: site.description,
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: site.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: site.themeColor.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
