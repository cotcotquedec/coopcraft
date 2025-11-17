# CoopCraft Speckit - Guide de Démarrage

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (port 4000)
npm run dev
```

L'application sera accessible sur **http://localhost:4000**

## 📁 Architecture du Projet

### Principe: Collocation Maximale

Le projet suit une architecture simple où **1 page = 1 fichier** et **1 endpoint = 1 fichier**.

```
coopcraft/
├── src/
│   └── app/
│       ├── layout.tsx          # Layout racine
│       ├── globals.css         # Styles globaux
│       ├── page.tsx            # Page d'accueil (tout en un fichier)
│       └── api/
│           └── health/
│               └── route.ts    # Endpoint health (Command Pattern)
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

### Pages Frontend

Chaque page contient dans un seul fichier:
- Les métadonnées
- Le composant React
- Les styles inline
- La logique métier locale
- Les types TypeScript nécessaires

**Exemple**: [`src/app/page.tsx`](src/app/page.tsx:1)

### Endpoints Backend (API Routes)

Chaque endpoint suit le **Command Pattern** avec tout dans un fichier:
- Les types TypeScript
- La classe Command (logique métier)
- Les handlers HTTP (GET, POST, etc.)
- La gestion d'erreurs

**Exemple**: [`src/app/api/health/route.ts`](src/app/api/health/route.ts:1)

## 🎯 Avantages de cette Architecture

### ✅ Collocation Maximale
- Tout le code d'une fonctionnalité est au même endroit
- Pas de navigation entre multiples fichiers
- Modifications localisées

### ✅ Évolutivité Simple
- Ajouter une page = créer 1 fichier
- Ajouter un endpoint = créer 1 fichier
- Pas de refactoring global nécessaire

### ✅ Maintenance Facilitée
- Comprendre une fonctionnalité = lire 1 fichier
- Supprimer une fonctionnalité = supprimer 1 fichier
- Pas de dépendances cachées

## 📝 Ajouter une Nouvelle Page

```typescript
// src/app/ma-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ma Page',
};

export default function MaPage() {
  // Toute la logique ici
  return <div>Contenu</div>;
}

// Styles inline
const styles = {
  // ...
};
```

## 📝 Ajouter un Nouveau Endpoint

```typescript
// src/app/api/mon-endpoint/route.ts

// Types
interface MonPayload {
  // ...
}

// Command
class MonCommand {
  execute(payload: MonPayload) {
    // Logique métier
  }
}

// Handler
export async function POST(request: NextRequest) {
  const command = new MonCommand();
  const result = command.execute(await request.json());
  return NextResponse.json(result);
}
```

## 🔧 Configuration

### Port du Serveur
Le serveur démarre sur le **port 4000** (configuré dans [`package.json`](package.json:7))

### TypeScript
Configuration stricte activée dans [`tsconfig.json`](tsconfig.json:1)

### Next.js
Configuration minimale dans [`next.config.ts`](next.config.ts:1)

## 🧪 Tester l'API

```bash
# Health check
curl http://localhost:4000/api/health

# Avec payload
curl -X POST http://localhost:4000/api/health \
  -H "Content-Type: application/json" \
  -d '{"ping":"ping"}'
```

## 📚 Stack Technique

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js
- **Port**: 4000

## 🎨 Philosophie de Développement

1. **Simplicité**: Pas de sur-ingénierie
2. **Collocation**: Code proche de son usage
3. **Lisibilité**: Un fichier = une fonctionnalité complète
4. **Évolutivité**: Ajouter sans modifier l'existant
5. **Performance**: Optimisations Next.js natives

## 📖 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Command Pattern](https://refactoring.guru/design-patterns/command)