import { SessionProvider } from './providers/SessionProvider';
import './globals.css';

export const metadata = {
  title: {
    default: 'Sistem Manajemen Surat',
    template: '%s | Sistem Manajemen Surat',
  },
  description: 'Sistem Manajemen Surat Otomatis - Kelola surat organisasi dengan mudah dan otomatis',
  keywords: ['surat', 'manajemen', 'dokumen', 'otomatis', 'penomoran'],
  authors: [{ name: 'Sistem Manajemen Surat' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
