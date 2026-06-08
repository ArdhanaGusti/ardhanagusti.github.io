import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
}) => {
  const { ref, inView } = useInView({ threshold: 0.12, once: true });

  const getInitial = () => ({
    opacity: 0,
    y: direction === 'up' ? 30 : 0,
    x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : getInitial()}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
