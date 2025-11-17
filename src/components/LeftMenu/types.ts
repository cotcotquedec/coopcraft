/**
 * Types et interfaces pour le menu de navigation latéral gauche
 * @module LeftMenu/types
 */

/**
 * Représente un élément du menu de navigation
 */
export interface MenuItem {
  /** Identifiant unique */
  id: string;
  /** Libellé affiché */
  label: string;
  /** Route de destination */
  href: string;
  /** Icône optionnelle (future) */
  icon?: string;
  /** Description pour accessibilité */
  description?: string;
}

/**
 * Configuration du menu de navigation
 */
export interface MenuConfig {
  /** Liste des items */
  items: MenuItem[];
  /** Largeur en pixels (desktop) */
  width: number;
  /** Breakpoint mobile en pixels */
  mobileBreakpoint: number;
  /** Position du menu */
  position?: 'left' | 'right';
}

/**
 * État interne du menu
 */
export interface MenuState {
  /** Menu ouvert (mobile uniquement) */
  isOpen: boolean;
  /** ID de l'item actif */
  activeItemId: string | null;
}

/**
 * Props du composant LeftMenu
 */
export interface LeftMenuProps {
  /** Configuration du menu */
  config: MenuConfig;
}

/**
 * Props du composant MenuItem
 */
export interface MenuItemProps {
  /** Données de l'item */
  item: MenuItem;
  /** Item actuellement actif */
  isActive: boolean;
  /** Callback au clic */
  onClick?: () => void;
}