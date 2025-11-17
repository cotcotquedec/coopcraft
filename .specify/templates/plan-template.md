# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principe I: Accessibilité Technique
- [ ] L'interface utilisateur cache-t-elle toute complexité technique (Three.js, STL/3MF) ?
- [ ] Les paramètres sont-ils simples et compréhensibles sans expertise 3D ?
- [ ] Existe-t-il des valeurs par défaut fonctionnelles pour tous les paramètres ?

### Principe II: Visualisation Temps Réel
- [ ] Les modifications de paramètres produisent-elles une mise à jour immédiate (<100ms) ?
- [ ] La prévisualisation 3D est-elle disponible avant la génération de fichiers ?
- [ ] Le rendu maintient-il 60 FPS sur hardware moyen ?

### Principe III: Qualité d'Impression Garantie
- [ ] Les géométries générées sont-elles manifold (étanches) ?
- [ ] Les fichiers STL/3MF sont-ils validés avant export ?
- [ ] Des paramètres d'impression recommandés sont-ils fournis ?

### Principe IV: Extensibilité par Templates
- [ ] Le nouveau type d'outil est-il implémenté comme template indépendant ?
- [ ] Les paramètres sont-ils exposés via un schéma déclaratif ?
- [ ] L'ajout ne modifie-t-il pas le core de l'application ?

### Principe V: Performance Client-First
- [ ] Le rendu 3D s'exécute-t-il côté client (navigateur) ?
- [ ] La génération de géométries est-elle locale (pas d'API externe) ?
- [ ] L'application fonctionne-t-elle offline après le premier chargement ?

### Contraintes Techniques
- [ ] TypeScript utilisé pour tous les fichiers source ?
- [ ] shadcn/ui utilisé pour les composants UI ?
- [ ] Three.js utilisé pour le rendu 3D ?
- [ ] First Contentful Paint < 1.5s ?
- [ ] Time to Interactive < 3s ?

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
