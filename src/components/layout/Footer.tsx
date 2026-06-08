import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, TiktokIcon } from '../common/SocialIcons';
import personalData from '../../data/personal.json';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/education', label: t('nav.education') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socials = [
    { href: personalData.github, icon: <GithubIcon size={18} />, label: 'GitHub' },
    { href: personalData.linkedin, icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
    { href: personalData.tiktok, icon: <TiktokIcon size={18} />, label: 'TikTok' },
    { href: personalData.instagram, icon: <InstagramIcon size={18} />, label: 'Instagram' },
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo-wrap">
              <span className="footer__logo">MA</span>
              <span className="footer__name">Muhammad Ardhana</span>
            </Link>
            <p className="footer__tagline">
              {t('hero.cta_contact')} — let's build something great together.
            </p>
            <div className="footer__socials">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer__social-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <span className="footer__nav-title">Navigation</span>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="footer__nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__contact">
            <span className="footer__nav-title">Contact</span>
            <a href={`mailto:${personalData.email}`} className="footer__nav-link">{personalData.email}</a>
            <a href={`tel:${personalData.phone}`} className="footer__nav-link">{personalData.phone}</a>
            <span className="footer__nav-link footer__location">{personalData.location}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Muhammad Ardhana. {t('footer.rights')}
          </p>
          <p className="footer__made">
            {t('footer.built_with')} <Heart size={13} className="footer__heart" /> {t('footer.and')} <Code2 size={13} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
