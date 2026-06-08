import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MapPin, Mail, Phone, Globe, Download } from 'lucide-react';
import personalData from '../data/personal.json';
import AnimatedSection from '../components/common/AnimatedSection';
import './styles/About.css';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';
  const skills = personalData.skills[lang];

  const contactInfo = [
    { icon: <MapPin size={16} />, label: t('about.location'), value: personalData.location, href: null },
    { icon: <Mail size={16} />, label: t('about.email'), value: personalData.email, href: `mailto:${personalData.email}` },
    { icon: <Phone size={16} />, label: t('about.phone'), value: personalData.phone, href: `tel:${personalData.phone}` },
    { icon: <Globe size={16} />, label: t('about.website'), value: personalData.website, href: personalData.website },
  ];

  return (
    <>
      <Helmet>
        <title>About – Muhammad Ardhana</title>
        <meta name="description" content={personalData.bio[lang]} />
      </Helmet>

      <main className="about-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">{t('about.title')}</span>
              <h1 className="section-title">{t('about.subtitle')}</h1>
            </div>
          </AnimatedSection>

          {/* ── Bio + Contact ──────────────────────────────────── */}
          <div className="about__grid">
            <AnimatedSection>
              <div className="about__bio card">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  className="about__photo"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Aryan+Kusuma&size=300&background=b5834a&color=fff&font-size=0.35`;
                  }}
                />
                <div className="about__bio-text">
                  <h2 className="about__bio-name">{personalData.name}</h2>
                  <p className="about__bio-title">{personalData.title[lang]}</p>
                  <p className="about__bio-desc">{personalData.bio[lang]}</p>
                  <a
                    href={personalData.cvUrl}
                    download
                    className="btn btn-primary"
                    style={{ marginTop: '8px' }}
                  >
                    <Download size={16} />
                    {t('hero.cta_cv')}
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <div className="about__sidebar">
              <AnimatedSection delay={0.1}>
                <div className="card about__contact-card">
                  <h3 className="about__card-title">{t('about.contact_title')}</h3>
                  <div className="about__contact-list">
                    {contactInfo.map(item => (
                      <div key={item.label} className="about__contact-item">
                        <span className="about__contact-icon">{item.icon}</span>
                        <div>
                          <span className="about__contact-label">{item.label}</span>
                          {item.href ? (
                            <a href={item.href} className="about__contact-value about__contact-link" target="_blank" rel="noopener noreferrer">
                              {item.value}
                            </a>
                          ) : (
                            <span className="about__contact-value">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* ── Skills ─────────────────────────────────────────── */}
          <AnimatedSection>
            <div className="about__skills-section">
              <div className="section-header" style={{ marginBottom: '48px' }}>
                <span className="section-label">{t('about.skills_title')}</span>
              </div>
              <div className="about__skills-grid">
                {skills.map((group, i) => (
                  <motion.div
                    key={group.category}
                    className="card about__skill-group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="about__skill-category">{group.category}</h3>
                    <div className="about__skill-tags">
                      {group.items.map(skill => (
                        <span key={skill} className="tag">{skill}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </>
  );
};

export default About;
