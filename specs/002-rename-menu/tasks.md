# Implementation Tasks: Renommage du composant LeftMenu en Menu

**Phase**: 2 - Implementation Tasks  
**Date**: 2025-01-17  
**Status**: Ready for Implementation  
**Estimated Total Time**: 35 minutes

## Vue d'Ensemble

Ce document décompose le renommage du composant LeftMenu en Menu en tâches atomiques, testables et indépendantes. Chaque tâche peut être complétée et validée séparément.

## Légende

- 🟢 **P1** : Priorité haute (critique)
- ⏱️ : Estimation de temps
- ✅ : Critères de validation

---

## Phase 1: Renommage de la Structure (5 min)

### Task 1.1: Renommer le Dossier Principal 🟢 P1
⏱️ **2 minutes**

**Description**: Renommer le dossier `LeftMenu` en `Menu`.

**Actions**:
```bash
# Depuis la racine du projet
mv src/components/LeftMenu src/components/Menu
```

**Critères de validation** ✅:
- [ ] Le dossier `src/components/Menu/` existe
- [ ] Le dossier `src/components/LeftMenu/` n'existe plus
- [ ] Les 3 fichiers sont présents dans le nouveau dossier :
  - [ ] `Menu.tsx` (à renommer)
  - [ ] `MenuItem.tsx` (inchangé)
  - [ ] `types.ts` (à modifier)

**Dépendances**: Aucune

**Fichiers impactés**:
- `src/components/LeftMenu/` → `src/components/Menu/` (renommé)

---

### Task 1.2: Renommer le Fichier Principal 🟢 P1
⏱️ **1 minute**

**Description**: Renommer `LeftMenu.tsx` en `Menu.tsx`.

**Actions**:
```bash
cd src/components/Menu
mv LeftMenu.tsx Menu.tsx
```

**Critères de validation** ✅:
- [ ] Le fichier `src/components/Menu/Menu.tsx` existe
- [ ] Le fichier `LeftMenu.tsx` n'existe plus
- [ ] Le contenu du fichier est intact

**Dépendances**: Task 1.1

**Fichiers impactés**:
- `src/components/Menu/LeftMenu.tsx` → `src/components/Menu/Menu.tsx` (renommé)

---

### Task 1.3: Vérifier la Structure 🟢 P1
⏱️ **2 minutes**

**Description**: Vérifier que la nouvelle structure est correcte.

**Actions**:
```bash
# Lister les fichiers du dossier Menu
ls -la src/components/Menu/
```

**Critères de validation** ✅:
- [ ] Le dossier contient exactement 3 fichiers :
  - [ ] `Menu.tsx`
  - [ ] `MenuItem.tsx`
  - [ ] `types.ts`
- [ ] Aucun fichier `LeftMenu.tsx` n'existe
- [ ] La structure est visible dans l'explorateur VSCode

**Dépendances**: Task 1.1, Task 1.2

**Fichiers impactés**: Aucun (vérification uniquement)

---

## Phase 2: Mise à Jour du Code (20 min)

### Task 2.1: Mettre à Jour Menu.tsx - Imports 🟢 P1
⏱️ **3 minutes**

**Description**: Mettre à jour l'import de l'interface dans [`Menu.tsx`](../../src/components/Menu/Menu.tsx).

**Fichier**: `src/components/Menu/Menu.tsx`

**Changements à effectuer**:

**Ligne 6** - Import de l'interface:
```typescript
// Avant
import { LeftMenuProps, MenuState } from './types';

// Après
import { MenuProps, MenuState } from './types';
```

**Critères de validation** ✅:
- [ ] L'import utilise `MenuProps` au lieu de `LeftMenuProps`
- [ ] Aucune erreur TypeScript dans VSCode
- [ ] L'import de `MenuState` reste inchangé

**Dépendances**: Task 1.2

**Fichiers modifiés**:
- `src/components/Menu/Menu.tsx` (ligne 6)

---

### Task 2.2: Mettre à Jour Menu.tsx - Signature de Fonction 🟢 P1
⏱️ **2 minutes**

**Description**: Renommer la fonction exportée de `LeftMenu` en `Menu`.

**Fichier**: `src/components/Menu/Menu.tsx`

**Changements à effectuer**:

**Ligne 8** - Signature de la fonction:
```typescript
// Avant
export default function LeftMenu({ config }: LeftMenuProps) {

// Après
export default function Menu({ config }: MenuProps) {
```

**Critères de validation** ✅:
- [ ] La fonction s'appelle `Menu`
- [ ] Le type des props est `MenuProps`
- [ ] L'export default est présent
- [ ] Aucune erreur TypeScript

**Dépendances**: Task 2.1

**Fichiers modifiés**:
- `src/components/Menu/Menu.tsx` (ligne 8)

---

### Task 2.3: Mettre à Jour Menu.tsx - Attributs ARIA 🟢 P1
⏱️ **5 minutes**

**Description**: Mettre à jour les attributs ARIA et IDs pour refléter le nouveau nom.

**Fichier**: `src/components/Menu/Menu.tsx`

**Changements à effectuer**:

**Ligne 70** - Attribut aria-controls du bouton hamburger:
```typescript
// Avant
aria-controls="left-menu"

// Après
aria-controls="menu"
```

**Ligne 89** - ID du nav:
```typescript
// Avant
id="left-menu"

// Après
id="menu"
```

**Critères de validation** ✅:
- [ ] `aria-controls="menu"` sur le bouton hamburger
- [ ] `id="menu"` sur l'élément `<nav>`
- [ ] Les deux attributs correspondent (cohérence ARIA)
- [ ] Les classes CSS restent inchangées :
  - [ ] `menu-hamburger` (ligne 72)
  - [ ] `menu-overlay` (ligne 82)
  - [ ] `menu-nav` (ligne 97)
  - [ ] `menu-open` (ligne 97)

**Dépendances**: Task 2.2

**Fichiers modifiés**:
- `src/components/Menu/Menu.tsx` (lignes 70, 89)

---

### Task 2.4: Mettre à Jour types.ts - Commentaires 🟢 P1
⏱️ **3 minutes**

**Description**: Mettre à jour les commentaires JSDoc dans [`types.ts`](../../src/components/Menu/types.ts).

**Fichier**: `src/components/Menu/types.ts`

**Changements à effectuer**:

**Lignes 2-3** - Commentaire du module:
```typescript
// Avant
 * Types et interfaces pour le menu de navigation latéral gauche
 * @module LeftMenu/types

// Après
 * Types et interfaces pour le menu de navigation
 * @module Menu/types
```

**Lignes 47-48** - Commentaire de l'interface:
```typescript
// Avant
/**
 * Props du composant LeftMenu
 */

// Après
/**
 * Props du composant Menu
 */
```

**Critères de validation** ✅:
- [ ] Le commentaire du module ne mentionne plus "latéral gauche"
- [ ] Le module s'appelle `Menu/types`
- [ ] Le commentaire de l'interface mentionne "Menu" au lieu de "LeftMenu"
- [ ] La documentation JSDoc est valide

**Dépendances**: Task 1.2

**Fichiers modifiés**:
- `src/components/Menu/types.ts` (lignes 2-3, 47-48)

---

### Task 2.5: Mettre à Jour types.ts - Interface 🟢 P1
⏱️ **2 minutes**

**Description**: Renommer l'interface `LeftMenuProps` en `MenuProps`.

**Fichier**: `src/components/Menu/types.ts`

**Changements à effectuer**:

**Ligne 49** - Nom de l'interface:
```typescript
// Avant
export interface LeftMenuProps {

// Après
export interface MenuProps {
```

**Critères de validation** ✅:
- [ ] L'interface s'appelle `MenuProps`
- [ ] L'export est présent
- [ ] Le contenu de l'interface reste inchangé
- [ ] Aucune erreur TypeScript

**Dépendances**: Task 2.4

**Fichiers modifiés**:
- `src/components/Menu/types.ts` (ligne 49)

---

### Task 2.6: Mettre à Jour layout.tsx - Imports 🟢 P1
⏱️ **3 minutes**

**Description**: Mettre à jour les imports dans [`layout.tsx`](../../src/app/layout.tsx).

**Fichier**: `src/app/layout.tsx`

**Changements à effectuer**:

**Ligne 3** - Import du composant:
```typescript
// Avant
import LeftMenu from '@/components/LeftMenu/LeftMenu';

// Après
import Menu from '@/components/Menu/Menu';
```

**Ligne 4** - Import des types:
```typescript
// Avant
import { MenuConfig } from '@/components/LeftMenu/types';

// Après
import { MenuConfig } from '@/components/Menu/types';
```

**Critères de validation** ✅:
- [ ] L'import du composant pointe vers `@/components/Menu/Menu`
- [ ] L'import des types pointe vers `@/components/Menu/types`
- [ ] Le composant importé s'appelle `Menu`
- [ ] Aucune erreur TypeScript

**Dépendances**: Task 2.5

**Fichiers modifiés**:
- `src/app/layout.tsx` (lignes 3-4)

---

### Task 2.7: Mettre à Jour layout.tsx - Utilisation du Composant 🟢 P1
⏱️ **2 minutes**

**Description**: Mettre à jour l'utilisation du composant dans le JSX.

**Fichier**: `src/app/layout.tsx`

**Changements à effectuer**:

**Ligne 58** - Utilisation du composant:
```typescript
// Avant
<LeftMenu config={menuConfig} />

// Après
<Menu config={menuConfig} />
```

**Critères de validation** ✅:
- [ ] Le composant utilisé s'appelle `<Menu />`
- [ ] La prop `config` est toujours passée
- [ ] Le JSX est valide
- [ ] Aucune erreur de compilation

**Dépendances**: Task 2.6

**Fichiers modifiés**:
- `src/app/layout.tsx` (ligne 58)

---

## Phase 3: Mise à Jour de la Documentation (10 min)

### Task 3.1: Renommer le Dossier de Spec 🟢 P1
⏱️ **1 minute**

**Description**: Renommer le dossier de spécification pour cohérence.

**Actions**:
```bash
# Depuis la racine du projet
mv specs/001-left-menu specs/001-menu
```

**Critères de validation** ✅:
- [ ] Le dossier `specs/001-menu/` existe
- [ ] Le dossier `specs/001-left-menu/` n'existe plus
- [ ] Tous les fichiers sont présents dans le nouveau dossier

**Dépendances**: Aucune

**Fichiers impactés**:
- `specs/001-left-menu/` → `specs/001-menu/` (renommé)

---

### Task 3.2: Mettre à Jour spec.md 🟢 P1
⏱️ **2 minutes**

**Description**: Mettre à jour les références dans [`spec.md`](../001-menu/spec.md).

**Fichier**: `specs/001-menu/spec.md`

**Changements à effectuer** (recherche/remplacement):
- `LeftMenu` → `Menu`
- `left-menu` → `menu`
- `LeftMenuProps` → `MenuProps`
- `@/components/LeftMenu/` → `@/components/Menu/`

**Critères de validation** ✅:
- [ ] Aucune référence à "LeftMenu" ne subsiste
- [ ] Aucune référence à "left-menu" ne subsiste (sauf dans les classes CSS)
- [ ] Les liens vers les fichiers sont à jour
- [ ] Le markdown est valide

**Dépendances**: Task 3.1

**Fichiers modifiés**:
- `specs/001-menu/spec.md`

---

### Task 3.3: Mettre à Jour plan.md 🟢 P1
⏱️ **2 minutes**

**Description**: Mettre à jour les références dans [`plan.md`](../001-menu/plan.md).

**Fichier**: `specs/001-menu/plan.md`

**Changements à effectuer** (recherche/remplacement):
- `LeftMenu` → `Menu`
- `left-menu` → `menu`
- `LeftMenuProps` → `MenuProps`
- `@/components/LeftMenu/` → `@/components/Menu/`
- `specs/001-left-menu/` → `specs/001-menu/`

**Critères de validation** ✅:
- [ ] Tous les liens sont à jour
- [ ] Les exemples de code utilisent "Menu"
- [ ] Les diagrammes Mermaid sont à jour
- [ ] Le markdown est valide

**Dépendances**: Task 3.2

**Fichiers modifiés**:
- `specs/001-menu/plan.md`

---

### Task 3.4: Mettre à Jour les Autres Fichiers de Documentation 🟢 P1
⏱️ **5 minutes**

**Description**: Mettre à jour les 4 fichiers restants de documentation.

**Fichiers**: 
- `specs/001-menu/data-model.md`
- `specs/001-menu/research.md`
- `specs/001-menu/contracts.md`
- `specs/001-menu/quickstart.md`

**Changements à effectuer** (recherche/remplacement dans chaque fichier):
- `LeftMenu` → `Menu`
- `left-menu` → `menu`
- `LeftMenuProps` → `MenuProps`
- `@/components/LeftMenu/` → `@/components/Menu/`
- `specs/001-left-menu/` → `specs/001-menu/`

**Critères de validation** ✅:
- [ ] `data-model.md` : Schémas et entités mis à jour
- [ ] `research.md` : Exemples de code mis à jour
- [ ] `contracts.md` : Interfaces et exemples mis à jour
- [ ] `quickstart.md` : Guide d'installation mis à jour
- [ ] Aucune référence à "LeftMenu" ne subsiste
- [ ] Tous les liens fonctionnent

**Dépendances**: Task 3.3

**Fichiers modifiés**:
- `specs/001-menu/data-model.md`
- `specs/001-menu/research.md`
- `specs/001-menu/contracts.md`
- `specs/001-menu/quickstart.md`

---

## Phase 4: Validation & Tests (5 min)

### Task 4.1: Validation TypeScript 🟢 P1
⏱️ **2 minutes**

**Description**: Vérifier que le code compile sans erreur TypeScript.

**Actions**:
```bash
# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Build complet
npm run build
```

**Critères de validation** ✅:
- [ ] `npx tsc --noEmit` ne retourne aucune erreur
- [ ] `npm run build` réussit
- [ ] Aucun warning TypeScript
- [ ] Le build génère les fichiers attendus

**Dépendances**: Task 2.7

**Fichiers impactés**: Aucun (validation uniquement)

---

### Task 4.2: Recherche de Références Restantes 🟢 P1
⏱️ **2 minutes**

**Description**: Vérifier qu'aucune référence à "LeftMenu" ne subsiste.

**Actions**:
```bash
# Rechercher "LeftMenu" dans le code source
grep -r "LeftMenu" src/

# Rechercher "left-menu" dans le code source (hors classes CSS)
grep -r "left-menu" src/ | grep -v "menu-"

# Rechercher dans la documentation
grep -r "LeftMenu" specs/001-menu/
```

**Critères de validation** ✅:
- [ ] `grep -r "LeftMenu" src/` ne retourne aucun résultat
- [ ] `grep -r "left-menu" src/` ne retourne que les classes CSS
- [ ] `grep -r "LeftMenu" specs/001-menu/` ne retourne aucun résultat
- [ ] Aucune référence obsolète n'est trouvée

**Dépendances**: Task 3.4

**Fichiers impactés**: Aucun (validation uniquement)

---

### Task 4.3: Tests Fonctionnels 🟢 P1
⏱️ **1 minute**

**Description**: Vérifier que le menu fonctionne correctement après le renommage.

**Actions**:
1. Démarrer le serveur de développement : `npm run dev`
2. Ouvrir l'application dans le navigateur
3. Tester la navigation
4. Tester le responsive (mobile/desktop)
5. Vérifier l'accessibilité

**Critères de validation** ✅:
- [ ] L'application démarre sans erreur
- [ ] Le menu s'affiche correctement
- [ ] La navigation fonctionne (clic sur les items)
- [ ] L'item actif est mis en évidence
- [ ] Le menu responsive fonctionne (hamburger sur mobile)
- [ ] Le menu reste visible au scroll (desktop)
- [ ] Les attributs ARIA sont corrects (vérifier avec DevTools)
- [ ] Aucune régression fonctionnelle

**Dépendances**: Task 4.1, Task 4.2

**Fichiers impactés**: Aucun (tests uniquement)

**Test manuel détaillé**:

**Desktop (> 768px)**:
- [ ] Menu visible sur le côté gauche
- [ ] Largeur de 280px
- [ ] Item actif surligné en bleu
- [ ] Hover change le style
- [ ] Navigation fonctionne

**Mobile (≤ 768px)**:
- [ ] Bouton hamburger visible
- [ ] Menu caché par défaut
- [ ] Clic hamburger ouvre le menu
- [ ] Overlay apparaît
- [ ] Clic overlay ferme le menu
- [ ] Escape ferme le menu

**Accessibilité**:
- [ ] Tab permet de naviguer
- [ ] Enter active un item
- [ ] `aria-controls="menu"` pointe vers `id="menu"`
- [ ] `role="navigation"` est présent
- [ ] Focus visible

---

## Checklist Finale

### Critères de Succès (de la spec)

- [ ] **SC-001**: Tous les fichiers et dossiers utilisent "Menu" (100% couverture) ✅
- [ ] **SC-002**: Compilation TypeScript sans erreur ✅
- [ ] **SC-003**: Tous les tests passent (si existants) ✅
- [ ] **SC-004**: Aucune régression fonctionnelle ✅
- [ ] **SC-005**: Aucune référence à "LeftMenu" dans le code source ✅
- [ ] **SC-006**: Temps de refactoring < 30 minutes ✅

### Exigences Fonctionnelles (de la spec)

- [ ] **FR-001**: Dossier renommé en `src/components/Menu/` ✅
- [ ] **FR-002**: Fichier renommé en `Menu.tsx` ✅
- [ ] **FR-003**: Interface `MenuProps` au lieu de `LeftMenuProps` ✅
- [ ] **FR-004**: Imports mis à jour dans `layout.tsx` ✅
- [ ] **FR-005**: Commentaires mis à jour ✅
- [ ] **FR-006**: Attributs ARIA mis à jour (`id="menu"`) ✅
- [ ] **FR-007**: Classes CSS inchangées ✅
- [ ] **FR-008**: Comportement fonctionnel identique ✅

---

## Ordre d'Exécution Recommandé

1. **Phase 1: Structure** (Task 1.1 → 1.2 → 1.3)
2. **Phase 2: Code** (Task 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 → 2.7)
3. **Phase 3: Documentation** (Task 3.1 → 3.2 → 3.3 → 3.4)
4. **Phase 4: Validation** (Task 4.1 → 4.2 → 4.3)

---

## Estimation Totale

- Phase 1: 5 min
- Phase 2: 20 min
- Phase 3: 10 min
- Phase 4: 5 min

**Total**: 40 minutes (avec marge de sécurité de 5 min)

---

## Notes d'Implémentation

- Suivre le plan technique [`plan.md`](./plan.md) pour les détails
- Référencer la spec [`spec.md`](./spec.md) pour les exigences
- Valider chaque tâche avant de passer à la suivante
- Commiter régulièrement (après chaque phase)
- Utiliser les outils de refactoring de l'IDE quand possible

---

## Commandes Utiles

### Recherche de références
```bash
# Rechercher "LeftMenu" dans le code
grep -r "LeftMenu" src/

# Rechercher "left-menu" dans le code
grep -r "left-menu" src/

# Rechercher dans la documentation
grep -r "LeftMenu" specs/
```

### Validation TypeScript
```bash
# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Build complet
npm run build
```

### Serveur de développement
```bash
# Démarrer le serveur
npm run dev

# Arrêter le serveur
Ctrl+C
```

---

## Commit Messages Suggérés

```bash
# Après Phase 1
git commit -m "refactor(menu): rename LeftMenu directory and files to Menu"

# Après Phase 2
git commit -m "refactor(menu): update code references from LeftMenu to Menu

- Update Menu.tsx: function name, imports, ARIA attributes
- Update types.ts: MenuProps interface and JSDoc comments
- Update layout.tsx: imports and component usage"

# Après Phase 3
git commit -m "docs(menu): update documentation from LeftMenu to Menu

- Rename specs/001-left-menu to specs/001-menu
- Update all references in spec, plan, and other docs"

# Après Phase 4
git commit -m "test(menu): validate Menu component after renaming

- Verify TypeScript compilation
- Check for remaining LeftMenu references
- Validate functional behavior

Closes #002-rename-menu"
```

---

## Rollback Plan

En cas de problème critique :

```bash
# 1. Annuler les changements Git
git checkout -- .

# 2. Ou revenir au commit précédent
git reset --hard HEAD~1

# 3. Redémarrer le serveur
npm run dev
```

**Temps de rollback estimé**: < 2 minutes

---

**Prêt pour l'implémentation ! 🚀**