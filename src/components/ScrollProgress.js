import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

/**
 * ScrollProgress Component
 * Thin progress bar showing reading progress
 */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="scroll-progress-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX }}
            />
        </motion.div>
    );
};

export default ScrollProgress;
