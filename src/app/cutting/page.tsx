import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides de coupe - CoopCraft',
  description: 'Générer des guides de coupe précis',
};

export default function CuttingPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>✂️ Guides de coupe</h1>
        <p style={styles.description}>
          Générez des guides de coupe précis pour vos découpes d'atelier.
        </p>
        <div style={styles.infoBox}>
          <h2 style={styles.subtitle}>Fonctionnalités à venir</h2>
          <ul style={styles.list}>
            <li>✨ Création de guides personnalisés</li>
            <li>📐 Angles de coupe ajustables</li>
            <li>📏 Mesures précises</li>
            <li>💾 Export en STL/3MF</li>
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
    background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
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