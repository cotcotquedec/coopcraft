import type { Metadata } from 'next';
import './globals.css';
import RightMenu from '@/components/RightMenu/RightMenu';
import { MenuConfig } from '@/components/RightMenu/types';

export const metadata: Metadata = {
  title: 'CoopCraft - Speckit',
  description: 'Plateforme de génération d\'outils 3D personnalisés',
};

// Configuration du menu
const menuConfig: MenuConfig = {
  items: [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      description: 'Retour à la page d\'accueil',
    },
    {
      id: 'drilling',
      label: 'Gabarits de perçage',
      href: '/drilling',
      description: 'Créer des gabarits de perçage personnalisés',
    },
    {
      id: 'cutting',
      label: 'Guides de coupe',
      href: '/cutting',
      description: 'Générer des guides de coupe précis',
    },
    {
      id: 'accessories',
      label: 'Accessoires d\'atelier',
      href: '/accessories',
      description: 'Outils et accessoires divers',
    },
    {
      id: 'creations',
      label: 'Mes créations',
      href: '/creations',
      description: 'Gérer vos créations sauvegardées',
    },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'right',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <RightMenu config={menuConfig} />
        {children}
      </body>
    </html>
  );
}