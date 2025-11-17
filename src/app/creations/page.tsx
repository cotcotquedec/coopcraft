import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mes créations - CoopCraft',
  description: 'Gérer vos créations sauvegardées',
};

export default function CreationsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>💾 Mes créations</h1>
        <p style={styles.description}>
          Retrouvez et gérez toutes vos créations d'outils 3D personnalisés.
        </p>
        <div style={styles.infoBox}>
          <h2 style={styles.subtitle}>Fonctionnalités à venir</h2>
          <ul style={styles.list}>
            <li>✨ Sauvegarde de vos projets</li>
            <li>📂 Organisation par catégories</li>
            <li>🔄 Modification de vos créations</li>
            <li>💾 Export et partage</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(to bottom, #fae8ff, #f3e8ff)',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#0f172a',
  },
  description: {
    fontSize: '1.125rem',
    color: '#475569',
    marginBottom: '2rem',
  },
  infoBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    textAlign: 'left' as const,
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1e293b',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
};