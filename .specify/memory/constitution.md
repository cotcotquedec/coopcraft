<!--
Sync Impact Report - Constitution v1.0.0
========================================
Version Change: Initial creation → 1.0.0
Modified Principles: N/A (initial version)
Added Sections: All sections (initial creation)
Removed Sections: None

Templates Status:
✅ plan-template.md - Reviewed, compatible with constitution principles
✅ spec-template.md - Reviewed, compatible with user story approach
✅ tasks-template.md - Reviewed, compatible with phased implementation

Follow-up TODOs: None
-->

# CoopCraft Constitution

## Core Principles

### I. Accessibilité Technique
L'application DOIT rester accessible aux utilisateurs sans compétences en modélisation 3D. Chaque fonctionnalité DOIT être utilisable via une interface intuitive avec des paramètres simples. La complexité technique (Three.js, génération STL/3MF) DOIT être totalement abstraite de l'expérience utilisateur.

**Rationale**: La mission du projet est de démocratiser la création d'outils personnalisés. Exposer la complexité technique irait à l'encontre de cet objectif fondamental.

### II. Visualisation Temps Réel
Toute modification de paramètres DOIT produire une mise à jour immédiate de la prévisualisation 3D. Les utilisateurs DOIVENT pouvoir voir le résultat avant de générer les fichiers d'impression. La latence de rendu DOIT rester imperceptible (<100ms pour les opérations courantes).

**Rationale**: La confiance dans l'outil généré nécessite une validation visuelle instantanée. Sans feedback immédiat, les utilisateurs ne peuvent pas itérer efficacement sur leurs designs.

### III. Qualité d'Impression Garantie
Les fichiers générés (STL/3MF) DOIVENT être valides et imprimables sans post-traitement. Les géométries DOIVENT être manifold (étanches), correctement orientées, et optimisées pour l'impression 3D. Chaque type d'outil DOIT inclure des paramètres d'impression recommandés.

**Rationale**: Un fichier non-imprimable détruit la proposition de valeur. L'utilisateur doit pouvoir passer directement de l'application à l'imprimante 3D.

### IV. Extensibilité par Templates
Chaque type d'outil (gabarit de perçage, guide de coupe, etc.) DOIT être implémenté comme un template paramétrique indépendant. L'ajout de nouveaux types d'outils DOIT être possible sans modifier le core de l'application. Les templates DOIVENT exposer leurs paramètres via un schéma déclaratif.

**Rationale**: La valeur du projet croît avec le nombre d'outils disponibles. Une architecture extensible permet d'enrichir le catalogue sans dette technique.

### V. Performance Client-First
Le rendu 3D et la génération de géométries DOIVENT s'exécuter côté client (navigateur). Le serveur DOIT se limiter au serving de l'application Next.js. Aucune dépendance à des services externes DOIT être requise pour les fonctionnalités core.

**Rationale**: L'exécution client garantit la scalabilité (pas de coût serveur par utilisateur) et permet un usage offline après le premier chargement.

## Architecture & Contraintes Techniques

### Stack Obligatoire
- **Framework**: Next.js (App Router) pour le SSR et l'optimisation
- **UI**: shadcn/ui pour la cohérence et l'accessibilité des composants
- **3D**: Three.js pour le rendu et la manipulation de géométries
- **Export**: Bibliothèques de génération STL/3MF validées (three-stdlib ou équivalent)
- **TypeScript**: Obligatoire pour tous les fichiers source

### Contraintes de Performance
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Rendu 3D**: 60 FPS minimum sur hardware moyen (GPU intégré)
- **Génération fichier**: <2s pour un outil de complexité moyenne

### Contraintes de Qualité
- **Validation géométrique**: Tous les meshes générés DOIVENT passer une validation manifold
- **Tests visuels**: Chaque template DOIT avoir des snapshots de rendu 3D
- **Accessibilité**: WCAG 2.1 niveau AA minimum pour l'interface

## Workflow de Développement

### Ajout d'un Nouveau Type d'Outil
1. **Spécification**: Définir les paramètres utilisateur et les contraintes physiques
2. **Template**: Créer le générateur de géométrie avec validation
3. **UI**: Implémenter le formulaire de paramètres avec shadcn/ui
4. **Tests**: Valider la géométrie et les cas limites
5. **Documentation**: Ajouter des exemples d'usage et paramètres recommandés

### Critères de Qualité
- Chaque template DOIT avoir des tests unitaires pour la génération de géométrie
- Chaque template DOIT avoir au moins 3 exemples pré-configurés
- Les paramètres DOIVENT avoir des valeurs par défaut fonctionnelles
- La documentation DOIT inclure des photos du résultat imprimé (si disponible)

## Gouvernance

### Amendements
Les modifications de cette constitution DOIVENT être documentées avec:
- Justification du changement (problème résolu ou opportunité saisie)
- Impact sur les templates existants
- Plan de migration si nécessaire
- Approbation explicite avant merge

### Versioning
- **MAJOR**: Changement de stack technique ou suppression de principe
- **MINOR**: Ajout de principe ou contrainte technique nouvelle
- **PATCH**: Clarifications, corrections, améliorations de formulation

### Compliance
- Chaque PR DOIT vérifier la conformité aux principes
- Les violations DOIVENT être justifiées explicitement dans la PR
- Les compromis temporaires DOIVENT avoir un plan de résolution
- La complexité injustifiée DOIT être refusée

**Version**: 1.0.0 | **Ratified**: 2025-01-17 | **Last Amended**: 2025-01-17
