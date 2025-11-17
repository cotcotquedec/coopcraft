# Data Model: Menu de Navigation Latéral Droit

**Phase**: 1 - Design & Contracts  
**Date**: 2025-01-17  
**Status**: Completed

## Vue d'Ensemble

Ce document définit la structure des données utilisées par le menu de navigation latéral droit. Le modèle est conçu pour être simple, extensible et type-safe avec TypeScript.

## Entités Principales

### MenuItem

Représente un élément individuel du menu de navigation.

```typescript
interface MenuItem {
  /**
   * Identifiant unique de l'item de menu
   * Utilisé pour la gestion de l'état actif et les clés React
   */
  id: string;
  
  /**
   * Libellé affiché dans le menu
   * Doit être court et descriptif (max 30 caractères recommandé)
   */
  label: string;
  
  /**
   * URL de destination (route Next.js)
   * Doit commencer par '/' pour les routes internes
   * Exemple: '/drilling', '/cutting'
   */
  href: string;
  
  /**
   * Icône optionnelle (emoji ou nom d'icône)
   * Phase 1: Non implémenté (réservé pour future itération)
   * Exemple: '🔨', 'drill-icon'
   */
  icon?: string;
  
  /**
   * Description optionnelle pour l'accessibilité
   * Utilisée dans aria-label si fournie
   */
  description?: string;
}
```

**Exemple d'instance**:
```typescript
const drillingItem: MenuItem = {
  id: 'drilling',
  label: 'Gabarits de perçage',
  href: '/drilling',
  description: 'Créer des gabarits de perçage personnalisés'
};
```

**Contraintes**:
- `id` : Doit être unique dans la collection
- `label` : Maximum 30 caractères pour éviter le débordement
- `href` : Doit être une route valide Next.js
- `icon` : Optionnel pour MVP, sera ajouté dans une future itération

### MenuConfig

Configuration globale du menu.

```typescript
interface MenuConfig {
  /**
   * Liste des items de menu à afficher
   * Ordre d'affichage = ordre dans le tableau
   */
  items: MenuItem[];
  
  /**
   * Largeur du menu en pixels (desktop uniquement)
   * Valeur fixe pour cohérence visuelle
   */
  width: number;
  
  /**
   * Breakpoint en pixels pour basculer mobile/desktop
   * Mobile: < mobileBreakpoint
   * Desktop: >= mobileBreakpoint
   */
  mobileBreakpoint: number;
  
  /**
   * Position du menu (pour extensibilité future)
   * Phase 1: Toujours 'right'
   */
  position?: 'left' | 'right';
}
```

**Configuration par défaut**:
```typescript
const defaultMenuConfig: MenuConfig = {
  items: [
    {
      id: 'drilling',
      label: 'Gabarits de perçage',
      href: '/drilling',
    },
    {
      id: 'cutting',
      label: 'Guides de coupe',
      href: '/cutting',
    },
    {
      id: 'accessories',
      label: 'Accessoires d\'atelier',
      href: '/accessories',
    },
    {
      id: 'creations',
      label: 'Mes créations',
      href: '/creations',
    },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'right',
};
```

### MenuState

État interne du menu (géré par React useState).

```typescript
interface MenuState {
  /**
   * Indique si le menu mobile est ouvert
   * Desktop: Toujours undefined (menu toujours visible)
   * Mobile: true = ouvert, false = fermé
   */
  isOpen: boolean;
  
  /**
   * ID de l'item actuellement actif (page courante)
   * Déterminé automatiquement via usePathname()
   * null si aucune correspondance trouvée
   */
  activeItemId: string | null;
}
```

**État initial**:
```typescript
const initialMenuState: MenuState = {
  isOpen: false, // Menu fermé par défaut sur mobile
  activeItemId: null, // Sera calculé au premier render
};
```

**Transitions d'état**:
```
Mobile:
  isOpen: false → true (clic sur hamburger)
  isOpen: true → false (clic sur item, clic extérieur, Escape)

Desktop:
  isOpen: N/A (toujours visible)

activeItemId:
  null → 'drilling' (navigation vers /drilling)
  'drilling' → 'cutting' (navigation vers /cutting)
```

## Relations entre Entités

```mermaid
graph TD
    A[MenuConfig] -->|contains| B[MenuItem[]]
    C[MenuState] -->|references| D[activeItemId]
    D -.->|matches| B
    E[RightMenu Component] -->|uses| A
    E -->|manages| C
    E -->|renders| B
```

## Flux de Données

### 1. Initialisation

```typescript
// 1. Configuration statique définie
const menuConfig: MenuConfig = { ... };

// 2. État initial créé
const [menuState, setMenuState] = useState<MenuState>({
  isOpen: false,
  activeItemId: null,
});

// 3. Route actuelle détectée
const pathname = usePathname(); // '/drilling'

// 4. Item actif calculé
const activeItem = menuConfig.items.find(
  item => item.href === pathname
);

// 5. État mis à jour
useEffect(() => {
  setMenuState(prev => ({
    ...prev,
    activeItemId: activeItem?.id || null,
  }));
}, [pathname]);
```

### 2. Interaction Utilisateur (Mobile)

```typescript
// Ouverture du menu
const handleOpen = () => {
  setMenuState(prev => ({ ...prev, isOpen: true }));
};

// Fermeture du menu
const handleClose = () => {
  setMenuState(prev => ({ ...prev, isOpen: false }));
};

// Clic sur un item
const handleItemClick = (item: MenuItem) => {
  // Navigation gérée par Next.js Link
  // Menu se ferme automatiquement sur mobile
  if (isMobile) {
    handleClose();
  }
};
```

### 3. Navigation

```typescript
// Changement de route détecté
pathname: '/drilling' → '/cutting'

// Item actif recalculé
activeItemId: 'drilling' → 'cutting'

// UI mise à jour automatiquement (React re-render)
```

## Validation des Données

### MenuItem Validation

```typescript
function validateMenuItem(item: MenuItem): boolean {
  // ID requis et non vide
  if (!item.id || item.id.trim() === '') {
    console.error('MenuItem.id is required');
    return false;
  }
  
  // Label requis et non vide
  if (!item.label || item.label.trim() === '') {
    console.error('MenuItem.label is required');
    return false;
  }
  
  // Label pas trop long
  if (item.label.length > 30) {
    console.warn(`MenuItem.label too long: ${item.label}`);
  }
  
  // Href requis et commence par '/'
  if (!item.href || !item.href.startsWith('/')) {
    console.error('MenuItem.href must start with /');
    return false;
  }
  
  return true;
}
```

### MenuConfig Validation

```typescript
function validateMenuConfig(config: MenuConfig): boolean {
  // Au moins un item
  if (!config.items || config.items.length === 0) {
    console.error('MenuConfig.items cannot be empty');
    return false;
  }
  
  // Tous les items valides
  if (!config.items.every(validateMenuItem)) {
    return false;
  }
  
  // IDs uniques
  const ids = config.items.map(item => item.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    console.error('MenuItem.id must be unique');
    return false;
  }
  
  // Width positive
  if (config.width <= 0) {
    console.error('MenuConfig.width must be positive');
    return false;
  }
  
  // Breakpoint valide
  if (config.mobileBreakpoint <= 0) {
    console.error('MenuConfig.mobileBreakpoint must be positive');
    return false;
  }
  
  return true;
}
```

## Extensibilité Future

### Ajout d'Icônes

```typescript
// Phase future: Support des icônes
interface MenuItem {
  // ... propriétés existantes
  icon?: {
    type: 'emoji' | 'svg' | 'component';
    value: string | React.ComponentType;
  };
}

// Exemple d'utilisation
const itemWithIcon: MenuItem = {
  id: 'drilling',
  label: 'Gabarits de perçage',
  href: '/drilling',
  icon: {
    type: 'emoji',
    value: '🔨',
  },
};
```

### Sous-Menus (Nested Items)

```typescript
// Phase future: Support des sous-menus
interface MenuItem {
  // ... propriétés existantes
  children?: MenuItem[];
  isExpanded?: boolean;
}

// Exemple d'utilisation
const itemWithChildren: MenuItem = {
  id: 'tools',
  label: 'Outils',
  href: '/tools',
  children: [
    { id: 'drilling', label: 'Perçage', href: '/tools/drilling' },
    { id: 'cutting', label: 'Coupe', href: '/tools/cutting' },
  ],
};
```

### Badges/Notifications

```typescript
// Phase future: Support des badges
interface MenuItem {
  // ... propriétés existantes
  badge?: {
    text: string;
    variant: 'info' | 'warning' | 'success';
  };
}

// Exemple d'utilisation
const itemWithBadge: MenuItem = {
  id: 'creations',
  label: 'Mes créations',
  href: '/creations',
  badge: {
    text: '3',
    variant: 'info',
  },
};
```

## Exemples d'Usage

### Configuration Minimale

```typescript
const minimalConfig: MenuConfig = {
  items: [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'about', label: 'À propos', href: '/about' },
  ],
  width: 280,
  mobileBreakpoint: 768,
};
```

### Configuration Complète

```typescript
const fullConfig: MenuConfig = {
  items: [
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
```

### Gestion Dynamique

```typescript
// Ajout d'un item dynamiquement
const addMenuItem = (newItem: MenuItem) => {
  if (validateMenuItem(newItem)) {
    setMenuConfig(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }
};

// Suppression d'un item
const removeMenuItem = (itemId: string) => {
  setMenuConfig(prev => ({
    ...prev,
    items: prev.items.filter(item => item.id !== itemId),
  }));
};

// Réorganisation des items
const reorderMenuItems = (newOrder: string[]) => {
  setMenuConfig(prev => ({
    ...prev,
    items: newOrder
      .map(id => prev.items.find(item => item.id === id))
      .filter(Boolean) as MenuItem[],
  }));
};
```

## Mapping avec la Spécification

| Requirement | Data Model Element | Notes |
|-------------|-------------------|-------|
| FR-001: Menu fixe desktop | `MenuConfig.width`, `MenuConfig.position` | 280px, position right |
| FR-002: 4 catégories minimum | `MenuConfig.items` | Array de 4 MenuItem |
| FR-003: Navigation cliquable | `MenuItem.href` | Routes Next.js |
| FR-004: Indication visuelle | `MenuState.activeItemId` | Calculé via usePathname |
| FR-005: Menu visible au scroll | N/A | Géré par CSS (position: fixed) |
| FR-006: Menu mobile masqué | `MenuState.isOpen` | false par défaut |
| FR-007: Animation overlay | `MenuState.isOpen` | Transition CSS |
| FR-008: Fermeture au clic | `MenuState.isOpen` | Handlers onClick |
| FR-009: Accessibilité clavier | N/A | Géré par HTML/ARIA |
| FR-010: Noms longs tronqués | `MenuItem.label` | Max 30 chars recommandé |
| FR-011: Largeur 280px | `MenuConfig.width` | Valeur fixe |
| FR-012: Ajustement layout | N/A | Géré par CSS (padding-right) |

## Résumé

Le modèle de données est conçu pour être :
- ✅ **Simple** : 3 interfaces principales seulement
- ✅ **Type-safe** : TypeScript strict pour éviter les erreurs
- ✅ **Extensible** : Propriétés optionnelles pour futures fonctionnalités
- ✅ **Validable** : Fonctions de validation pour garantir l'intégrité
- ✅ **Testable** : Structure claire facilitant les tests unitaires

**Prochaine étape** : Créer les contrats TypeScript dans `contracts/`