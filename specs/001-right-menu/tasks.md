# Implementation Tasks: Menu de Navigation Latéral Droit

**Phase**: 2 - Implementation Tasks  
**Date**: 2025-01-17  
**Status**: Ready for Implementation  
**Estimated Total Time**: 2-3 hours

## Vue d'Ensemble

Ce document décompose l'implémentation du menu latéral droit en tâches atomiques, testables et indépendantes. Chaque tâche peut être complétée et validée séparément.

## Légende

- 🟢 **P1** : Priorité haute (MVP)
- 🟡 **P2** : Priorité moyenne (amélioration)
- 🔵 **P3** : Priorité basse (nice-to-have)
- ⏱️ : Estimation de temps
- ✅ : Critères de validation

---

## Phase 1: Setup & Configuration (30 min)

### Task 1.1: Créer la Structure de Fichiers 🟢 P1
⏱️ **5 minutes**

**Description**: Créer l'arborescence de fichiers pour le composant RightMenu.

**Actions**:
```bash
mkdir -p src/components/RightMenu
touch src/components/RightMenu/types.ts
touch src/components/RightMenu/RightMenu.tsx
touch src/components/RightMenu/MenuItem.tsx
```

**Critères de validation** ✅:
- [ ] Le dossier `src/components/RightMenu/` existe
- [ ] Les 3 fichiers sont créés et vides
- [ ] La structure est visible dans l'explorateur VSCode

**Dépendances**: Aucune

---

### Task 1.2: Définir les Types TypeScript 🟢 P1
⏱️ **15 minutes**

**Description**: Créer toutes les interfaces TypeScript dans `types.ts`.

**Actions**:
1. Copier le contenu de [`contracts.md`](./contracts.md) section "Fichier Complet"
2. Coller dans `src/components/RightMenu/types.ts`
3. Vérifier qu'il n'y a pas d'erreurs TypeScript

**Critères de validation** ✅:
- [ ] Le fichier `types.ts` contient 5 interfaces (MenuItem, MenuConfig, MenuState, RightMenuProps, MenuItemProps)
- [ ] Aucune erreur TypeScript dans VSCode
- [ ] Les imports fonctionnent : `import { MenuItem } from './types'`
- [ ] La documentation JSDoc est présente

**Dépendances**: Task 1.1

**Fichiers modifiés**:
- `src/components/RightMenu/types.ts` (créé)

---

### Task 1.3: Configurer les Breakpoints CSS 🟢 P1
⏱️ **10 minutes**

**Description**: Ajouter les variables CSS et media queries dans `globals.css`.

**Actions**:
1. Ouvrir `src/app/globals.css`
2. Ajouter les styles du menu à la fin du fichier (voir [`quickstart.md`](./quickstart.md) étape 5)

**Critères de validation** ✅:
- [ ] Les styles `.menu-item-link:hover` sont présents
- [ ] Les media queries `@media (max-width: 768px)` et `@media (min-width: 769px)` sont présentes
- [ ] Le fichier CSS est valide (pas d'erreurs de syntaxe)
- [ ] Les styles sont appliqués (vérifier dans DevTools)

**Dépendances**: Aucune

**Fichiers modifiés**:
- `src/app/globals.css` (modifié)

---

## Phase 2: Composants de Base (45 min)

### Task 2.1: Créer le Composant MenuItem 🟢 P1
⏱️ **20 minutes**

**Description**: Implémenter le composant MenuItem qui affiche un item de menu individuel.

**Actions**:
1. Copier le code de [`quickstart.md`](./quickstart.md) étape 3.1
2. Coller dans `src/components/RightMenu/MenuItem.tsx`
3. Ajouter la classe CSS `menu-item-link` au Link

**Critères de validation** ✅:
- [ ] Le composant compile sans erreur
- [ ] Les props TypeScript sont correctement typées
- [ ] Le composant utilise Next.js Link pour la navigation
- [ ] Les attributs ARIA sont présents (aria-current, aria-label)
- [ ] Les styles inline sont appliqués
- [ ] Le style actif (bleu) s'applique quand `isActive={true}`

**Dépendances**: Task 1.2

**Fichiers modifiés**:
- `src/components/RightMenu/MenuItem.tsx` (créé)

**Test manuel**:
```tsx
// Test dans une page temporaire
<MenuItem 
  item={{ id: 'test', label: 'Test', href: '/test' }}
  isActive={true}
  onClick={() => console.log('clicked')}
/>
```

---

### Task 2.2: Créer le Composant RightMenu (Structure de Base) 🟢 P1
⏱️ **25 minutes**

**Description**: Créer la structure de base du composant RightMenu avec gestion d'état.

**Actions**:
1. Copier le code de [`quickstart.md`](./quickstart.md) étape 4.1
2. Coller dans `src/components/RightMenu/RightMenu.tsx`
3. Vérifier les imports

**Critères de validation** ✅:
- [ ] Le composant compile sans erreur
- [ ] Les hooks React sont correctement utilisés (useState, useEffect, useRef)
- [ ] Le hook usePathname est importé de 'next/navigation'
- [ ] Le composant MenuItem est importé et utilisé
- [ ] L'état `menuState` est initialisé correctement
- [ ] La détection de l'item actif fonctionne

**Dépendances**: Task 1.2, Task 2.1

**Fichiers modifiés**:
- `src/components/RightMenu/RightMenu.tsx` (créé)

**Test manuel**:
```tsx
// Test dans layout.tsx temporairement
<RightMenu config={{
  items: [{ id: 'test', label: 'Test', href: '/' }],
  width: 280,
  mobileBreakpoint: 768,
}} />
```

---

## Phase 3: Fonctionnalités Desktop (30 min)

### Task 3.1: Implémenter le Menu Fixe Desktop 🟢 P1
⏱️ **15 minutes**

**Description**: Configurer le menu pour qu'il soit fixe et visible sur desktop.

**Actions**:
1. Vérifier que les styles `position: fixed` sont appliqués
2. Vérifier que la largeur est de 280px
3. Tester le scroll (menu doit rester visible)

**Critères de validation** ✅:
- [ ] Le menu est visible sur le côté droit
- [ ] Le menu a une largeur de 280px
- [ ] Le menu reste fixe lors du scroll
- [ ] Le menu a une bordure gauche et une ombre
- [ ] Le z-index est correct (menu au-dessus du contenu)

**Dépendances**: Task 2.2, Task 1.3

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Ouvrir l'application sur desktop (> 768px)
- Vérifier que le menu est visible
- Scroller la page et vérifier que le menu reste fixe

---

### Task 3.2: Implémenter la Détection de Route Active 🟢 P1
⏱️ **15 minutes**

**Description**: Mettre en évidence l'item de menu correspondant à la page actuelle.

**Actions**:
1. Vérifier que `usePathname()` est utilisé
2. Vérifier que `activeItemId` est calculé correctement
3. Vérifier que le style actif est appliqué

**Critères de validation** ✅:
- [ ] L'item correspondant à la page actuelle est mis en évidence (bleu)
- [ ] La bordure gauche bleue est visible sur l'item actif
- [ ] Le fond bleu clair est appliqué
- [ ] Le texte est en gras (font-weight: 600)
- [ ] L'attribut `aria-current="page"` est présent

**Dépendances**: Task 3.1

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Naviguer entre différentes pages
- Vérifier que l'item actif change à chaque navigation
- Vérifier avec DevTools que `aria-current="page"` est présent

---

## Phase 4: Fonctionnalités Mobile (45 min)

### Task 4.1: Implémenter le Bouton Hamburger 🟢 P1
⏱️ **15 minutes**

**Description**: Ajouter le bouton hamburger visible uniquement sur mobile.

**Actions**:
1. Vérifier que le bouton est présent dans RightMenu.tsx
2. Vérifier que les styles responsive sont appliqués
3. Tester l'ouverture/fermeture du menu

**Critères de validation** ✅:
- [ ] Le bouton hamburger est visible sur mobile (≤ 768px)
- [ ] Le bouton est caché sur desktop (> 768px)
- [ ] Le bouton est positionné en haut à droite (fixed)
- [ ] Le bouton a une ombre et une bordure
- [ ] Cliquer sur le bouton ouvre le menu
- [ ] L'attribut `aria-expanded` change selon l'état

**Dépendances**: Task 2.2, Task 1.3

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Redimensionner le navigateur à < 768px
- Vérifier que le bouton hamburger apparaît
- Cliquer et vérifier que le menu s'ouvre

---

### Task 4.2: Implémenter l'Overlay Mobile 🟢 P1
⏱️ **10 minutes**

**Description**: Ajouter l'overlay sombre derrière le menu mobile ouvert.

**Actions**:
1. Vérifier que l'overlay est présent dans RightMenu.tsx
2. Vérifier que l'overlay est visible uniquement quand le menu est ouvert
3. Tester la fermeture au clic sur l'overlay

**Critères de validation** ✅:
- [ ] L'overlay apparaît quand le menu mobile est ouvert
- [ ] L'overlay couvre tout l'écran (position: fixed, full viewport)
- [ ] L'overlay a un fond semi-transparent noir (rgba(0,0,0,0.5))
- [ ] Cliquer sur l'overlay ferme le menu
- [ ] L'overlay a un z-index inférieur au menu (999 vs 1000)

**Dépendances**: Task 4.1

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Ouvrir le menu mobile
- Vérifier que l'overlay apparaît
- Cliquer sur l'overlay et vérifier que le menu se ferme

---

### Task 4.3: Implémenter l'Animation de Slide 🟢 P1
⏱️ **20 minutes**

**Description**: Ajouter l'animation de slide pour l'ouverture/fermeture du menu mobile.

**Actions**:
1. Vérifier que `transform: translateX()` est utilisé
2. Vérifier que la transition CSS est définie (0.3s)
3. Tester la fluidité de l'animation

**Critères de validation** ✅:
- [ ] Le menu slide depuis la droite à l'ouverture
- [ ] Le menu slide vers la droite à la fermeture
- [ ] L'animation dure 300ms
- [ ] L'animation est fluide (60 FPS)
- [ ] L'animation utilise `ease-in-out`
- [ ] Le menu occupe max 80% de la largeur sur mobile

**Dépendances**: Task 4.1, Task 4.2

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Ouvrir/fermer le menu mobile plusieurs fois
- Vérifier la fluidité avec Chrome DevTools Performance
- Vérifier que l'animation ne lag pas

---

## Phase 5: Accessibilité (30 min)

### Task 5.1: Implémenter la Navigation Clavier 🟢 P1
⏱️ **15 minutes**

**Description**: Permettre la navigation complète au clavier (Tab, Enter, Escape).

**Actions**:
1. Vérifier que tous les éléments interactifs ont `tabIndex`
2. Vérifier que Enter/Space activent les items
3. Vérifier que Escape ferme le menu mobile

**Critères de validation** ✅:
- [ ] Tab permet de naviguer entre les items du menu
- [ ] Shift+Tab permet la navigation inverse
- [ ] Enter active un item de menu (navigation)
- [ ] Escape ferme le menu mobile
- [ ] Le focus est visible (outline bleu)
- [ ] Le focus est restauré après fermeture du menu mobile

**Dépendances**: Task 4.3

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Naviguer uniquement au clavier (sans souris)
- Tester Tab, Shift+Tab, Enter, Escape
- Vérifier que le focus est toujours visible

---

### Task 5.2: Ajouter les Attributs ARIA 🟡 P2
⏱️ **15 minutes**

**Description**: Compléter les attributs ARIA pour les lecteurs d'écran.

**Actions**:
1. Vérifier `role="navigation"` sur le nav
2. Vérifier `aria-label` sur le nav et le bouton
3. Vérifier `aria-expanded` sur le bouton hamburger
4. Vérifier `aria-current="page"` sur l'item actif
5. Vérifier `aria-controls` sur le bouton

**Critères de validation** ✅:
- [ ] `role="navigation"` est présent sur `<nav>`
- [ ] `aria-label="Menu principal"` est présent
- [ ] `aria-expanded` change selon l'état du menu
- [ ] `aria-current="page"` est sur l'item actif uniquement
- [ ] `aria-controls="right-menu"` lie le bouton au menu
- [ ] Tester avec un lecteur d'écran (VoiceOver/NVDA)

**Dépendances**: Task 5.1

**Fichiers modifiés**: Aucun (vérification uniquement)

**Test manuel**:
- Activer VoiceOver (Mac) ou NVDA (Windows)
- Naviguer dans le menu
- Vérifier que les annonces sont correctes

---

## Phase 6: Pages de Destination (30 min)

### Task 6.1: Créer les Pages de Destination 🟢 P1
⏱️ **30 minutes**

**Description**: Créer les 4 pages de destination pour les items du menu.

**Actions**:
1. Créer `src/app/drilling/page.tsx`
2. Créer `src/app/cutting/page.tsx`
3. Créer `src/app/accessories/page.tsx`
4. Créer `src/app/creations/page.tsx`

**Critères de validation** ✅:
- [ ] Les 4 dossiers sont créés dans `src/app/`
- [ ] Chaque dossier contient un `page.tsx`
- [ ] Chaque page a un titre et une description
- [ ] Chaque page a des métadonnées (Metadata)
- [ ] Les pages sont accessibles via leur URL
- [ ] La navigation depuis le menu fonctionne

**Dépendances**: Aucune

**Fichiers modifiés**:
- `src/app/drilling/page.tsx` (créé)
- `src/app/cutting/page.tsx` (créé)
- `src/app/accessories/page.tsx` (créé)
- `src/app/creations/page.tsx` (créé)

**Template de page**:
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[Titre] - CoopCraft',
  description: '[Description]',
};

export default function [Name]Page() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>[Titre]</h1>
        <p style={styles.description}>[Description]</p>
      </div>
    </main>
  );
}

const styles = { /* ... */ };
```

---

## Phase 7: Intégration & Tests (30 min)

### Task 7.1: Intégrer le Menu dans le Layout 🟢 P1
⏱️ **15 minutes**

**Description**: Ajouter le composant RightMenu dans le layout principal.

**Actions**:
1. Ouvrir `src/app/layout.tsx`
2. Importer RightMenu et MenuConfig
3. Créer la configuration du menu
4. Ajouter `<RightMenu config={menuConfig} />` dans le body

**Critères de validation** ✅:
- [ ] Le menu est visible sur toutes les pages
- [ ] La configuration contient les 5 items (home + 4 catégories)
- [ ] Chaque item a un id, label, href et description
- [ ] Le menu ne cause pas d'erreur de compilation
- [ ] Le menu ne cause pas d'erreur runtime

**Dépendances**: Task 2.2, Task 6.1

**Fichiers modifiés**:
- `src/app/layout.tsx` (modifié)

**Code à ajouter**:
```tsx
import RightMenu from '@/components/RightMenu/RightMenu';
import { MenuConfig } from '@/components/RightMenu/types';

const menuConfig: MenuConfig = {
  items: [
    { id: 'home', label: 'Accueil', href: '/', description: '...' },
    { id: 'drilling', label: 'Gabarits de perçage', href: '/drilling', description: '...' },
    { id: 'cutting', label: 'Guides de coupe', href: '/cutting', description: '...' },
    { id: 'accessories', label: 'Accessoires d\'atelier', href: '/accessories', description: '...' },
    { id: 'creations', label: 'Mes créations', href: '/creations', description: '...' },
  ],
  width: 280,
  mobileBreakpoint: 768,
  position: 'right',
};

// Dans le return
<body>
  <RightMenu config={menuConfig} />
  {children}
</body>
```

---

### Task 7.2: Tests de Validation Finale 🟢 P1
⏱️ **15 minutes**

**Description**: Exécuter tous les tests de validation pour confirmer que les critères de succès sont atteints.

**Actions**:
1. Tester sur desktop (> 768px)
2. Tester sur mobile (≤ 768px)
3. Tester l'accessibilité clavier
4. Tester la performance avec Lighthouse

**Critères de validation** ✅:

**Desktop**:
- [ ] Menu visible sur le côté droit (280px)
- [ ] Contenu principal ajusté (padding-right: 280px)
- [ ] Item actif mis en évidence
- [ ] Hover change le style
- [ ] Navigation fonctionne
- [ ] Menu reste visible au scroll

**Mobile**:
- [ ] Bouton hamburger visible
- [ ] Menu caché par défaut
- [ ] Clic hamburger ouvre le menu
- [ ] Overlay apparaît
- [ ] Clic overlay ferme le menu
- [ ] Clic item ferme le menu et navigue
- [ ] Escape ferme le menu
- [ ] Menu < 80% largeur

**Accessibilité**:
- [ ] Tab fonctionne
- [ ] Enter/Space activent
- [ ] Escape ferme
- [ ] ARIA présents
- [ ] Focus visible

**Performance** (Lighthouse):
- [ ] Performance > 90
- [ ] Accessibility > 95
- [ ] FCP < 1.5s
- [ ] TTI < 3s

**Dépendances**: Toutes les tâches précédentes

**Fichiers modifiés**: Aucun (tests uniquement)

---

## Checklist Finale

### Critères de Succès (de la spec)

- [ ] **SC-001**: Accès à une catégorie en < 2 secondes ✅
- [ ] **SC-002**: Compatible Chrome/Firefox/Safari/Edge ✅
- [ ] **SC-003**: Impact chargement < 100ms ✅
- [ ] **SC-004**: 95% identification position ✅
- [ ] **SC-005**: Animation < 300ms à 60fps ✅
- [ ] **SC-006**: Accessibilité clavier 100% ✅
- [ ] **SC-007**: Menu mobile < 80% largeur ✅

### Exigences Fonctionnelles (de la spec)

- [ ] **FR-001**: Menu fixe desktop > 768px ✅
- [ ] **FR-002**: 4 catégories minimum ✅
- [ ] **FR-003**: Navigation cliquable ✅
- [ ] **FR-004**: Indication visuelle page active ✅
- [ ] **FR-005**: Menu visible au scroll ✅
- [ ] **FR-006**: Menu mobile masqué par défaut ✅
- [ ] **FR-007**: Animation overlay fluide ✅
- [ ] **FR-008**: Fermeture au clic extérieur ✅
- [ ] **FR-009**: Accessibilité clavier ✅
- [ ] **FR-010**: Noms longs tronqués ✅
- [ ] **FR-011**: Largeur 280px ✅
- [ ] **FR-012**: Ajustement layout ✅

## Ordre d'Exécution Recommandé

1. **Setup** (Task 1.1 → 1.2 → 1.3)
2. **Composants** (Task 2.1 → 2.2)
3. **Desktop** (Task 3.1 → 3.2)
4. **Mobile** (Task 4.1 → 4.2 → 4.3)
5. **Accessibilité** (Task 5.1 → 5.2)
6. **Pages** (Task 6.1)
7. **Intégration** (Task 7.1 → 7.2)

## Estimation Totale

- Phase 1: 30 min
- Phase 2: 45 min
- Phase 3: 30 min
- Phase 4: 45 min
- Phase 5: 30 min
- Phase 6: 30 min
- Phase 7: 30 min

**Total**: ~3h 40min (avec marge de sécurité)

## Notes d'Implémentation

- Suivre le guide [`quickstart.md`](./quickstart.md) pour le code détaillé
- Référencer [`contracts.md`](./contracts.md) pour les types TypeScript
- Consulter [`research.md`](./research.md) pour les décisions techniques
- Valider chaque tâche avant de passer à la suivante
- Commiter régulièrement (après chaque phase)

## Commit Messages Suggérés

```bash
# Après Phase 1
git commit -m "feat(menu): setup RightMenu component structure"

# Après Phase 2
git commit -m "feat(menu): implement MenuItem and RightMenu base components"

# Après Phase 3
git commit -m "feat(menu): add desktop fixed menu with active state"

# Après Phase 4
git commit -m "feat(menu): add mobile hamburger menu with animations"

# Après Phase 5
git commit -m "feat(menu): add keyboard navigation and ARIA attributes"

# Après Phase 6
git commit -m "feat(menu): create destination pages"

# Après Phase 7
git commit -m "feat(menu): integrate menu in layout and validate

- Add RightMenu component with mobile/desktop support
- Implement responsive behavior (hamburger on mobile)
- Add accessibility features (ARIA, keyboard navigation)
- Create destination pages (drilling, cutting, accessories, creations)
- Add CSS animations for smooth transitions

Closes #001-right-menu"
```

**Prêt pour l'implémentation ! 🚀**