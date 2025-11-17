/**
 * Page d'accueil - Architecture simple: 1 page = 1 fichier
 * Contient toute la logique et les composants nécessaires pour cette page
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accueil - CoopCraft Speckit',
  description: 'Bienvenue sur CoopCraft Speckit',
};

// Composant de la page d'accueil
export default function HomePage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Bienvenue sur CoopCraft Speckit 🚀
        </h1>
        
        <p style={styles.description}>
          Plateforme de génération d'outils 3D personnalisés
        </p>

        <div style={styles.infoBox}>
          <h2 style={styles.subtitle}>Environnement technique initialisé</h2>
          <ul style={styles.list}>
            <li>✅ Next.js avec TypeScript</li>
            <li>✅ Architecture simple (1 page = 1 fichier)</li>
            <li>✅ Serveur sur le port 4000</li>
            <li>✅ Command Pattern pour les endpoints</li>
          </ul>
        </div>

        <div style={styles.links}>
          <a href="/api/health" style={styles.link}>
            Tester l'API →
          </a>
        </div>
      </div>
    </main>
  );
}

// Styles inline pour maximiser la collocation
const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#0f172a',
  },
  description: {
    fontSize: '1.25rem',
    color: '#475569',
    marginBottom: '3rem',
  },
  infoBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    marginBottom: '2rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1e293b',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  link: {
    padding: '0.75rem 1.5rem',
    background: '#3b82f6',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
};