// utils/motion.js

// Function for sliding in from the left with a delay

export function slideInFromLeft(delay: number) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
}

// Function for sliding in from the right with a delay
export function slideInFromRight(delay: number) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
}

// Object for sliding in from the top
export const slideInFromTop = {
  hidden: { opacity: 0, y: "-100vh" }, // Start completely off-screen
  visible: { opacity: 1, y: "0", transition: { duration: 1 } }, // Slide into place
};
export const fadeIn = {
  hidden: { opacity: 0 }, // Start fully transparent
  visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }, // Fade in smoothly
};
export const slideInFromTop2 = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
