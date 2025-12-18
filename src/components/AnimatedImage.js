import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { imageBlur, fadeOnly, getReducedMotion } from '../utils/animations';
import './AnimatedImage.css';

/**
 * AnimatedImage Component
 * Image with blur-up loading effect
 */
const AnimatedImage = ({
    src,
    alt,
    className = '',
    fallbackSrc,
    aspectRatio = '16/9',
    eager = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const reducedMotion = getReducedMotion();

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        if (fallbackSrc) {
            setIsLoaded(true);
        }
    };

    const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;
    const variants = reducedMotion ? fadeOnly : imageBlur;

    return (
        <div
            className={`animated-image-container ${className}`}
            style={{ aspectRatio }}
        >
            {/* Skeleton placeholder */}
            <motion.div
                className="animated-image-skeleton"
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Actual image */}
            <motion.img
                src={imageSrc}
                alt={alt}
                className="animated-image"
                loading={eager ? "eager" : "lazy"}
                onLoad={handleLoad}
                onError={handleError}
                initial="loading"
                animate={isLoaded ? "loaded" : "loading"}
                variants={variants}
            />
        </div>
    );
};

export default AnimatedImage;
