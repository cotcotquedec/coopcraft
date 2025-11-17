# Quickstart: Implémentation du Menu Latéral Droit

**Phase**: 1 - Design & Contracts  
**Date**: 2025-01-17  
**Audience**: Développeurs implémentant la fonctionnalité

## Vue d'Ensemble

Ce guide vous accompagne pas à pas dans l'implémentation du menu de navigation latéral droit. Suivez les étapes dans l'ordre pour une intégration réussie.

**Durée estimée**: 2-3 heures  
**Prérequis**: Connaissance de React, TypeScript et Next.js

## Étape 1: Créer la Structure de Fichiers

### 1.1 Créer le dossier des composants

```bash
mkdir -p src/components/RightMenu
```

### 1.2 Créer les fichiers nécessaires

```bash
touch src/components/RightMenu/types.ts
touch src/components/RightMenu/RightMenu.tsx
touch src/components/RightMenu/MenuItem.tsx
```

**Structure finale**:
```
src/components/RightMenu/
├── types.ts          # Interfaces TypeScript
├── RightMenu.tsx     # Composant principal
└── MenuItem.tsx      # Composant item de menu
```

## Étape 2: Définir les Types TypeScript

### 2.1 Créer `types.ts`

Copiez le contenu suivant dans [`src/components/RightMenu/types.ts`](../../../src/components/RightMenu/types.ts):

```typescript
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
  /** Icône optionnelle (future) */
  icon?: string;
  /** Description pour accessibilité */
  description?: string;
}

/**
 * Configuration du menu
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
 * Props du composant RightMenu
 */
export interface RightMenuProps {
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

**✅ Checkpoint**: Les types sont définis et prêts à être utilisés.

## Étape 3: Créer le Composant MenuItem

### 3.1 Créer `MenuItem.tsx`

Copiez le contenu suivant dans [`src/components/RightMenu/MenuItem.tsx`](../../../src/components/RightMenu/MenuItem.tsx):

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
    borderLeft: '3px solid transparent',
  } as React.CSSProperties,
  linkActive: {
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    borderLeftColor: '#3b82f6',
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

**Styles hover/focus** (à ajouter dans [`globals.css`](../../../src/app/globals.css)):

```css
/* Menu Item Hover/Focus States */
.menu-item-link:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.menu-item-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}
```

**✅ Checkpoint**: Le composant MenuItem est créé et stylé.

## Étape 4: Créer le Composant RightMenu

### 4.1 Créer `RightMenu.tsx`

Copiez le contenu suivant dans [`src/components/RightMenu/RightMenu.tsx`](../../../src/components/RightMenu/RightMenu.tsx):

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import { RightMenuProps, MenuState } from './types';

export default function RightMenu({ config }: RightMenuProps) {
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
        aria-controls="right-menu"
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
        id="right-menu"
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
    right: '20px',
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
    right: 0,
    height: '100vh',
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #e2e8f0',
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
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

**✅ Checkpoint**: Le composant RightMenu est créé avec gestion d'état.

## Étape 5: Ajouter les Styles Responsive

### 5.1 Ajouter dans `globals.css`

Ajoutez à la fin de [`src/app/globals.css`](../../../src/app/globals.css):

```css
/* ===== Right Menu Styles ===== */

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
    transform: translateX(100%) !important;
    max-width: 80% !important;
  }

  /* Menu visible quand ouvert */
  .menu-nav.menu-open {
    transform: translateX(0) !important;
  }

  /* Ajuster le contenu principal */
  body {
    padding-right: 0 !important;
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
    padding-right: 280px;
  }
}
```

**✅ Checkpoint**: Les styles responsive sont en place.

## Étape 6: Intégrer dans le Layout

### 6.1 Modifier `layout.tsx`

Modifiez [`src/app/layout.tsx`](../../../src/app/layout.tsx):

```typescript
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
```

**✅ Checkpoint**: Le menu est intégré dans le layout.

## Étape 7: Créer les Pages de Destination

### 7.1 Créer les dossiers

```bash
mkdir -p src/app/drilling
mkdir -p src/app/cutting
mkdir -p src/app/accessories
mkdir -p src/app/creations
```

### 7.2 Créer les pages

**`src/app/drilling/page.tsx`**:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gabarits de perçage - CoopCraft',
  description: 'Créer des gabarits de perçage personnalisés',
};

export default function DrillingPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Gabarits de perçage</h1>
        <p style={styles.description}>
          Créez des gabarits de perçage personnalisés pour vos projets.
        </p>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#0f172a',
  },
  description: {
    fontSize: '1.125rem',
    color: '#475569',
  },
};
```

**Répétez pour les autres pages** (`cutting`, `accessories`, `creations`) en adaptant le contenu.

**✅ Checkpoint**: Toutes les pages de destination sont créées.

## Étape 8: Tester l'Implémentation

### 8.1 Démarrer le serveur de développement

```bash
npm run dev
```

### 8.2 Tests à effectuer

**Desktop (> 768px)**:
- [ ] Le menu est visible sur le côté droit
- [ ] Le menu a une largeur de 280px
- [ ] Le contenu principal a un padding-right de 280px
- [ ] L'item actif est mis en évidence
- [ ] Le hover change le style des items
- [ ] La navigation fonctionne (clic sur items)
- [ ] Le menu reste visible au scroll

**Mobile (≤ 768px)**:
- [ ] Le bouton hamburger est visible en haut à droite
- [ ] Le menu est caché par défaut
- [ ] Clic sur hamburger ouvre le menu avec animation
- [ ] L'overlay sombre apparaît derrière le menu
- [ ] Clic sur overlay ferme le menu
- [ ] Clic sur item ferme le menu et navigue
- [ ] Touche Escape ferme le menu
- [ ] Le menu occupe max 80% de la largeur

**Accessibilité**:
- [ ] Navigation au clavier avec Tab fonctionne
- [ ] Enter/Space activent les items
- [ ] Escape ferme le menu mobile
- [ ] Les attributs ARIA sont présents
- [ ] Le focus est visible (outline bleu)

### 8.3 Tests de Performance

Ouvrez Chrome DevTools > Lighthouse et vérifiez :
- [ ] Performance score > 90
- [ ] Accessibility score > 95
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

## Étape 9: Validation Finale

### 9.1 Checklist de Validation

Vérifiez que tous les critères de succès sont atteints :

- [ ] **SC-001**: Accès à une catégorie en < 2 secondes ✅
- [ ] **SC-002**: Compatible Chrome/Firefox/Safari/Edge ✅
- [ ] **SC-003**: Impact chargement < 100ms ✅
- [ ] **SC-004**: Identification position claire ✅
- [ ] **SC-005**: Animation < 300ms à 60fps ✅
- [ ] **SC-006**: Accessibilité clavier 100% ✅
- [ ] **SC-007**: Menu mobile < 80% largeur ✅

### 9.2 Commit et Push

```bash
git add .
git commit -m "feat: add right navigation menu

- Add RightMenu component with mobile/desktop support
- Implement responsive behavior (hamburger on mobile)
- Add accessibility features (ARIA, keyboard navigation)
- Create destination pages (drilling, cutting, accessories, creations)
- Add CSS animations for smooth transitions

Closes #001-right-menu"

git push origin 001-right-menu
```

**✅ Checkpoint**: L'implémentation est complète et validée !

## Dépannage

### Problème: Le menu ne s'affiche pas

**Solution**: Vérifiez que :
1. Le composant RightMenu est bien importé dans `layout.tsx`
2. La directive `'use client'` est présente en haut de `RightMenu.tsx`
3. Les styles CSS sont bien chargés

### Problème: L'animation est saccadée

**Solution**: 
1. Vérifiez que vous utilisez `transform` et non `left/right`
2. Ajoutez `will-change: transform` dans les styles
3. Testez dans un navigateur différent

### Problème: Le menu ne se ferme pas sur mobile

**Solution**:
1. Vérifiez que les event listeners sont bien attachés
2. Vérifiez que `menuRef` est correctement assigné
3. Testez la touche Escape et le clic extérieur séparément

### Problème: L'item actif n'est pas mis en évidence

**Solution**:
1. Vérifiez que `usePathname()` retourne le bon chemin
2. Vérifiez que les `href` des items correspondent exactement
3. Ajoutez des `console.log` pour débugger

## Ressources Supplémentaires

- [Documentation Next.js - usePathname](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
- [MDN - ARIA Navigation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
- [CSS Tricks - Smooth Animations](https://css-tricks.com/almanac/properties/t/transform/)
- [Spec complète](./spec.md)
- [Plan d'implémentation](./plan.md)
- [Modèle de données](./data-model.md)

## Prochaines Étapes

Après avoir complété ce quickstart :

1. **Tests utilisateurs** : Faire tester par 5 personnes minimum
2. **Optimisations** : Ajouter lazy loading si nécessaire
3. **Améliorations** : Ajouter des icônes aux items de menu
4. **Documentation** : Mettre à jour le README du projet

**Félicitations ! Le menu latéral droit est maintenant opérationnel ! 🎉**