import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TiktokIcon, InstagramIcon } from '../components/common/SocialIcons';
import personalData from '../data/personal.json';
import AnimatedSection from '../components/common/AnimatedSection';
import './styles/Contact.css';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const socials = [
    { href: personalData.github, icon: <GithubIcon size={20} />, label: 'GitHub' },
    { href: personalData.linkedin, icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
    { href: personalData.tiktok, icon: <TiktokIcon size={20} />, label: 'TikTok' },
    { href: personalData.instagram, icon: <InstagramIcon size={20} />, label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: <Mail size={18} />, label: 'Email', value: personalData.email, href: `mailto:${personalData.email}` },
    { icon: <Phone size={18} />, label: t('about.phone'), value: personalData.phone, href: `tel:${personalData.phone}` },
    { icon: <MapPin size={18} />, label: t('about.location'), value: personalData.location, href: null },
  ];

  const isSubmitting = status === 'sending';
  const canSubmit = form.name && form.email && form.message && !isSubmitting;

  return (
    <>
      <Helmet>
        <title>Contact – Muhammad Ardhana</title>
        <meta name="description" content="Get in touch with Muhammad Ardhana" />
      </Helmet>

      <main className="contact-page section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">{t('contact.title')}</span>
              <h1 className="section-title">{t('contact.subtitle')}</h1>
            </div>
          </AnimatedSection>

          <div className="contact__grid">
            <AnimatedSection>
              <div className="card contact__form-card">
                <div className="contact__form">
                  <div className="contact__form-row">
                    <div className="contact__field">
                      <label htmlFor="name" className="contact__label">{t('contact.name')}</label>
                      <input id="name" name="name" type="text" className="contact__input"
                        placeholder={t('contact.name_placeholder')} value={form.name}
                        onChange={handleChange} disabled={isSubmitting} required />
                    </div>
                    <div className="contact__field">
                      <label htmlFor="email" className="contact__label">{t('contact.email')}</label>
                      <input id="email" name="email" type="email" className="contact__input"
                        placeholder={t('contact.email_placeholder')} value={form.email}
                        onChange={handleChange} disabled={isSubmitting} required />
                    </div>
                  </div>

                  <div className="contact__field">
                    <label htmlFor="subject" className="contact__label">{t('contact.subject')}</label>
                    <input id="subject" name="subject" type="text" className="contact__input"
                      placeholder={t('contact.subject_placeholder')} value={form.subject}
                      onChange={handleChange} disabled={isSubmitting} />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="message" className="contact__label">{t('contact.message')}</label>
                    <textarea id="message" name="message" rows={6} className="contact__input contact__textarea"
                      placeholder={t('contact.message_placeholder')} value={form.message}
                      onChange={handleChange} disabled={isSubmitting} required />
                  </div>

                  {status === 'success' && (
                    <motion.div className="contact__status contact__status--success"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <CheckCircle size={16} />{t('contact.success')}
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div className="contact__status contact__status--error"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} />{t('contact.error')}
                    </motion.div>
                  )}

                  <button className="btn btn-primary btn-lg contact__submit"
                    onClick={handleSubmit} disabled={!canSubmit} type="button">
                    {isSubmitting ? (
                      <><span className="contact__spinner" />{t('contact.sending')}</>
                    ) : (
                      <><Send size={16} />{t('contact.send')}</>
                    )}
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <div className="contact__sidebar">
              <AnimatedSection delay={0.1}>
                <div className="card contact__info-card">
                  {contactInfo.map(item => (
                    <div key={item.label} className="contact__info-item">
                      <span className="contact__info-icon">{item.icon}</span>
                      <div>
                        <span className="contact__info-label">{item.label}</span>
                        {item.href ? (
                          <a href={item.href} className="contact__info-value contact__info-link">{item.value}</a>
                        ) : (
                          <span className="contact__info-value">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="card contact__social-card">
                  <h3 className="contact__social-title">{t('contact.social_title')}</h3>
                  <div className="contact__socials">
                    {socials.map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label} className="contact__social">
                        {s.icon}<span>{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
