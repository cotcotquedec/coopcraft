# Implementation Plan: Menu de Navigation Latéral Droit

**Branch**: `001-right-menu` | **Date**: 2025-01-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-right-menu/spec.md`

## Summary

Implémentation d'un menu de navigation latéral fixe sur le côté droit de l'application CoopCraft, permettant aux utilisateurs d'accéder rapidement aux différentes catégories d'outils 3D (Gabarits de perçage, Guides de coupe, Accessoires d'atelier, Mes créations). Le menu sera responsive avec un comportement adapté pour mobile (bouton hamburger + overlay) et desktop (menu fixe visible). L'approche technique privilégie la simplicité avec des composants React colocalisés dans le layout principal, utilisant CSS moderne (Flexbox/Grid) et les hooks React pour la gestion d'état.

## Technical Context

**Language/Version**: TypeScript 5.9.3 avec React 19.2.0  
**Primary Dependencies**: Next.js 16.0.3 (App Router), React 19.2.0, React DOM 19.2.0  
**Storage**: N/A (pas de persistance nécessaire pour le menu)  
**Testing**: Tests manuels dans navigateurs (Chrome, Firefox, Safari, Edge)  
**Target Platform**: Web (navigateurs modernes, responsive desktop + mobile)  
**Project Type**: Web application (Next.js avec architecture 1 page = 1 fichier)  
**Performance Goals**: 
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Animation du menu mobile à 60 FPS
- Temps de chargement additionnel < 100ms

**Constraints**: 
- Menu fixe de 280px de largeur sur desktop
- Animation d'ouverture/fermeture < 300ms sur mobile
- Accessibilité clavier complète (Tab, Enter, Escape)
- Compatible avec écrans jusqu'à 320px de largeur

**Scale/Scope**: 
- 4 catégories de menu initiales (extensible)
- Support de 20+ items de menu sans dégradation
- Application monopage avec navigation client-side

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principe I: Accessibilité Technique
- [x] L'interface utilisateur cache-t-elle toute complexité technique (Three.js, STL/3MF) ?
  - ✅ Le menu est une interface de navigation pure, sans complexité technique exposée
- [x] Les paramètres sont-ils simples et compréhensibles sans expertise 3D ?
  - ✅ Navigation par catégories simples et explicites
- [x] Existe-t-il des valeurs par défaut fonctionnelles pour tous les paramètres ?
  - ✅ Menu fermé par défaut sur mobile, ouvert sur desktop

### Principe II: Visualisation Temps Réel
- [x] Les modifications de paramètres produisent-elles une mise à jour immédiate (<100ms) ?
  - ✅ Changement d'état du menu instantané (React state)
- [x] La prévisualisation 3D est-elle disponible avant la génération de fichiers ?
  - N/A - Le menu ne gère pas de prévisualisation 3D
- [x] Le rendu maintient-il 60 FPS sur hardware moyen ?
  - ✅ Animations CSS optimisées avec transform/opacity

### Principe III: Qualité d'Impression Garantie
- N/A - Le menu ne génère pas de fichiers 3D

### Principe IV: Extensibilité par Templates
- [x] Le nouveau type d'outil est-il implémenté comme template indépendant ?
  - ✅ Le menu utilise un tableau de configuration pour les items
- [x] Les paramètres sont-ils exposés via un schéma déclaratif ?
  - ✅ Structure de données simple pour les items de menu
- [x] L'ajout ne modifie-t-il pas le core de l'application ?
  - ✅ Composant isolé dans le layout, pas de modification du core

### Principe V: Performance Client-First
- [x] Le rendu 3D s'exécute-t-il côté client (navigateur) ?
  - N/A - Pas de rendu 3D dans le menu
- [x] La génération de géométries est-elle locale (pas d'API externe) ?
  - N/A - Pas de génération de géométries
- [x] L'application fonctionne-t-elle offline après le premier chargement ?
  - ✅ Menu entièrement client-side, pas d'appels API

### Contraintes Techniques
- [x] TypeScript utilisé pour tous les fichiers source ?
  - ✅ Projet configuré avec TypeScript strict
- [x] shadcn/ui utilisé pour les composants UI ?
  - ⚠️ shadcn/ui pas encore installé - sera ajouté si nécessaire, sinon composants custom
- [x] Three.js utilisé pour le rendu 3D ?
  - N/A - Pas de rendu 3D dans le menu
- [x] First Contentful Paint < 1.5s ?
  - ✅ Menu léger, impact minimal sur FCP
- [x] Time to Interactive < 3s ?
  - ✅ Pas de JavaScript lourd, interactivité immédiate

## Project Structure

### Documentation (this feature)

```text
specs/001-right-menu/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - Recherche sur patterns de navigation
├── data-model.md        # Phase 1 output - Structure des données du menu
├── quickstart.md        # Phase 1 output - Guide d'implémentation rapide
├── contracts/           # Phase 1 output - Interfaces TypeScript
│   ├── MenuItem.ts      # Interface pour un item de menu
│   ├── MenuProps.ts     # Props du composant Menu
│   └── MenuState.ts     # État du menu (ouvert/fermé)
├── checklists/
│   └── requirements.md  # Checklist de validation (déjà créé)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Next.js App Router structure (Single project)
src/
├── app/
│   ├── layout.tsx           # [MODIFIED] Intégration du RightMenu
│   ├── page.tsx             # [EXISTING] Page d'accueil
│   ├── globals.css          # [MODIFIED] Styles globaux + menu
│   ├── drilling/            # [NEW] Page Gabarits de perçage
│   │   └── page.tsx
│   ├── cutting/             # [NEW] Page Guides de coupe
│   │   └── page.tsx
│   ├── accessories/         # [NEW] Page Accessoires d'atelier
│   │   └── page.tsx
│   ├── creations/           # [NEW] Page Mes créations
│   │   └── page.tsx
│   └── api/
│       └── health/
│           └── route.ts     # [EXISTING] Health check
│
└── components/              # [NEW] Composants réutilisables
    └── RightMenu/           # [NEW] Composant menu
        ├── RightMenu.tsx    # Composant principal
        ├── MenuItem.tsx     # Item de menu individuel
        ├── types.ts         # Types TypeScript
        └── styles.module.css # Styles du menu (optionnel si CSS-in-JS)

tests/                       # [FUTURE] Tests unitaires et d'intégration
├── components/
│   └── RightMenu.test.tsx
└── integration/
    └── navigation.test.tsx
```

**Structure Decision**: 

Nous utilisons l'architecture **Single Project** avec Next.js App Router car :
1. L'application est une SPA web sans backend séparé
2. L'architecture "1 page = 1 fichier" est déjà en place
3. Le menu est un composant UI pur sans logique métier complexe
4. La collocation des composants dans `src/components/` facilite la réutilisation

Le menu sera implémenté comme un composant React isolé dans `src/components/RightMenu/` et intégré dans le `layout.tsx` principal pour être présent sur toutes les pages. Les pages de destination seront créées dans `src/app/` suivant la convention Next.js App Router.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

Aucune violation détectée. Le menu respecte tous les principes de la constitution :
- Interface simple et accessible
- Performance optimale (client-side, animations 60fps)
- Extensibilité via configuration déclarative
- Pas de complexité technique exposée

## Implementation Phases

### Phase 0: Research & Technical Validation

**Objectif**: Valider les choix techniques et identifier les patterns de navigation optimaux

**Livrables**:
- `research.md` : Documentation des patterns de navigation (fixed sidebar, hamburger menu, responsive breakpoints)
- Validation des animations CSS (transform vs position)
- Analyse des solutions d'accessibilité clavier
- Benchmark de performance (impact sur FCP/TTI)

**Questions à résoudre**:
1. Utiliser CSS Modules, Tailwind ou styled-components ?
2. Gestion d'état : useState local ou Context API ?
3. Animation : CSS transitions ou Framer Motion ?
4. Détection de la route active : usePathname de Next.js ?

**Critères de validation**:
- [ ] Pattern de navigation choisi et documenté
- [ ] Solution d'animation validée (60fps garantis)
- [ ] Approche d'accessibilité définie
- [ ] Impact performance mesuré (< 100ms)

### Phase 1: Design & Contracts

**Objectif**: Définir les interfaces, le modèle de données et l'architecture des composants

**Livrables**:
- `data-model.md` : Structure des données du menu (MenuItem, MenuConfig)
- `quickstart.md` : Guide d'implémentation pas à pas
- `contracts/` : Interfaces TypeScript
  - `MenuItem.ts` : Interface pour un item de menu
  - `MenuProps.ts` : Props du composant RightMenu
  - `MenuState.ts` : État du menu (isOpen, activeItem)

**Modèle de données préliminaire**:

```typescript
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string; // Optionnel pour Phase 1
}

interface MenuConfig {
  items: MenuItem[];
  width: number; // 280px
  mobileBreakpoint: number; // 768px
}

interface MenuState {
  isOpen: boolean; // Pour mobile uniquement
  activeItemId: string | null;
}
```

**Architecture des composants**:

```
RightMenu (Container)
├── MenuToggle (Mobile only - Hamburger button)
├── MenuOverlay (Mobile only - Dark backdrop)
└── MenuContent
    ├── MenuItem (x4 initialement)
    │   ├── Icon (optionnel)
    │   ├── Label
    │   └── ActiveIndicator
    └── MenuFooter (optionnel - version, etc.)
```

**Critères de validation**:
- [ ] Tous les contrats TypeScript définis
- [ ] Modèle de données validé avec la spec
- [ ] Architecture des composants documentée
- [ ] Guide quickstart rédigé

### Phase 2: Implementation Tasks

**Objectif**: Décomposer l'implémentation en tâches atomiques et testables

**Note**: Cette phase sera générée par la commande `/speckit.tasks` et n'est PAS créée par `/speckit.plan`

**Tâches préliminaires identifiées** (à affiner en Phase 2):

1. **Setup & Configuration**
   - Créer la structure de dossiers `src/components/RightMenu/`
   - Définir les types TypeScript dans `types.ts`
   - Configurer les breakpoints responsive dans `globals.css`

2. **Composant RightMenu (Desktop)**
   - Créer le composant `RightMenu.tsx` avec position fixed
   - Implémenter la liste des items de menu
   - Ajouter les styles CSS (280px width, fixed right)
   - Gérer l'état actif avec `usePathname()`

3. **Composant MenuItem**
   - Créer `MenuItem.tsx` avec props (label, href, isActive)
   - Implémenter le style actif/inactif
   - Ajouter la navigation avec Next.js Link
   - Gérer le hover et focus states

4. **Responsive Mobile**
   - Ajouter le bouton hamburger (MenuToggle)
   - Implémenter l'état ouvert/fermé avec useState
   - Créer l'overlay avec animation
   - Gérer la fermeture au clic extérieur

5. **Accessibilité**
   - Ajouter les attributs ARIA (role, aria-label, aria-expanded)
   - Implémenter la navigation clavier (Tab, Enter, Escape)
   - Tester avec lecteur d'écran
   - Ajouter focus-visible styles

6. **Pages de Destination**
   - Créer `src/app/drilling/page.tsx`
   - Créer `src/app/cutting/page.tsx`
   - Créer `src/app/accessories/page.tsx`
   - Créer `src/app/creations/page.tsx`

7. **Intégration & Tests**
   - Intégrer RightMenu dans `layout.tsx`
   - Ajuster le padding du contenu principal
   - Tester sur tous les breakpoints (320px, 768px, 1024px, 1920px)
   - Valider les critères de succès de la spec

## Risk Assessment

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Performance dégradée sur mobile | Faible | Moyen | Utiliser transform/opacity pour animations, lazy load si nécessaire |
| Conflits avec le contenu principal | Moyen | Moyen | Ajuster automatiquement le padding-right du contenu |
| Accessibilité clavier insuffisante | Faible | Élevé | Tests systématiques avec Tab/Enter/Escape, attributs ARIA |
| Menu trop large sur petits écrans | Faible | Faible | Breakpoint à 768px, max-width 80% sur mobile |
| Difficulté à identifier la page active | Moyen | Faible | Utiliser usePathname() de Next.js, style distinct pour item actif |

## Success Metrics

Alignés avec les critères de succès de la spec :

- **SC-001**: Temps d'accès < 2s → Mesurer avec Chrome DevTools (Navigation Timing API)
- **SC-002**: Compatibilité 100% navigateurs modernes → Tests manuels Chrome/Firefox/Safari/Edge
- **SC-003**: Impact chargement < 100ms → Lighthouse Performance score avant/après
- **SC-004**: 95% identification position → Tests utilisateurs (5 personnes minimum)
- **SC-005**: Animation < 300ms à 60fps → Chrome DevTools Performance profiler
- **SC-006**: Accessibilité clavier 100% → Tests avec Tab/Enter/Escape, validation WAVE
- **SC-007**: Menu mobile < 80% largeur → Tests responsive sur différents devices

## Next Steps

1. **Immédiat** : Exécuter Phase 0 (Research) pour valider les choix techniques
2. **Après validation** : Créer les contrats TypeScript en Phase 1
3. **Avant implémentation** : Générer les tâches détaillées avec `/speckit.tasks`
4. **Pendant implémentation** : Suivre les tâches et valider chaque critère de succès
5. **Après implémentation** : Tests d'acceptation basés sur les scénarios de la spec

## Dependencies & Assumptions

**Dependencies**:
- Next.js 16.0.3 avec App Router (déjà installé)
- React 19.2.0 (déjà installé)
- TypeScript 5.9.3 (déjà installé)
- Aucune dépendance externe supplémentaire requise pour MVP

**Assumptions**:
- Les utilisateurs ont JavaScript activé (fallback graceful si désactivé)
- Les navigateurs supportent CSS Grid et Flexbox (tous les navigateurs modernes)
- Les pages de destination seront créées avec un contenu minimal (placeholder)
- Le menu ne nécessite pas de persistance d'état (pas de localStorage)
- Les icônes seront ajoutées dans une itération future (optionnel pour MVP)

**Blockers potentiels**:
- Aucun bloqueur identifié pour le MVP
- L'ajout de shadcn/ui pourrait nécessiter une configuration supplémentaire (optionnel)