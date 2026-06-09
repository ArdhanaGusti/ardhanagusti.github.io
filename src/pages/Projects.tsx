import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Search, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { GithubIcon } from '../components/common/SocialIcons';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import AnimatedSection from '../components/common/AnimatedSection';
import './styles/Projects.css';

const projects = projectsData as Project[];

const statusColorMap: Record<string, string> = {
  completed: 'badge-green',
  'in-progress': 'badge-blue',
  archived: 'badge-muted',
};

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'id';
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const all = projects.flatMap(p => p.category);
    return ['All', ...Array.from(new Set(all))];
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchFilter =
        activeFilter === 'All' || p.category.includes(activeFilter);
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const statusLabel = (status: string) => {
    if (status === 'completed') return t('projects.status_completed');
    if (status === 'in-progress') return t('projects.status_in_progress');
    return t('projects.status_archived');
  };

  return (
    <>
      <Helmet>
        <title>Projects – Muhammad Ardhana</title>
        <meta name="description" content="Portfolio projects built by Muhammad Ardhana" />
      </Helmet>

      <main className="projects-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">{t('projects.title')}</span>
              <h1 className="section-title">{t('projects.subtitle')}</h1>
            </div>
          </AnimatedSection>

          {/* ── Filters ─────────────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div className="projects__toolbar">
              <div className="projects__search-wrap">
                <Search size={16} className="projects__search-icon" />
                <input
                  type="text"
                  placeholder={t('projects.search_placeholder')}
                  className="projects__search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label={t('projects.search_placeholder')}
                />
              </div>

              <div className="projects__filters" role="group" aria-label="Filter by category">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`projects__filter-btn${activeFilter === cat ? ' projects__filter-btn--active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                    aria-pressed={activeFilter === cat}
                  >
                    {cat === 'All' ? t('projects.filter_all') : cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* ── Grid ──────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="projects__empty">
              <p>{t('projects.no_results')}</p>
            </div>
          ) : (
            <div className="projects__grid">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="card project-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  layout
                >
                  <div className="project-card__thumb">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      onError={e => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = 'none';
                        el.parentElement!.classList.add('project-card__thumb--fallback');
                      }}
                    />
                    <div className="project-card__thumb-overlay">
                      <Link to={`/projects/${project.id}`} className="btn btn-primary btn-sm">
                        {t('projects.view_details')}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="project-card__body">
                    <div className="project-card__top">
                      <div className="project-card__badges">
                        <span className={`badge ${statusColorMap[project.status]}`}>
                          {statusLabel(project.status)}
                        </span>
                        {project.featured && (
                          <span className="badge badge-accent">
                            <Star size={10} style={{ marginRight: 3 }} />
                            {t('common.featured')}
                          </span>
                        )}
                      </div>
                      <span className="project-card__year">{project.year}</span>
                    </div>

                    <h2 className="project-card__title">
                      <Link to={`/projects/${project.id}`}>{project.title}</Link>
                    </h2>
                    <p className="project-card__desc">{project.shortDesc[lang]}</p>

                    <div className="project-card__tags">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tag">+{project.technologies.length - 4}</span>
                      )}
                    </div>

                    <div className="project-card__links">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="GitHub">
                        <GithubIcon size={14} />
                        {t('projects.view_code')}
                      </a>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="Demo">
                        <ExternalLink size={14} />
                        {t('projects.view_demo')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Projects;
