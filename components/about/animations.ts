export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0, reduceMotion = false) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.7, delay, ease: EASE },
  },
});

export const fadeLeft = (delay = 0, reduceMotion = false) => ({
  hidden: { opacity: 0, x: reduceMotion ? 0 : -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduceMotion ? 0 : 0.75, delay, ease: EASE },
  },
});

export const fadeRight = (delay = 0, reduceMotion = false) => ({
  hidden: { opacity: 0, x: reduceMotion ? 0 : 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduceMotion ? 0 : 0.75, delay, ease: EASE },
  },
});

export const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
