/**
 * Animation Variants & Motion Tokens
 * Premium editorial animations for NewsTempo
 */

// ===== ARTICLE CARD HOVER LIFT =====
export const cardHover = {
    rest: {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: {
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    hover: {
        y: -8,
        scale: 1.01,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)",
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1
        }
    }
};

// Image zoom on card hover
export const imageHover = {
    rest: {
        scale: 1,
        filter: "brightness(1)",
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    hover: {
        scale: 1.05,
        filter: "brightness(1.05)",
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// Title underline animation
export const titleUnderline = {
    rest: {
        scaleX: 0,
        originX: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    hover: {
        scaleX: 1,
        originX: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== SMART HEADLINE REVEAL =====
export const headlineReveal = {
    hidden: {
        opacity: 0,
        y: 12
    },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    })
};

// Staggered container for multiple items
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

export const staggerItem = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== SECTION TRANSITIONS =====
export const pageTransition = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== IMAGE LOADING BLUR =====
export const imageBlur = {
    loading: {
        filter: "blur(20px)",
        scale: 1.1,
        opacity: 0.7
    },
    loaded: {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== QUOTE HIGHLIGHT =====
export const quoteReveal = {
    hidden: {
        opacity: 0,
        x: -30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

export const quoteBackground = {
    hidden: {
        scaleX: 0,
        originX: 0
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== PARAGRAPH FADE-IN =====
export const paragraphReveal = {
    hidden: {
        opacity: 0,
        y: 4
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

// ===== CONTINUE READING REVEAL =====
export const expandReveal = {
    collapsed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    expanded: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== INLINE FACT CALLOUT =====
export const calloutExpand = {
    collapsed: {
        height: 40,
        opacity: 0.9
    },
    expanded: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

// ===== FADE VARIANTS (For reduced motion) =====
export const fadeOnly = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

// ===== LOADING SPINNER =====
export const spinTransition = {
    repeat: Infinity,
    duration: 1,
    ease: "linear"
};

export const pulseVariants = {
    initial: { scale: 0.95, opacity: 0.7 },
    animate: {
        scale: [0.95, 1.05, 0.95],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// ===== UTILITY: Check for reduced motion =====
export const getReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Motion wrapper that respects reduced motion
export const getMotionVariant = (fullMotion, reducedMotion) => {
    return getReducedMotion() ? reducedMotion : fullMotion;
};

// Spring configs
export const springConfig = {
    gentle: { type: "spring", stiffness: 120, damping: 14 },
    snappy: { type: "spring", stiffness: 300, damping: 20 },
    slow: { type: "spring", stiffness: 80, damping: 20 }
};

// Easing curves
export const easings = {
    smooth: [0.25, 0.1, 0.25, 1],
    snappy: [0.4, 0, 0.2, 1],
    gentle: [0.22, 1, 0.36, 1]
};
