# Quick Start Guide: Menu de Navigation à Gauche

**Feature**: 001-left-menu  
**Date**: 2025-11-17  
**Phase**: 1 - Design & Contracts

## Introduction

Ce guide vous permet de démarrer rapidement avec le composant [`LeftMenu`](../../src/components/LeftMenu/LeftMenu.tsx). Vous apprendrez à l'installer, le configurer et le personnaliser en quelques minutes.

## Prerequisites

- Node.js ≥18.x
- Next.js 15.x
- React 19.x
- TypeScript 5.x

## Installation

### Step 1: Create Component Structure

```bash
# Créer le dossier du composant
mkdir -p src/components/LeftMenu

# Créer les fichiers nécessaires
touch src/components/LeftMenu/LeftMenu.tsx
touch src/components/LeftMenu/MenuItem.tsx
touch src/components/LeftMenu/types.ts
```

### Step 2: Copy Type Definitions

Créer [`src/components/LeftMenu/types.ts`](../../src/components/LeftMenu/types.ts):

```typescript
/**
 * Types et interfaces pour le menu de navigation latéral gauche
 * @module LeftMenu/types
 */

/**
 * Représente un élément du menu de navigation
 */
export interface MenuItem {
  /** Identifiant unique */
  id: string;
  /** Libellé affiché */
  label: string;
  /** Route de destination */
  href: string;
  /** Icône optionnelle */
  icon?: string;
  /** Description pour accessibilité */
  description?: string;
}

/**
 * Configuration du menu de navigation
 */
export interface MenuConfig {
  /** Liste des items */
  items: MenuItem[];
  /** Largeur en pixels (desktop) */
  width: number;
  /** Breakpoint mobile en pixels */
  mobileBreakpoint: number;
  /** Position du menu */
  position?: 'left' | 'right';
}

/**
 * État interne du menu
 */
export interface MenuState {
  /** Menu ouvert (mobile uniquement) */
  isOpen: boolean;
  /** ID de l'item actif */
  activeItemId: string | null;
}

/**
 * Props du composant LeftMenu
 */
export interface LeftMenuProps {
  /** Configuration du menu */
  config: MenuConfig;
}

/**
 * Props du composant MenuItem
 */
export interface MenuItemProps {
  /** Données de l'item */
  item: MenuItem;
  /** Item actuellement actif */
  isActive: boolean;
  /** Callback au clic */
  onClick?: () => void;
}
```

### Step 3: Create MenuItem Component

Créer [`src/components/LeftMenu/MenuItem.tsx`](../../src/components/LeftMenu/MenuItem.tsx):

```typescript
'use client';

import Link from 'next/link';
import { MenuItemProps } from './types';

export default function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  return (
    <li style={styles.listItem}>
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.description || item.label}
        className="menu-item-link"
        style={{
          ...styles.link,
          ...(isActive ? styles.linkActive : {}),
        }}
      >
        {item.icon && <span style={styles.icon}>{item.icon}</span>}
        <span style={styles.label}>{item.label}</span>
      </Link>
    </li>
  );
}

const styles = {
  listItem: {
    listStyle: 'none',
    margin: 0,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: '#475569',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    borderRight: '3px solid transparent',  // ← Changé de borderLeft
  } as React.CSSProperties,
  linkActive: {
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    borderRightColor: '#3b82f6',  // ← Changé de borderLeftColor
    fontWeight: '600',
  } as React.CSSProperties,
  icon: {
    fontSize: '20px',
  },
  label: {
    fontSize: '15px',
  },
};
```

### Step 4: Create LeftMenu Component

Créer [`src/components/LeftMenu/LeftMenu.tsx`](../../src/components/LeftMenu/LeftMenu.tsx):

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import { LeftMenuProps, MenuState } from './types';

export default function LeftMenu({ config }: LeftMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  
  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: false,
    activeItemId: null,
  });

  // Déterminer l'item actif basé sur le pathname
  useEffect(() => {
    const activeItem = config.items.find(item => item.href === pathname);
    setMenuState(prev => ({
      ...prev,
      activeItemId: activeItem?.id || null,
    }));
  }, [pathname, config.items]);

  // Gérer la fermeture au clic extérieur (mobile)
  useEffect(() => {
    if (!menuState.isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuState(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuState.isOpen]);

  // Gérer la fermeture avec Escape (mobile)
  useEffect(() => {
    if (!menuState.isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuState(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuState.isOpen]);

  const handleToggle = () => {
    setMenuState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleItemClick = () => {
    // Fermer le menu sur mobile après clic
    setMenuState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {/* Bouton hamburger (mobile uniquement) */}
      <button
        onClick={handleToggle}
        aria-label={menuState.isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuState.isOpen}
        aria-controls="left-menu"
        style={styles.hamburger}
        className="menu-hamburger"
      >
        <span style={styles.hamburgerIcon}>☰</span>
      </button>

      {/* Overlay (mobile uniquement) */}
      {menuState.isOpen && (
        <div
          onClick={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
          style={styles.overlay}
          className="menu-overlay"
        />
      )}

      {/* Menu principal */}
      <nav
        ref={menuRef}
        id="left-menu"
        role="navigation"
        aria-label="Menu principal"
        style={{
          ...styles.menu,
          width: `${config.width}px`,
          transform: menuState.isOpen ? 'translateX(0)' : undefined,
        }}
        className={`menu-nav ${menuState.isOpen ? 'menu-open' : ''}`}
      >
        <ul style={styles.list}>
          {config.items.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={menuState.activeItemId === item.id}
              onClick={handleItemClick}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

const styles = {
  hamburger: {
    display: 'none',
    position: 'fixed' as const,
    top: '20px',
    left: '20px',  // ← Changé de right
    zIndex: 1001,
    padding: '12px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  hamburgerIcon: {
    fontSize: '24px',
    color: '#1e293b',
  },
  overlay: {
    display: 'none',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  menu: {
    position: 'fixed' as const,
    top: 0,
    left: 0,  // ← Changé de right
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',  // ← Changé de borderLeft
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',  // ← Inversé
    overflowY: 'auto' as const,
    zIndex: 1000,
    transition: 'transform 0.3s ease-in-out',
  },
  list: {
    margin: 0,
    padding: '20px 0',
    listStyle: 'none',
  },
};
```

### Step 5: Update Global Styles

Ajouter à [`src/app/globals.css`](../../src/app/globals.css):

```css
/* ===== Left Menu Styles ===== */

/* Menu Item Hover/Focus */
.menu-item-link:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.menu-item-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* Mobile Styles (≤ 768px) */
@media (max-width: 768px) {
  /* Afficher le bouton hamburger */
  .menu-hamburger {
    display: block !important;
  }

  /* Afficher l'overlay quand menu ouvert */
  .menu-overlay {
    display: block !important;
  }

  /* Menu caché par défaut sur mobile */
  .menu-nav {
    transform: translateX(-100%) !important;  /* ← Changé de 100% */
    max-width: 80% !important;
  }

  /* Menu visible quand ouvert */
  .menu-nav.menu-open {
    transform: translateX(0) !important;
  }

  /* Ajuster le contenu principal */
  body {
    padding-left: 0 !important;  /* ← Changé de padding-right */
  }
}

/* Desktop Styles (> 768px) */
@media (min-width: 769px) {
  /* Cacher le bouton hamburger */
  .menu-hamburger {
    display: none !important;
  }

  /* Cacher l'overlay */
  .menu-overlay {
    display: none !important;
  }

  /* Menu toujours visible */
  .menu-nav {
    transform: translateX(0) !important;
  }

  /* Ajuster le contenu principal pour le menu */
  body {
    padding-left: 280px;  /* ← Changé de padding-right */
  }
}
```

## Basic Usage

### Step 1: Configure Menu

Dans [`src/app/layout.tsx`](../../src/app/layout.tsx):

```typescript
import type { Metadata } from 'next';
import './globals.css';
import LeftMenu from '@/components/LeftMenu/LeftMenu';
import { MenuConfig } from '@/components/LeftMenu/types';

export const metadata: Metadata = {
  title: 'CoopCraft',
  description: 'Plateforme de génération d\'outils 3D personnalisés',
};

// Configuration du menu
const menuConfig: MenuConfig = {
  items: [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: '🏠',
      description: 'Retour à la page d\'accueil',
    },
    {
      id: 'drilling',
      label: 'Gabarits de perçage',
      href: '/drilling',
      icon: '🔨',
      description: 'Créer des gabarits de perçage personnalisés',
    },
    {
      id: 'cutting',
      label: 'Guides de coupe',
      href: '/cutting',
      icon: '✂️',
      description: 'Générer des guides de coupe précis',
    },
    {
      id: 'accessories',
      label: 'Accessoires d\'atelier',
      href: '/accessories',
      icon: '🔧',
      description: 'Outils et accessoires divers',
    },
    {
      id: 'creations',
      label: 'Mes créations',
      href: '/creations',
      icon: '📁',
      description: 'Gérer vos créations sauvegardées',
    },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'left',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <LeftMenu config={menuConfig} />
        {children}
      </body>
    </html>
  );
}
```

### Step 2: Test

```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
open http://localhost:3000
```

## Customization

### Change Menu Width

```typescript
const menuConfig: MenuConfig = {
  // ...
  width: 320,  // Augmenter à 320px
};
```

### Change Mobile Breakpoint

```typescript
const menuConfig: MenuConfig = {
  // ...
  mobileBreakpoint: 1024,  // Hamburger jusqu'à 1024px
};
```

### Add Custom Icons

```typescript
const menuConfig: MenuConfig = {
  items: [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: '🏠',  // Emoji Unicode
    },
    // Ou utiliser un composant React (future)
  ],
};
```

### Customize Colors

Modifier les styles dans [`LeftMenu.tsx`](../../src/components/LeftMenu/LeftMenu.tsx):

```typescript
const styles = {
  menu: {
    // ...
    backgroundColor: '#f8fafc',  // Fond gris clair
    borderRight: '2px solid #3b82f6',  // Bordure bleue
  },
};
```

Ou dans [`MenuItem.tsx`](../../src/components/LeftMenu/MenuItem.tsx):

```typescript
const styles = {
  linkActive: {
    color: '#10b981',  // Vert pour actif
    backgroundColor: '#d1fae5',
    borderRightColor: '#10b981',
  },
};
```

### Customize Animations

Dans [`globals.css`](../../src/app/globals.css):

```css
.menu-nav {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
```

## Common Patterns

### Dynamic Menu Items

```typescript
function generateMenuConfig(userRole: string): MenuConfig {
  const baseItems = [
    { id: 'home', label: 'Accueil', href: '/' },
  ];
  
  const adminItems = [
    { id: 'admin', label: 'Admin', href: '/admin' },
  ];
  
  return {
    items: userRole === 'admin' 
      ? [...baseItems, ...adminItems]
      : baseItems,
    width: 280,
    mobileBreakpoint: 768,
    position: 'left',
  };
}
```

### Conditional Rendering

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const showMenu = true;  // Ou basé sur route, auth, etc.
  
  return (
    <html lang="fr">
      <body>
        {showMenu && <LeftMenu config={menuConfig} />}
        {children}
      </body>
    </html>
  );
}
```

### External Configuration

Créer [`src/config/menu.ts`](../../src/config/menu.ts):

```typescript
import { MenuConfig } from '@/components/LeftMenu/types';

export const menuConfig: MenuConfig = {
  items: [
    // ...
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'left',
};
```

Puis importer:

```typescript
import { menuConfig } from '@/config/menu';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LeftMenu config={menuConfig} />
        {children}
      </body>
    </html>
  );
}
```

## Troubleshooting

### Menu Not Visible

**Problème**: Le menu ne s'affiche pas.

**Solutions**:
1. Vérifier que `LeftMenu` est bien importé dans `layout.tsx`
2. Vérifier les styles CSS dans `globals.css`
3. Vérifier la console pour erreurs TypeScript
4. Vérifier le z-index (doit être 1000)

### Active Item Not Highlighted

**Problème**: L'élément actif n'est pas mis en évidence.

**Solutions**:
1. Vérifier que `href` correspond exactement au pathname
2. Vérifier que `id` est unique pour chaque item
3. Vérifier les styles `linkActive` dans `MenuItem.tsx`

### Mobile Menu Not Working

**Problème**: Le hamburger menu ne fonctionne pas sur mobile.

**Solutions**:
1. Vérifier les media queries dans `globals.css`
2. Vérifier que `mobileBreakpoint` est correct (768px)
3. Tester avec Chrome DevTools en mode responsive
4. Vérifier que JavaScript est activé

### Content Hidden Behind Menu

**Problème**: Le contenu principal est caché derrière le menu.

**Solutions**:
1. Vérifier le `padding-left` dans `globals.css` (desktop)
2. Ajuster la valeur à la largeur du menu (280px par défaut)
3. Vérifier que le body a bien le padding appliqué

## Performance Tips

### Memoization

Si vous avez beaucoup d'items (>20), utilisez `React.memo`:

```typescript
import { memo } from 'react';

const MenuItem = memo(function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  // ...
});

export default MenuItem;
```

### Lazy Loading

Pour des menus très complexes:

```typescript
import dynamic from 'next/dynamic';

const LeftMenu = dynamic(() => import('@/components/LeftMenu/LeftMenu'), {
  ssr: false,  // Désactiver SSR si nécessaire
});
```

### Reduce Re-renders

Utiliser `useCallback` pour les handlers:

```typescript
const handleItemClick = useCallback(() => {
  setMenuState(prev => ({ ...prev, isOpen: false }));
}, []);
```

## Accessibility

### Keyboard Navigation

Le menu supporte:
- **Tab**: Naviguer entre les items
- **Enter**: Activer un item
- **Escape**: Fermer le menu (mobile)

### Screen Readers

Le menu inclut:
- `aria-label` pour le menu et les items
- `aria-expanded` pour le bouton hamburger
- `aria-current="page"` pour l'item actif
- `role="navigation"` pour le menu

### Testing

Tester avec:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

## Next Steps

1. ✅ Menu installé et configuré
2. 🎯 Personnaliser les couleurs et styles
3. 🎯 Ajouter vos propres items de menu
4. 🎯 Tester sur différents appareils
5. 🎯 Valider l'accessibilité

## Resources

- [Spec complète](./spec.md)
- [Plan technique](./plan.md)
- [Recherche et analyse](./research.md)
- [Modèle de données](./data-model.md)
- [Contrats d'interface](./contracts.md)

## Support

Pour toute question ou problème:
1. Consulter la [documentation complète](./spec.md)
2. Vérifier les [issues connues](./research.md#risk-analysis)
3. Contacter l'équipe de développement

---

**Guide créé le**: 2025-11-17  
**Dernière mise à jour**: 2025-11-17  
**Version**: 1.0.0