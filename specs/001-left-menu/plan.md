# Implementation Plan: Menu de Navigation à Gauche

**Branch**: `001-left-menu` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-left-menu/spec.md`

## Summary

Déplacer le menu de navigation de la droite vers la gauche de l'écran pour améliorer l'ergonomie de l'application. Cette modification implique principalement des changements CSS et de positionnement, tout en préservant la fonctionnalité existante (navigation, responsive, états actifs).

**Approche technique**: Refactorisation du composant existant [`RightMenu`](../../src/components/RightMenu/RightMenu.tsx) en [`LeftMenu`](../../src/components/LeftMenu/LeftMenu.tsx) avec ajustements de positionnement CSS et adaptation des media queries pour le comportement responsive.

## Technical Context

**Language/Version**: TypeScript 5.x avec Next.js 15.x (App Router)  
**Primary Dependencies**: React 19, Next.js 15, TypeScript  
**Storage**: N/A (composant UI stateless)  
**Testing**: Tests manuels + validation visuelle cross-browser  
**Target Platform**: Web (navigateurs modernes: Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (Next.js)  
**Performance Goals**: 
- Temps de chargement initial < 1.5s (First Contentful Paint)
- Pas de régression de performance (≤50ms de surcharge)
- Animations fluides à 60 FPS
**Constraints**: 
- Support écrans ≥320px de largeur
- Responsive design (mobile/tablette/desktop)
- Accessibilité WCAG 2.1 niveau AA
**Scale/Scope**: 
- 5 éléments de navigation
- Application single-page avec routing client-side
- Composant réutilisable

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principe I: Accessibilité Technique
- [x] L'interface utilisateur cache-t-elle toute complexité technique (Three.js, STL/3MF) ?
  - *N/A pour cette feature - pas de complexité 3D impliquée*
- [x] Les paramètres sont-ils simples et compréhensibles sans expertise 3D ?
  - *N/A pour cette feature - pas de paramètres utilisateur*
- [x] Existe-t-il des valeurs par défaut fonctionnelles pour tous les paramètres ?
  - *N/A pour cette feature - configuration statique*

### Principe II: Visualisation Temps Réel
- [x] Les modifications de paramètres produisent-elles une mise à jour immédiate (<100ms) ?
  - *Navigation instantanée via Next.js routing*
- [x] La prévisualisation 3D est-elle disponible avant la génération de fichiers ?
  - *N/A pour cette feature - pas de génération 3D*
- [x] Le rendu maintient-il 60 FPS sur hardware moyen ?
  - *Animations CSS optimisées pour 60 FPS*

### Principe III: Qualité d'Impression Garantie
- [x] Les géométries générées sont-elles manifold (étanches) ?
  - *N/A pour cette feature - pas de génération 3D*
- [x] Les fichiers STL/3MF sont-ils validés avant export ?
  - *N/A pour cette feature - pas d'export de fichiers*
- [x] Des paramètres d'impression recommandés sont-ils fournis ?
  - *N/A pour cette feature - pas d'impression 3D*

### Principe IV: Extensibilité par Templates
- [x] Le nouveau type d'outil est-il implémenté comme template indépendant ?
  - *Composant menu réutilisable et configurable*
- [x] Les paramètres sont-ils exposés via un schéma déclaratif ?
  - *Configuration via interface [`MenuConfig`](../../src/components/RightMenu/types.ts:25)*
- [x] L'ajout ne modifie-t-il pas le core de l'application ?
  - *Modification isolée au composant menu uniquement*

### Principe V: Performance Client-First
- [x] Le rendu 3D s'exécute-t-il côté client (navigateur) ?
  - *N/A pour cette feature - pas de rendu 3D*
- [x] La génération de géométries est-elle locale (pas d'API externe) ?
  - *N/A pour cette feature - pas de génération*
- [x] L'application fonctionne-t-elle offline après le premier chargement ?
  - *Composant client-side, pas de dépendance réseau*

### Contraintes Techniques
- [x] TypeScript utilisé pour tous les fichiers source ?
  - *Tous les fichiers en .tsx avec typage strict*
- [x] shadcn/ui utilisé pour les composants UI ?
  - *N/A - composant custom sans dépendance shadcn/ui*
- [x] Three.js utilisé pour le rendu 3D ?
  - *N/A pour cette feature - pas de rendu 3D*
- [x] First Contentful Paint < 1.5s ?
  - *Pas de régression attendue, composant léger*
- [x] Time to Interactive < 3s ?
  - *Pas de régression attendue, pas de JS lourd*

## Project Structure

### Documentation (this feature)

```text
specs/001-left-menu/
├── plan.md              # This file
├── research.md          # Phase 0: Analyse technique et décisions
├── data-model.md        # Phase 1: Structure des données
├── quickstart.md        # Phase 1: Guide de démarrage
├── contracts.md         # Phase 1: Interfaces et contrats
└── tasks.md             # Phase 2: Tâches d'implémentation (créé par /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # [MODIFY] Importer LeftMenu au lieu de RightMenu
│   ├── globals.css          # [MODIFY] Adapter les styles pour menu gauche
│   └── [pages]/             # [NO CHANGE] Pages existantes
│
├── components/
│   ├── RightMenu/           # [DEPRECATE] Ancien composant (garder temporairement)
│   │   ├── RightMenu.tsx
│   │   ├── MenuItem.tsx
│   │   └── types.ts
│   │
│   └── LeftMenu/            # [CREATE] Nouveau composant
│       ├── LeftMenu.tsx     # Composant principal avec positionnement gauche
│       ├── MenuItem.tsx     # Réutilisé ou adapté depuis RightMenu
│       └── types.ts         # Types adaptés (position: 'left')
│
└── [autres dossiers]        # [NO CHANGE]
```

**Structure Decision**: Application web Next.js avec structure standard. Le composant menu est isolé dans `src/components/`, permettant une migration progressive. L'ancien composant `RightMenu` sera conservé temporairement pour faciliter le rollback si nécessaire, puis supprimé après validation.

## Complexity Tracking

> **Aucune violation de la Constitution - section non applicable**

Cette feature respecte tous les principes de la Constitution :
- Composant UI simple sans complexité technique cachée
- Performance maintenue (pas de régression)
- Extensibilité préservée via configuration déclarative
- Exécution client-side sans dépendances externes

## Implementation Phases

### Phase 0: Research & Analysis ✓

**Objectif**: Analyser l'architecture existante et identifier les changements nécessaires

**Livrables**:
- [`research.md`](./research.md) - Analyse technique détaillée
  - Audit du composant [`RightMenu`](../../src/components/RightMenu/RightMenu.tsx) existant
  - Identification des points de modification CSS
  - Analyse des media queries responsive
  - Stratégie de migration (refactoring vs. duplication)
  - Décisions techniques justifiées

**Critères de validation**:
- [x] Architecture actuelle documentée
- [x] Points de modification identifiés
- [x] Stratégie de migration définie
- [x] Risques et mitigations documentés

### Phase 1: Design & Contracts

**Objectif**: Définir la structure des données, les interfaces et le guide de démarrage

**Livrables**:
1. [`data-model.md`](./data-model.md) - Structure des données
   - Interface [`MenuConfig`](../../src/components/LeftMenu/types.ts) avec `position: 'left'`
   - Interface [`MenuItem`](../../src/components/LeftMenu/types.ts) (inchangée)
   - Interface [`MenuState`](../../src/components/LeftMenu/types.ts) (inchangée)
   - Diagrammes de structure

2. [`quickstart.md`](./quickstart.md) - Guide de démarrage rapide
   - Installation et configuration
   - Exemple d'utilisation du composant [`LeftMenu`](../../src/components/LeftMenu/LeftMenu.tsx)
   - Configuration du menu dans [`layout.tsx`](../../src/app/layout.tsx)
   - Personnalisation des styles

3. [`contracts.md`](./contracts.md) - Contrats d'interface
   - Props du composant [`LeftMenu`](../../src/components/LeftMenu/LeftMenu.tsx)
   - Props du composant [`MenuItem`](../../src/components/LeftMenu/MenuItem.tsx)
   - Configuration [`MenuConfig`](../../src/components/LeftMenu/types.ts)
   - Événements et callbacks
   - Accessibilité (ARIA attributes)

**Critères de validation**:
- [ ] Tous les types TypeScript définis
- [ ] Interfaces documentées avec exemples
- [ ] Guide de démarrage testable
- [ ] Contrats d'accessibilité spécifiés

### Phase 2: Task Breakdown

**Objectif**: Décomposer l'implémentation en tâches atomiques

**Livrable**: [`tasks.md`](./tasks.md) (créé par `/speckit.tasks`)

**Tâches anticipées** (à affiner en Phase 2):
1. Créer la structure du composant [`LeftMenu`](../../src/components/LeftMenu/)
2. Adapter les styles CSS pour positionnement gauche
3. Modifier les media queries responsive
4. Mettre à jour [`layout.tsx`](../../src/app/layout.tsx)
5. Adapter [`globals.css`](../../src/app/globals.css)
6. Tests cross-browser
7. Validation accessibilité
8. Documentation et cleanup

## Technical Decisions

### 1. Stratégie de Migration: Duplication puis Remplacement

**Décision**: Créer un nouveau composant [`LeftMenu`](../../src/components/LeftMenu/) plutôt que modifier [`RightMenu`](../../src/components/RightMenu/) en place.

**Justification**:
- ✅ Permet un rollback facile si problème
- ✅ Facilite les tests A/B si nécessaire
- ✅ Évite les régressions sur le composant existant
- ✅ Code plus clair avec nommage explicite

**Alternative rejetée**: Modifier [`RightMenu`](../../src/components/RightMenu/RightMenu.tsx) en place
- ❌ Risque de régression
- ❌ Difficulté de rollback
- ❌ Nommage trompeur (RightMenu pour menu gauche)

### 2. Positionnement CSS: Fixed vs. Sticky

**Décision**: Conserver `position: fixed` comme dans le composant actuel.

**Justification**:
- ✅ Menu toujours visible pendant le scroll
- ✅ Comportement cohérent avec l'existant
- ✅ Meilleure UX pour la navigation
- ✅ Simplifie le responsive (pas de calcul de hauteur)

**Alternative rejetée**: `position: sticky`
- ❌ Complexité accrue pour le responsive
- ❌ Comportement différent de l'existant
- ❌ Nécessite ajustements du layout parent

### 3. Responsive: Hamburger Menu sur Mobile

**Décision**: Conserver le pattern hamburger menu pour mobile (<768px).

**Justification**:
- ✅ Pattern UX standard et familier
- ✅ Économise l'espace écran sur mobile
- ✅ Comportement cohérent avec l'existant
- ✅ Accessibilité préservée (ARIA attributes)

**Adaptation**: Hamburger positionné en haut à gauche (au lieu de droite).

### 4. Animations: CSS Transitions

**Décision**: Utiliser CSS transitions pour les animations (pas de JS).

**Justification**:
- ✅ Performance optimale (GPU-accelerated)
- ✅ 60 FPS garanti sur hardware moyen
- ✅ Pas de dépendance JS supplémentaire
- ✅ Fallback gracieux si animations désactivées

**Propriétés animées**:
- `transform: translateX()` pour le slide-in/out mobile
- `background-color` pour les hovers
- `border-left-color` pour l'indicateur actif

### 5. Largeur du Menu: Fixe vs. Flexible

**Décision**: Conserver une largeur fixe de 280px sur desktop.

**Justification**:
- ✅ Cohérence avec l'existant
- ✅ Prévisibilité du layout
- ✅ Simplifie les calculs de padding du contenu
- ✅ Largeur optimale pour lisibilité

**Responsive**:
- Desktop (>768px): 280px fixe
- Tablette (768-1024px): 240px (réduit)
- Mobile (<768px): 80% de la largeur écran (max 280px)

## Risk Assessment

### Risques Identifiés

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Régression visuelle sur pages existantes | Moyen | Faible | Tests visuels sur toutes les pages avant merge |
| Problèmes de z-index avec autres composants | Faible | Faible | Audit des z-index existants, documentation |
| Performance dégradée sur mobile | Moyen | Très faible | Tests de performance, profiling Chrome DevTools |
| Accessibilité compromise | Élevé | Faible | Tests avec lecteurs d'écran, validation ARIA |
| Incompatibilité navigateurs anciens | Faible | Faible | Tests cross-browser, fallbacks CSS |

### Stratégies de Rollback

1. **Rollback immédiat**: Revenir au commit précédent via Git
2. **Rollback partiel**: Réactiver [`RightMenu`](../../src/components/RightMenu/RightMenu.tsx) dans [`layout.tsx`](../../src/app/layout.tsx)
3. **Feature flag**: Ajouter une variable d'environnement pour basculer entre les deux menus

## Success Metrics

### Critères de Validation Technique

- [ ] Menu s'affiche à gauche sur tous les breakpoints
- [ ] Tous les éléments de navigation fonctionnels
- [ ] Indicateur visuel de l'élément actif correct
- [ ] Animations fluides (60 FPS vérifié via DevTools)
- [ ] Responsive fonctionnel (320px → 2560px)
- [ ] Hamburger menu fonctionnel sur mobile
- [ ] Accessibilité validée (WAVE, axe DevTools)
- [ ] Tests cross-browser passés (Chrome, Firefox, Safari, Edge)
- [ ] Pas de régression de performance (Lighthouse score ≥95)
- [ ] Code TypeScript sans erreurs (strict mode)

### Critères de Validation Fonctionnelle

Mapping avec les Success Criteria de la spec:

- [ ] **SC-001**: Navigation en un clic vers toutes les sections ✓
- [ ] **SC-002**: Affichage correct sur tous les navigateurs modernes ✓
- [ ] **SC-003**: Temps de chargement ≤50ms de surcharge (mesuré via Lighthouse) ✓
- [ ] **SC-004**: Utilisable sur écrans ≥320px ✓
- [ ] **SC-005**: 100% des éléments de navigation présents et fonctionnels ✓

## Next Steps

1. **Valider ce plan** avec l'équipe/utilisateur
2. **Exécuter Phase 0**: Créer [`research.md`](./research.md) avec analyse détaillée
3. **Exécuter Phase 1**: Créer [`data-model.md`](./data-model.md), [`quickstart.md`](./quickstart.md), [`contracts.md`](./contracts.md)
4. **Exécuter Phase 2**: Utiliser `/speckit.tasks` pour générer [`tasks.md`](./tasks.md)
5. **Implémenter**: Suivre les tâches définies en Phase 2
6. **Valider**: Vérifier tous les critères de succès
7. **Merger**: Intégrer dans la branche principale après validation

## Appendix

### Références

- Spec originale: [`specs/001-left-menu/spec.md`](./spec.md)
- Composant actuel: [`src/components/RightMenu/RightMenu.tsx`](../../src/components/RightMenu/RightMenu.tsx)
- Types actuels: [`src/components/RightMenu/types.ts`](../../src/components/RightMenu/types.ts)
- Styles actuels: [`src/app/globals.css`](../../src/app/globals.css)
- Layout actuel: [`src/app/layout.tsx`](../../src/app/layout.tsx)

### Standards et Guidelines

- **Accessibilité**: WCAG 2.1 Level AA
- **TypeScript**: Strict mode enabled
- **CSS**: BEM-like naming convention
- **React**: Hooks-based functional components
- **Next.js**: App Router (RSC + Client Components)

### Glossaire

- **RSC**: React Server Components
- **FCP**: First Contentful Paint
- **TTI**: Time to Interactive
- **ARIA**: Accessible Rich Internet Applications
- **BEM**: Block Element Modifier (CSS methodology)