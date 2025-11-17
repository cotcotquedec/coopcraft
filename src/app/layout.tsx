import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoopCraft - Speckit',
  description: 'Plateforme de génération d\'outils 3D personnalisés',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}