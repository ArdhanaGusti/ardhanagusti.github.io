import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('portfolio-lang', next);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/education', label: t('nav.education') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <NavLink to="/" className="navbar__brand">
            <span className="navbar__logo">MA</span>
            <span className="navbar__name">Ardhana<span className="navbar__name-accent">.</span></span>
          </NavLink>

          <nav className="navbar__links" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              onClick={toggleLang}
              aria-label="Toggle language"
              title={i18n.language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
            >
              <Globe size={18} />
              <span className="navbar__lang-label">{i18n.language.toUpperCase()}</span>
            </button>

            <button
              className="navbar__icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'light' ? t('common.theme_dark') : t('common.theme_light')}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="navbar__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="navbar__drawer-header">
                <span className="navbar__brand">
                  <span className="navbar__logo">AK</span>
                  <span className="navbar__name">Aryan<span className="navbar__name-accent">.</span></span>
                </span>
                <button className="navbar__icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <nav className="navbar__drawer-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="navbar__drawer-footer">
                <button className="btn btn-outline btn-sm" onClick={toggleLang}>
                  <Globe size={15} />
                  {i18n.language === 'en' ? 'Indonesia' : 'English'}
                </button>
                <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                  {theme === 'light' ? t('common.theme_dark') : t('common.theme_light')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
