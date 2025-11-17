# Feature Specification: Renommage du composant LeftMenu en Menu

**Feature Branch**: `002-rename-menu`  
**Created**: 2025-01-17  
**Status**: Draft  
**Input**: User description: "je voudrais renomer le menu, le componene test Leftmenu et moi je voudrais simplement 'menu', vu qu'il n'y en a qu'un seul cela parait plus logique, ca sera la tache #2"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Refactoring du nom du composant (Priority: P1)

En tant que développeur travaillant sur le projet CoopCraft, je veux que le composant de navigation soit nommé simplement "Menu" plutôt que "LeftMenu", car il n'existe qu'un seul menu dans l'application et le préfixe "Left" est redondant et source de confusion.

**Why this priority**: C'est la seule tâche de cette feature. Le renommage améliore la clarté du code et facilite la maintenance future en utilisant une nomenclature plus logique et concise.

**Independent Test**: Peut être testé en vérifiant que tous les imports, références et fichiers utilisent le nouveau nom "Menu" et que l'application fonctionne sans erreur.

**Acceptance Scenarios**:

1. **Given** le composant s'appelle actuellement "LeftMenu", **When** je consulte le code source, **Then** tous les fichiers, dossiers et références utilisent le nom "Menu"
2. **Given** l'application est en cours d'exécution, **When** je navigue dans l'interface, **Then** le menu fonctionne exactement comme avant le renommage
3. **Given** je suis un nouveau développeur sur le projet, **When** je cherche le composant de navigation, **Then** je le trouve facilement sous le nom "Menu" sans ambiguïté

---

### Edge Cases

- Que se passe-t-il si des imports sont manqués lors du renommage ? → Le TypeScript doit signaler les erreurs de compilation
- Comment s'assurer qu'aucune référence n'est oubliée ? → Utiliser la recherche globale et les outils de refactoring de l'IDE
- Les tests existants doivent-ils être mis à jour ? → Oui, tous les tests référençant LeftMenu doivent être mis à jour

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le dossier `src/components/LeftMenu/` DOIT être renommé en `src/components/Menu/`
- **FR-002**: Le fichier `LeftMenu.tsx` DOIT être renommé en `Menu.tsx`
- **FR-003**: L'interface `LeftMenuProps` dans [`types.ts`](src/components/LeftMenu/types.ts:49) DOIT être renommée en `MenuProps`
- **FR-004**: Tous les imports de `LeftMenu` dans [`layout.tsx`](src/app/layout.tsx:3) et autres fichiers DOIVENT être mis à jour vers `Menu`
- **FR-005**: Tous les commentaires et documentation référençant "LeftMenu" DOIVENT être mis à jour pour utiliser "Menu"
- **FR-006**: Les attributs ARIA comme `id="left-menu"` dans [`LeftMenu.tsx`](src/components/LeftMenu/LeftMenu.tsx:89) DOIVENT être mis à jour en `id="menu"`
- **FR-007**: Les classes CSS comme `menu-nav` DOIVENT rester inchangées pour maintenir la compatibilité du style
- **FR-008**: Le comportement fonctionnel du menu (navigation, état ouvert/fermé, responsive) DOIT rester identique

### Key Entities

- **Composant Menu**: Composant React de navigation principal, anciennement nommé LeftMenu
  - Fichiers: `Menu.tsx`, `MenuItem.tsx`, `types.ts`
  - Props: `MenuProps` (anciennement `LeftMenuProps`)
  - Types: `MenuItem`, `MenuConfig`, `MenuState`, `MenuItemProps`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tous les fichiers et dossiers utilisent le nom "Menu" au lieu de "LeftMenu" (100% de couverture)
- **SC-002**: L'application compile sans erreur TypeScript après le renommage
- **SC-003**: Tous les tests passent avec succès après le renommage
- **SC-004**: Le menu fonctionne de manière identique avant et après le renommage (aucune régression fonctionnelle)
- **SC-005**: Aucune référence à "LeftMenu" ne subsiste dans le code source (vérifiable par recherche globale)
- **SC-006**: Le temps de refactoring ne dépasse pas 30 minutes pour un développeur expérimenté
