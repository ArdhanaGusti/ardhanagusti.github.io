import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Calendar, MapPin, Award, Star } from 'lucide-react';
import educationData from '../data/education.json';
import { EducationItem } from '../types';
import AnimatedSection from '../components/common/AnimatedSection';
import './styles/Education.css';

const education = educationData as EducationItem[];

const Education: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';

  return (
    <>
      <Helmet>
        <title>Education – Aryan Kusuma</title>
        <meta name="description" content="Educational background of Aryan Kusuma" />
      </Helmet>

      <main className="edu-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">{t('education.title')}</span>
              <h1 className="section-title">{t('education.subtitle')}</h1>
            </div>
          </AnimatedSection>

          <div className="timeline edu-timeline">
            {education.map((item, i) => (
              <motion.div
                key={item.id}
                className="timeline__item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="timeline__connector">
                  <div className="timeline__dot timeline__dot--edu">
                    <GraduationCap size={14} />
                  </div>
                  {i < education.length - 1 && <div className="timeline__line" />}
                </div>

                <div className="card timeline__card">
                  <div className="edu__header">
                    <div className="edu__initials">{item.institutionShort}</div>
                    <div className="edu__header-text">
                      <h2 className="edu__institution">{item.institution}</h2>
                      <p className="edu__degree">{item.degree[lang]}</p>
                      <div className="timeline__meta">
                        <span className="timeline__meta-item">
                          <Calendar size={13} />
                          {item.duration.start} — {item.duration.end}
                        </span>
                        <span className="timeline__meta-item">
                          <MapPin size={13} />
                          {item.location}
                        </span>
                        {item.gpa && (
                          <span className="timeline__meta-item">
                            <Star size={13} />
                            {t('education.gpa')}: {item.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="edu__description">{item.description[lang]}</p>

                  <div>
                    <h3 className="timeline__section-label">
                      <Award size={13} style={{ display: 'inline', marginRight: 6 }} />
                      {t('education.achievements')}
                    </h3>
                    <div className="edu__achievements">
                      {item.achievements[lang].map((a, ai) => (
                        <span key={ai} className="badge badge-accent">{a}</span>
                      ))}
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

export default Education;
