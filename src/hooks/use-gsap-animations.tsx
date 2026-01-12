/**
 * GSAP Animation Hooks
 * Reusable page entrance animations inspired by zeitmedia.vn style.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Smooth easing for elegant animations
const SMOOTH_EASE = "power3.out";
const EXPO_EASE = "expo.out";

/**
 * Masked slide-up animation for headlines.
 * Text starts hidden below and slides up with overflow:hidden mask effect.
 */
export const useRevealText = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const child = el.querySelector(".reveal-text");
    if (!child) return;

    gsap.set(child, { yPercent: 100 });
    
    gsap.to(child, {
      yPercent: 0,
      duration: 1.2,
      delay,
      ease: EXPO_EASE,
    });
  }, [delay]);

  return ref;
};

/**
 * Stagger cascade animation for multiple elements.
 * Each element fades in with a slight upward movement, one after another.
 */
export const useStaggerReveal = (delay = 0, staggerAmount = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll(".stagger-item");
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      stagger: staggerAmount,
      ease: SMOOTH_EASE,
    });
  }, [delay, staggerAmount]);

  return ref;
};

/**
 * Image reveal animation with scale effect.
 * Image starts slightly zoomed and fades in smoothly.
 */
export const useImageReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 1.1 });

    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      delay,
      ease: SMOOTH_EASE,
    });
  }, [delay]);

  return ref;
};

/**
 * Hero entrance animation timeline.
 * Orchestrates multiple elements with precise timing.
 */
export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EXPO_EASE },
      });

      // Masked titles slide up
      const titles = container.querySelectorAll(".hero-title-mask");
      titles.forEach((mask, i) => {
        const text = mask.querySelector(".hero-title");
        if (text) {
          gsap.set(text, { yPercent: 100 });
          tl.to(text, {
            yPercent: 0,
            duration: 1.2,
          }, i * 0.1);
        }
      });

      // Stagger elements fade in
      const staggerElements = container.querySelectorAll(".hero-stagger");
      if (staggerElements.length) {
        gsap.set(staggerElements, { opacity: 0, y: 30 });
        tl.to(staggerElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: SMOOTH_EASE,
        }, 0.4);
      }

      // Image/video reveal
      const media = container.querySelector(".hero-media");
      if (media) {
        gsap.set(media, { opacity: 0, scale: 1.05 });
        tl.to(media, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: SMOOTH_EASE,
        }, 0);
      }

      // Floating widget
      const widget = container.querySelector(".hero-widget");
      if (widget) {
        gsap.set(widget, { opacity: 0, x: 50 });
        tl.to(widget, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: SMOOTH_EASE,
        }, 0.8);
      }

      // Footer links
      const footer = container.querySelector(".hero-footer");
      if (footer) {
        gsap.set(footer, { opacity: 0, y: 20 });
        tl.to(footer, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: SMOOTH_EASE,
        }, 0.6);
      }

    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

/**
 * Page entrance animation.
 * Fades in the page content smoothly.
 */
export const usePageEntrance = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      duration: 0.6,
      ease: SMOOTH_EASE,
    });
  }, []);

  return ref;
};

/**
 * Scroll to top using Lenis or native fallback.
 */
export const scrollToTop = () => {
  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};
