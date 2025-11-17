'use client';

import Link from 'next/link';
import { MenuItemProps } from './types';

export default function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  return (
    <li style={styles.listItem}>
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.description || item.label}
        className="menu-item-link"
        style={{
          ...styles.link,
          ...(isActive ? styles.linkActive : {}),
        }}
      >
        {item.icon && <span style={styles.icon}>{item.icon}</span>}
        <span style={styles.label}>{item.label}</span>
      </Link>
    </li>
  );
}

const styles = {
  listItem: {
    listStyle: 'none',
    margin: 0,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: '#475569',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    borderLeft: '3px solid transparent',
  } as React.CSSProperties,
  linkActive: {
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    borderLeftColor: '#3b82f6',
    fontWeight: '600',
  } as React.CSSProperties,
  icon: {
    fontSize: '20px',
  },
  label: {
    fontSize: '15px',
  },
};