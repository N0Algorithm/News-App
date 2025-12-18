import React from 'react';
import { motion } from 'framer-motion';
import './Loading.css';

/**
 * Premium Loading Component
 * Animated dots with smooth motion
 */
const Loading = () => {
    const dotVariants = {
        initial: { y: 0 },
        animate: (i) => ({
            y: [-8, 0, -8],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="premium-loader">
            <div className="loader-dots">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="loader-dot"
                        custom={i}
                        variants={dotVariants}
                        initial="initial"
                        animate="animate"
                    />
                ))}
            </div>
            <motion.span
                className="loader-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Loading news...
            </motion.span>
        </div>
    );
};

export default Loading;
