"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './global.css';

export interface NavbarProps {
  logo?: React.ReactNode;
  links: { label: string; href: string }[];
  rightContent?: React.ReactNode;
}

export function Navbar({ logo, links, rightContent }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          {logo || 'SimplesGestor'}
        </Link>

        {/* Menu para desktop */}
        <div className="navbar-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botões de ação */}
        <div className="navbar-actions">
          {rightContent}
        </div>

        {/* Menu mobile */}
        <button 
          className="navbar-toggle" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {/* Menu dropdown mobile */}
      {open && (
        <div className="navbar-mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {rightContent}
        </div>
      )}
    </nav>
  );
}
