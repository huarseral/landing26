import React, { useState } from 'react';

export interface NavLink {
  label: string;
  href: string;
}



export interface NavbarProps {
  logo?: React.ReactNode | string;
  links?: NavLink[];
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Contacto', href: '#contacts-registration' },
];

/**
 * Reusable Navbar component supporting desktop navigation,
 * a hamburger toggle, and an animated offcanvas slide-out sidebar for mobile.
 */
export const Navbar: React.FC<NavbarProps> = ({
  logo = 'LAChirana Plat',
  links = DEFAULT_LINKS,
  ctaLabel = 'Registrarse',
  onCtaClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex-shrink-0 flex items-center">
        {typeof logo === 'string' ? (
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
            {logo}
          </span>
        ) : (
          logo
        )}
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
          >
            {link.label}
          </a>
        ))}
        {onCtaClick && (
          <button
            onClick={onCtaClick}
            className="ml-4 rounded-full bg-teal-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex md:hidden">
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
        >
          {/* Hamburger Icon SVG */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Backdrop (Dark Overlay for Mobile Offcanvas) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Offcanvas Drawer (Slides in from the right) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              {typeof logo === 'string' ? logo : 'Menú'}
            </span>
            <button
              onClick={toggleMenu}
              aria-label="Close navigation menu"
              className="p-2 rounded-md text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
            >
              {/* Close (X) Icon SVG */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="text-base font-medium text-slate-300 hover:text-teal-400 transition-colors py-2 border-b border-slate-800/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Drawer CTA Button */}
        {onCtaClick && (
          <div className="mt-8">
            <button
              onClick={() => {
                toggleMenu();
                onCtaClick();
              }}
              className="w-full rounded-full bg-teal-500 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              {ctaLabel}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
