import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GithubIcon } from '../components/common/SocialIcons';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import './styles/ProjectDetail.css';

const projects = projectsData as Project[];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find(p => p.id === id);
  if (!project) return <Navigate to="/projects" replace />;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + project.screenshots.length) % project.screenshots.length : 0));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % project.screenshots.length : 0));

  return (
    <>
      <Helmet>
        <title>{project.title} – Muhammad Ardhana</title>
        <meta name="description" content={project.shortDesc[lang]} />
      </Helmet>

      <main className="detail-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="detail__back"
          >
            <Link to="/projects" className="btn btn-ghost btn-sm">
              <ArrowLeft size={15} />
              {t('projects.back')}
            </Link>
          </motion.div>

          <div className="detail__layout">
            {/* ── Main ──────────────────────────────────────── */}
            <motion.div
              className="detail__main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Screenshots */}
              {project.screenshots.length > 0 && (
                <div className="detail__screenshots">
                  {project.screenshots.map((shot, i) => (
                    <div
                      key={i}
                      className="detail__screenshot"
                      onClick={() => openLightbox(i)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Screenshot ${i + 1}`}
                      onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                    >
                      <img
                        src={shot}
                        alt={`${project.title} screenshot ${i + 1}`}
                        onError={e => {
                          const el = e.target as HTMLImageElement;
                          el.parentElement!.style.display = 'none';
                        }}
                      />
                      <div className="detail__screenshot-overlay">
                        <span>Click to expand</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="card detail__desc-card">
                <p className="detail__description">{project.description[lang]}</p>
              </div>

              {/* Features */}
              <div className="card detail__card">
                <h2 className="detail__card-title">{t('projects.features')}</h2>
                <ul className="detail__features">
                  {project.features[lang].map((f, i) => (
                    <li key={i} className="detail__feature">
                      <span className="detail__feature-check"><Check size={13} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Sidebar ──────────────────────────────────── */}
            <motion.div
              className="detail__sidebar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card detail__meta-card">
                <h1 className="detail__title">{project.title}</h1>
                <p className="detail__short-desc">{project.shortDesc[lang]}</p>

                <div className="detail__meta-list">
                  <div className="detail__meta-item">
                    <span className="detail__meta-label">{t('common.year')}</span>
                    <span className="detail__meta-value">{project.year}</span>
                  </div>
                  <div className="detail__meta-item">
                    <span className="detail__meta-label">Status</span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className={`badge ${project.status === 'completed' ? 'badge-green' : 'badge-blue'}`}>
                        {project.status === 'completed' ? t('projects.status_completed') : t('projects.status_in_progress')}
                      </span>
                      {project.private && (
                        <span className="badge badge-rose">
                          {t('common.private')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="detail__meta-item">
                    <span className="detail__meta-label">Categories</span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {project.category.map(c => (
                        <span key={c} className="badge badge-muted">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="detail__links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1 }}>
                      <GithubIcon size={16} />
                      {t('projects.view_code')}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                      <ExternalLink size={16} />
                      {t('projects.view_demo')}
                    </a>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="card detail__card">
                <h2 className="detail__card-title">{t('projects.tech_stack')}</h2>
                <div className="detail__tech-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-label="Image lightbox">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            <X size={20} />
          </button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); prevImage(); }} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
            <img src={project.screenshots[lightboxIndex]} alt={`Screenshot ${lightboxIndex + 1}`} />
            <span className="lightbox__counter">{lightboxIndex + 1} / {project.screenshots.length}</span>
          </div>
          <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); nextImage(); }} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
