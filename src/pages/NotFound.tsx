import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';
import './styles/NotFound.css';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>404 – Aryan Kusuma</title>
      </Helmet>

      <main className="notfound">
        <motion.div
          className="notfound__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="notfound__code">404</span>
          <h1 className="notfound__title">{t('common.not_found')}</h1>
          <p className="notfound__desc">{t('common.not_found_desc')}</p>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            {t('common.go_home')}
          </Link>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
