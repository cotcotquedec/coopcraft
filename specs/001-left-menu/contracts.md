# Interface Contracts: Menu de Navigation à Gauche

**Feature**: 001-left-menu  
**Date**: 2025-11-17  
**Phase**: 1 - Design & Contracts

## Overview

Ce document définit les contrats d'interface pour le composant [`LeftMenu`](../../src/components/LeftMenu/LeftMenu.tsx) et ses sous-composants. Ces contrats garantissent la cohérence, la maintenabilité et l'interopérabilité du code.

## Component Contracts

### LeftMenu Component

**File**: [`src/components/LeftMenu/LeftMenu.tsx`](../../src/components/LeftMenu/LeftMenu.tsx)

#### Props Contract

```typescript
interface LeftMenuProps {
  /** Configuration du menu */
  config: MenuConfig;
}
```

**Required Props**:
- `config`: Configuration complète du menu (voir [MenuConfig Contract](#menuconfig-contract))

**Optional Props**: Aucune

#### Behavior Contract

**Responsibilities**:
1. ✅ Afficher le menu de navigation à gauche de l'écran
2. ✅ Gérer l'état d'ouverture/fermeture sur mobile
3. ✅ Déterminer automatiquement l'élément actif basé sur le pathname
4. ✅ Gérer les événements clavier (Escape pour fermer)
5. ✅ Gérer le clic extérieur pour fermer le menu (mobile)
6. ✅ Rendre les éléments de menu via le composant [`MenuItem`](../../src/components/LeftMenu/MenuItem.tsx)

**State Management**:
```typescript
interface MenuState {
  isOpen: boolean;        // Menu ouvert (mobile uniquement)
  activeItemId: string | null;  // ID de l'item actif
}
```

**Side Effects**:
- Écoute les changements de pathname via `usePathname()`
- Ajoute/retire des event listeners (mousedown, keydown)
- Met à jour l'état interne basé sur les interactions utilisateur

**Performance Guarantees**:
- ✅ Re-render uniquement quand pathname ou menuState change
- ✅ Cleanup des event listeners à l'unmount
- ✅ Pas de memory leaks

#### Accessibility Contract

**ARIA Attributes**:
```typescript
// Bouton hamburger
<button
  aria-label="Ouvrir le menu" | "Fermer le menu"
  aria-expanded={isOpen}
  aria-controls="left-menu"
>

// Menu principal
<nav
  id="left-menu"
  role="navigation"
  aria-label="Menu principal"
>
```

**Keyboard Support**:
- `Escape`: Ferme le menu (mobile)
- `Tab`: Navigation entre items
- `Enter`: Active un item

**Screen Reader Support**:
- ✅ Semantic HTML (`<nav>`, `<ul>`, `<li>`)
- ✅ ARIA labels descriptifs
- ✅ État du menu annoncé (ouvert/fermé)

#### CSS Contract

**Required Classes**:
```css
.menu-hamburger    /* Bouton hamburger */
.menu-overlay      /* Overlay mobile */
.menu-nav          /* Menu principal */
.menu-open         /* Menu ouvert (mobile) */
```

**Required Styles** (inline):
```typescript
styles.hamburger   // Position, z-index, apparence
styles.overlay     // Overlay semi-transparent
styles.menu        // Position fixe, dimensions
styles.list        // Liste des items
```

**Responsive Behavior**:
- Desktop (>768px): Menu toujours visible, hamburger caché
- Mobile (≤768px): Menu caché par défaut, hamburger visible

#### Example Usage

```typescript
import LeftMenu from '@/components/LeftMenu/LeftMenu';
import { MenuConfig } from '@/components/LeftMenu/types';

const config: MenuConfig = {
  items: [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'about', label: 'À propos', href: '/about' },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'left',
};

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <LeftMenu config={config} />
        {children}
      </body>
    </html>
  );
}
```

---

### MenuItem Component

**File**: [`src/components/LeftMenu/MenuItem.tsx`](../../src/components/LeftMenu/MenuItem.tsx)

#### Props Contract

```typescript
interface MenuItemProps {
  /** Données de l'item */
  item: MenuItem;
  
  /** Item actuellement actif */
  isActive: boolean;
  
  /** Callback au clic (optionnel) */
  onClick?: () => void;
}
```

**Required Props**:
- `item`: Données de l'élément de menu (voir [MenuItem Contract](#menuitem-contract))
- `isActive`: Indique si cet item est actuellement actif

**Optional Props**:
- `onClick`: Callback appelé au clic (utilisé pour fermer le menu mobile)

#### Behavior Contract

**Responsibilities**:
1. ✅ Afficher un élément de menu cliquable
2. ✅ Appliquer les styles actifs si `isActive === true`
3. ✅ Naviguer vers `item.href` au clic
4. ✅ Appeler `onClick` callback si fourni
5. ✅ Afficher l'icône si présente
6. ✅ Fournir une description accessible

**Navigation**:
- Utilise Next.js `<Link>` pour navigation client-side
- Pas de rechargement de page
- Préchargement automatique des routes

**Visual States**:
- Default: Gris neutre
- Hover: Fond gris clair
- Active: Fond bleu clair + bordure bleue
- Focus: Outline bleu

#### Accessibility Contract

**ARIA Attributes**:
```typescript
<Link
  aria-current={isActive ? 'page' : undefined}
  aria-label={item.description || item.label}
>
```

**Keyboard Support**:
- `Tab`: Focus sur l'item
- `Enter`: Active l'item (navigation)
- `Space`: Active l'item (navigation)

**Screen Reader Support**:
- ✅ `aria-current="page"` pour item actif
- ✅ `aria-label` descriptif
- ✅ Semantic HTML (`<li>`, `<a>`)

#### CSS Contract

**Required Classes**:
```css
.menu-item-link       /* Lien de l'item */
.menu-item-link:hover /* État hover */
.menu-item-link:focus-visible /* État focus */
```

**Required Styles** (inline):
```typescript
styles.listItem    // Container de l'item
styles.link        // Lien par défaut
styles.linkActive  // Lien actif
styles.icon        // Icône
styles.label       // Libellé
```

#### Example Usage

```typescript
import MenuItem from '@/components/LeftMenu/MenuItem';

const item = {
  id: 'home',
  label: 'Accueil',
  href: '/',
  icon: '🏠',
  description: 'Retour à la page d\'accueil'
};

<MenuItem
  item={item}
  isActive={true}
  onClick={() => console.log('Item clicked')}
/>
```

---

## Data Contracts

### MenuConfig Contract

**Interface**: [`MenuConfig`](../../src/components/LeftMenu/types.ts:25)

```typescript
interface MenuConfig {
  items: MenuItem[];
  width: number;
  mobileBreakpoint: number;
  position?: 'left' | 'right';
}
```

**Field Contracts**:

| Field | Type | Required | Constraints | Default |
|-------|------|----------|-------------|---------|
| `items` | `MenuItem[]` | ✅ Yes | Non-empty array, max 20 items recommended | - |
| `width` | `number` | ✅ Yes | 200-400 pixels recommended | - |
| `mobileBreakpoint` | `number` | ✅ Yes | Typically 768px | - |
| `position` | `'left' \| 'right'` | ❌ No | Must be 'left' or 'right' | `'right'` |

**Validation Rules**:
```typescript
// items
assert(config.items.length > 0, 'items cannot be empty');
assert(config.items.length <= 20, 'max 20 items recommended');

// width
assert(config.width >= 200, 'width should be >= 200px');
assert(config.width <= 400, 'width should be <= 400px');

// mobileBreakpoint
assert(config.mobileBreakpoint > 0, 'mobileBreakpoint must be positive');

// position
assert(['left', 'right'].includes(config.position), 'position must be left or right');
```

**Example**:
```typescript
const config: MenuConfig = {
  items: [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'about', label: 'À propos', href: '/about' },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'left',
};
```

---

### MenuItem Contract

**Interface**: [`MenuItem`](../../src/components/LeftMenu/types.ts:9)

```typescript
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
}
```

**Field Contracts**:

| Field | Type | Required | Constraints | Default |
|-------|------|----------|-------------|---------|
| `id` | `string` | ✅ Yes | Unique within items array, non-empty | - |
| `label` | `string` | ✅ Yes | Non-empty, max 50 chars recommended | - |
| `href` | `string` | ✅ Yes | Valid Next.js route (starts with `/`) | - |
| `icon` | `string` | ❌ No | Emoji Unicode or React component | - |
| `description` | `string` | ❌ No | Used for aria-label | - |

**Validation Rules**:
```typescript
// id
assert(item.id.length > 0, 'id cannot be empty');
assert(isUnique(item.id, allItems), 'id must be unique');

// label
assert(item.label.length > 0, 'label cannot be empty');
assert(item.label.length <= 50, 'label should be <= 50 chars');

// href
assert(item.href.startsWith('/'), 'href must start with /');
assert(isValidRoute(item.href), 'href must be valid Next.js route');

// icon (optional)
if (item.icon) {
  assert(isValidEmoji(item.icon) || isReactComponent(item.icon), 'icon must be emoji or React component');
}

// description (optional)
if (item.description) {
  assert(item.description.length > 0, 'description cannot be empty');
}
```

**Example**:
```typescript
const item: MenuItem = {
  id: 'home',
  label: 'Accueil',
  href: '/',
  icon: '🏠',
  description: 'Retour à la page d\'accueil',
};
```

---

### MenuState Contract

**Interface**: [`MenuState`](../../src/components/LeftMenu/types.ts:39)

```typescript
interface MenuState {
  isOpen: boolean;
  activeItemId: string | null;
}
```

**Field Contracts**:

| Field | Type | Required | Constraints | Default |
|-------|------|----------|-------------|---------|
| `isOpen` | `boolean` | ✅ Yes | - | `false` |
| `activeItemId` | `string \| null` | ✅ Yes | Must match an item.id or be null | `null` |

**State Transitions**:
```typescript
// Initial state
{ isOpen: false, activeItemId: null }

// User opens menu (mobile)
{ isOpen: true, activeItemId: null }

// User navigates to /home
{ isOpen: false, activeItemId: 'home' }

// User clicks outside (mobile)
{ isOpen: false, activeItemId: 'home' }
```

**Invariants**:
- `isOpen` only affects mobile behavior (ignored on desktop)
- `activeItemId` must always reference a valid item or be `null`
- State updates are atomic (no partial updates)

---

## Event Contracts

### onClick Event

**Signature**:
```typescript
onClick?: () => void;
```

**Contract**:
- Called when user clicks a menu item
- Called **before** navigation occurs
- Used to close mobile menu
- No parameters, no return value
- Must not throw errors

**Example**:
```typescript
const handleItemClick = () => {
  setMenuState(prev => ({ ...prev, isOpen: false }));
};

<MenuItem item={item} isActive={false} onClick={handleItemClick} />
```

---

## CSS Contracts

### Global Styles Contract

**File**: [`src/app/globals.css`](../../src/app/globals.css)

**Required Classes**:

```css
/* Menu Item Styles */
.menu-item-link { /* Default state */ }
.menu-item-link:hover { /* Hover state */ }
.menu-item-link:focus-visible { /* Focus state */ }

/* Mobile Styles (≤768px) */
@media (max-width: 768px) {
  .menu-hamburger { display: block !important; }
  .menu-overlay { display: block !important; }
  .menu-nav { transform: translateX(-100%) !important; }
  .menu-nav.menu-open { transform: translateX(0) !important; }
  body { padding-left: 0 !important; }
}

/* Desktop Styles (>768px) */
@media (min-width: 769px) {
  .menu-hamburger { display: none !important; }
  .menu-overlay { display: none !important; }
  .menu-nav { transform: translateX(0) !important; }
  body { padding-left: 280px; }
}
```

**Contract Guarantees**:
- ✅ Responsive behavior at 768px breakpoint
- ✅ Smooth transitions (0.3s ease-in-out)
- ✅ Proper z-index layering (overlay: 999, menu: 1000, hamburger: 1001)
- ✅ Accessibility (focus indicators, hover states)

---

## Performance Contracts

### Rendering Performance

**Guarantees**:
- ✅ Initial render < 16ms (60 FPS)
- ✅ Re-render on pathname change < 16ms
- ✅ Animation at 60 FPS (GPU-accelerated)
- ✅ No layout thrashing

**Optimization Strategies**:
```typescript
// Memoize MenuItem if needed
const MenuItem = memo(function MenuItem(props) { ... });

// Use useCallback for handlers
const handleToggle = useCallback(() => { ... }, []);

// Cleanup event listeners
useEffect(() => {
  // ...
  return () => removeEventListener(...);
}, []);
```

### Bundle Size

**Guarantees**:
- ✅ Component code < 5KB (minified)
- ✅ No external dependencies
- ✅ Tree-shakeable exports

---

## Error Handling Contracts

### Invalid Configuration

**Behavior**:
```typescript
// Empty items array
config.items = [];
// → TypeScript error at compile time
// → Runtime: render nothing or show error message

// Invalid position
config.position = 'top';
// → TypeScript error at compile time

// Invalid href
item.href = 'invalid-route';
// → Runtime: Next.js 404 error on click
```

**Error Boundaries**:
- Component should not crash the entire app
- Invalid config should log warning to console
- Graceful degradation when possible

---

## Testing Contracts

### Unit Tests

**Required Test Cases**:
```typescript
describe('LeftMenu', () => {
  it('renders all menu items', () => { ... });
  it('highlights active item based on pathname', () => { ... });
  it('opens/closes on hamburger click (mobile)', () => { ... });
  it('closes on outside click (mobile)', () => { ... });
  it('closes on Escape key (mobile)', () => { ... });
  it('navigates on item click', () => { ... });
});

describe('MenuItem', () => {
  it('renders label and icon', () => { ... });
  it('applies active styles when isActive=true', () => { ... });
  it('calls onClick when clicked', () => { ... });
  it('navigates to href', () => { ... });
});
```

### Integration Tests

**Required Test Cases**:
```typescript
describe('LeftMenu Integration', () => {
  it('updates active item on navigation', () => { ... });
  it('works across all breakpoints', () => { ... });
  it('maintains state during navigation', () => { ... });
});
```

### Accessibility Tests

**Required Test Cases**:
```typescript
describe('LeftMenu Accessibility', () => {
  it('has correct ARIA attributes', () => { ... });
  it('supports keyboard navigation', () => { ... });
  it('announces state changes to screen readers', () => { ... });
  it('has sufficient color contrast', () => { ... });
});
```

---

## Migration Contract

### From RightMenu to LeftMenu

**Breaking Changes**: None (API identical)

**Required Changes**:
```typescript
// 1. Import
- import RightMenu from '@/components/RightMenu/RightMenu';
+ import LeftMenu from '@/components/LeftMenu/LeftMenu';

// 2. Config
const config: MenuConfig = {
  // ...
-  position: 'right',
+  position: 'left',
};

// 3. Usage
- <RightMenu config={config} />
+ <LeftMenu config={config} />
```

**Backward Compatibility**:
- ✅ All props compatible
- ✅ All types compatible
- ✅ All behaviors preserved
- ✅ Can coexist temporarily (different names)

---

## Versioning Contract

**Current Version**: 1.0.0

**Semantic Versioning**:
- **Major** (X.0.0): Breaking changes to props or behavior
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, no API changes

**Deprecation Policy**:
- Deprecated features marked with `@deprecated` JSDoc
- Minimum 2 versions before removal
- Migration guide provided

---

## Documentation Contract

**Required Documentation**:
- ✅ JSDoc comments on all public interfaces
- ✅ TypeScript types for all props
- ✅ Usage examples in comments
- ✅ README with quick start guide

**Example**:
```typescript
/**
 * Menu de navigation latéral gauche
 * 
 * @example
 * ```tsx
 * <LeftMenu config={{
 *   items: [{ id: 'home', label: 'Accueil', href: '/' }],
 *   width: 280,
 *   mobileBreakpoint: 768,
 *   position: 'left'
 * }} />
 * ```
 */
export default function LeftMenu({ config }: LeftMenuProps) {
  // ...
}
```

---

## Conclusion

Ces contrats garantissent:
- ✅ **Cohérence**: Comportement prévisible et documenté
- ✅ **Maintenabilité**: Code facile à comprendre et modifier
- ✅ **Interopérabilité**: Intégration simple avec autres composants
- ✅ **Qualité**: Standards élevés de performance et accessibilité
- ✅ **Évolutivité**: Facilité d'extension et de migration

**Prochaines étapes**:
1. Valider ces contrats avec l'équipe
2. Implémenter selon les contrats définis
3. Écrire les tests basés sur les contrats
4. Documenter les déviations si nécessaire

---

**Document validé par**: [À compléter]  
**Date de validation**: [À compléter]  
**Version**: 1.0.0