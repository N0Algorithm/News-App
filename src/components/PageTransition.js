import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageTransition, fadeOnly, getReducedMotion } from '../utils/animations';

/**
 * PageTransition Component
 * Smooth fade/slide transitions between pages
 */
const PageTransition = ({ children }) => {
    const location = useLocation();
    const reducedMotion = getReducedMotion();
    const variants = reducedMotion ? fadeOnly : pageTransition;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={variants}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
