import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const InteractiveBackground = () => {
  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 40, stiffness: 100 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Set initial position to center of screen
    cursorX.set(window.innerWidth / 2 - 250);
    cursorY.set(window.innerHeight / 2 - 250);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 250); // offset by half the size
      cursorY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
      {/* Subtle Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>

      {/* Interactive Orb following mouse */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#E0aaff]/20 blur-[120px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Random ambient orb 1 */}
      <motion.div
        animate={{
          x: [0, 400, -200, 0],
          y: [0, -300, 300, 0],
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#8a2be2]/10 blur-[150px]"
      />

      {/* Random ambient orb 2 */}
      <motion.div
        animate={{
          x: [0, -400, 300, 0],
          y: [0, 400, -200, 0],
          scale: [1, 0.9, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-[#E0aaff]/10 blur-[150px]"
      />
    </div>
  );
};

export default InteractiveBackground;
