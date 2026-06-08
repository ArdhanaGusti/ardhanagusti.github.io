import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Download, ChevronDown, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';
import personalData from '../data/personal.json';
import './styles/Home.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as any },
});

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';

  const stats = [
    { value: '5+', label: lang === 'en' ? 'Years Experience' : 'Tahun Pengalaman' },
    { value: '30+', label: lang === 'en' ? 'Projects Completed' : 'Proyek Selesai' },
    { value: '10+', label: lang === 'en' ? 'Happy Clients' : 'Klien Puas' },
    { value: '500+', label: lang === 'en' ? 'GitHub Stars' : 'Bintang GitHub' },
  ];

  return (
    <>
      <Helmet>
        <title>Muhammad Ardhana – Software Engineer</title>
        <meta name="description" content={personalData.bio[lang]} />
      </Helmet>

      <main className="home">
        <section className="hero" aria-label="Hero section">
          <div className="hero__bg-ornament" aria-hidden="true" />
          <div className="container hero__content">
            <div className="hero__text">
              <motion.div className="hero__eyebrow" {...fadeUp(0.1)}>
                <span className="hero__dot" />
                <span>{lang === 'en' ? 'Open to opportunities' : 'Terbuka untuk peluang'}</span>
              </motion.div>

              <motion.p className="hero__greeting" {...fadeUp(0.2)}>{t('hero.greeting')}</motion.p>

              <motion.h1 className="hero__name" {...fadeUp(0.3)}>
                Muhammad<br /><span className="hero__name-accent">Ardhana</span>
              </motion.h1>

              <motion.p className="hero__title" {...fadeUp(0.4)}>{personalData.title[lang]}</motion.p>
              <motion.p className="hero__subtitle" {...fadeUp(0.5)}>{personalData.subtitle[lang]}</motion.p>

              <motion.div className="hero__location" {...fadeUp(0.55)}>
                <MapPin size={14} /><span>{personalData.location}</span>
              </motion.div>

              <motion.div className="hero__actions" {...fadeUp(0.6)}>
                <Link to="/projects" className="btn btn-primary btn-lg">
                  {t('hero.cta_work')}<ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg">{t('hero.cta_contact')}</Link>
                <a href={personalData.cvUrl} download className="btn btn-ghost btn-lg" aria-label="Download CV">
                  <Download size={16} />{t('hero.cta_cv')}
                </a>
              </motion.div>

              <motion.div className="hero__socials" {...fadeUp(0.7)}>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero__social">
                  <GithubIcon size={18} />
                </a>
                <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero__social">
                  <LinkedinIcon size={18} />
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero__avatar-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="hero__avatar-ring" aria-hidden="true" />
              <div className="hero__avatar">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Muhammad+Ardhana&size=400&background=b5834a&color=fff&font-size=0.35`;
                  }}
                />
              </div>
              <motion.div className="hero__badge hero__badge--top" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <span className="hero__badge-dot hero__badge-dot--green" />
                <span>{lang === 'en' ? 'Available' : 'Tersedia'}</span>
              </motion.div>
              <motion.div className="hero__badge hero__badge--bottom" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <span>🚀</span><span>Full Stack</span>
              </motion.div>
            </motion.div>
          </div>

          <motion.a className="hero__scroll" href="#stats" aria-label={t('hero.scroll')} {...fadeUp(1.0)}>
            <span>{t('hero.scroll')}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.a>
        </section>

        <section id="stats" className="stats section">
          <div className="container">
            <div className="stats__grid">
              {stats.map((s, i) => (
                <motion.div key={i} className="stats__item card"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                  <span className="stats__value">{s.value}</span>
                  <span className="stats__label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="skills-preview section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{lang === 'en' ? 'What I do' : 'Apa yang saya lakukan'}</span>
              <h2 className="section-title">{lang === 'en' ? 'Core Technologies' : 'Teknologi Utama'}</h2>
            </div>
            <div className="skills-preview__tags">
              {['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Redis', 'Figma'].map((skill, i) => (
                <motion.span key={skill} className="tag"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="skills-preview__cta">
              <Link to="/about" className="btn btn-outline">
                {lang === 'en' ? 'See all skills' : 'Lihat semua keahlian'}<ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
