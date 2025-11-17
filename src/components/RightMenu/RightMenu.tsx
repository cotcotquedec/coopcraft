'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import { RightMenuProps, MenuState } from './types';

export default function RightMenu({ config }: RightMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  
  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: false,
    activeItemId: null,
  });

  // Déterminer l'item actif basé sur le pathname
  useEffect(() => {
    const activeItem = config.items.find(item => item.href === pathname);
    setMenuState(prev => ({
      ...prev,
      activeItemId: activeItem?.id || null,
    }));
  }, [pathname, config.items]);

  // Gérer la fermeture au clic extérieur (mobile)
  useEffect(() => {
    if (!menuState.isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuState(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuState.isOpen]);

  // Gérer la fermeture avec Escape (mobile)
  useEffect(() => {
    if (!menuState.isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuState(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuState.isOpen]);

  const handleToggle = () => {
    setMenuState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleItemClick = () => {
    // Fermer le menu sur mobile après clic
    setMenuState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {/* Bouton hamburger (mobile uniquement) */}
      <button
        onClick={handleToggle}
        aria-label={menuState.isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuState.isOpen}
        aria-controls="right-menu"
        style={styles.hamburger}
        className="menu-hamburger"
      >
        <span style={styles.hamburgerIcon}>☰</span>
      </button>

      {/* Overlay (mobile uniquement) */}
      {menuState.isOpen && (
        <div
          onClick={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
          style={styles.overlay}
          className="menu-overlay"
        />
      )}

      {/* Menu principal */}
      <nav
        ref={menuRef}
        id="right-menu"
        role="navigation"
        aria-label="Menu principal"
        style={{
          ...styles.menu,
          width: `${config.width}px`,
          transform: menuState.isOpen ? 'translateX(0)' : undefined,
        }}
        className={`menu-nav ${menuState.isOpen ? 'menu-open' : ''}`}
      >
        <ul style={styles.list}>
          {config.items.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={menuState.activeItemId === item.id}
              onClick={handleItemClick}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

const styles = {
  hamburger: {
    display: 'none',
    position: 'fixed' as const,
    top: '20px',
    right: '20px',
    zIndex: 1001,
    padding: '12px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  hamburgerIcon: {
    fontSize: '24px',
    color: '#1e293b',
  },
  overlay: {
    display: 'none',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  menu: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    height: '100vh',
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #e2e8f0',
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto' as const,
    zIndex: 1000,
    transition: 'transform 0.3s ease-in-out',
  },
  list: {
    margin: 0,
    padding: '20px 0',
    listStyle: 'none',
  },
};