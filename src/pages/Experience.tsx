import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import experienceData from '../data/experience.json';
import { ExperienceItem } from '../types';
import AnimatedSection from '../components/common/AnimatedSection';
import './styles/Experience.css';

const experience = experienceData as ExperienceItem[];

const Experience: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';

  return (
    <>
      <Helmet>
        <title>Experience – Muhammad Ardhana</title>
        <meta name="description" content="Work experience and professional background of Muhammad Ardhana" />
      </Helmet>

      <main className="exp-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">{t('experience.title')}</span>
              <h1 className="section-title">{t('experience.subtitle')}</h1>
            </div>
          </AnimatedSection>

          <div className="timeline">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                className="timeline__item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="timeline__connector">
                  <div className="timeline__dot">
                    <Briefcase size={14} />
                  </div>
                  {i < experience.length - 1 && <div className="timeline__line" />}
                </div>

                <div className="card timeline__card">
                  <div className="timeline__header">
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div className="timeline__logo">
                        <img
                          src={item.logo}
                          alt={item.company}
                          onError={e => {
                            const el = e.target as HTMLImageElement;
                            el.style.display = 'none';
                            (el.nextSibling as HTMLElement).style.display = 'flex';
                          }}
                        />
                        <span className="timeline__logo-fallback">
                          {item.company.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="timeline__company-info">
                        <h2 className="timeline__company">{item.company}</h2>
                        <p className="timeline__role">{item.role[lang]}</p>
                        <div className="timeline__meta">
                          <span className="timeline__meta-item">
                            <Calendar size={13} />
                            {item.duration.start} — {item.duration.current ? t('experience.present') : item.duration.end}
                          </span>
                          <span className="timeline__meta-item">
                            <MapPin size={13} />
                            {item.location}
                          </span>
                          <span className="badge badge-accent">{item.type[lang]}</span>
                        </div>
                      </div>
                    </div>
                    {item.duration.current && (
                      <span className="badge badge-green timeline__current">
                        {t('experience.present')}
                      </span>
                    )}
                  </div>

                  <div className="timeline__body">
                    <div className="timeline__responsibilities">
                      <h3 className="timeline__section-label">{t('experience.responsibilities')}</h3>
                      <ul className="timeline__list">
                        {item.responsibilities[lang].map((r, ri) => (
                          <li key={ri} className="timeline__list-item">
                            <span className="timeline__bullet" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="timeline__tech">
                      <h3 className="timeline__section-label">{t('experience.technologies')}</h3>
                      <div className="timeline__tags">
                        {item.technologies.map(tech => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Experience;
