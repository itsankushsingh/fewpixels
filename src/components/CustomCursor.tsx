import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorMode = 'default' | 'pointer' | 'text';

const CustomCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const clickRippleKey = useRef(0);
  const [rippleVisible, setRippleVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const springFast = { stiffness: 380, damping: 28, mass: 0.4 };
  const springSlow = { stiffness: 90,  damping: 18, mass: 0.8 };

  const dotX  = useSpring(rawX, springFast);
  const dotY  = useSpring(rawY, springFast);
  const ringX = useSpring(rawX, springSlow);
  const ringY = useSpring(rawY, springSlow);

  useEffect(() => {
    if (isMobile) return;
    // Force cursor: none on every interactive element globally
    const style = document.createElement('style');
    style.id = 'cursor-none-override';
    style.textContent = `
      *, *:hover, a, button, [role="button"], input, textarea, select, label {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById('cursor-none-override')?.remove();
    };
  }, [isMobile]);

  const detectTarget = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
    if (!visible) setVisible(true);

    const el = e.target as HTMLElement;
    const btn = el.closest('button, a, [role="button"], [data-cursor="pointer"]');
    const txt = el.closest('input, textarea, [contenteditable]');

    if (btn) {
      setMode('pointer');
      // Show a short label from data-cursor-label attribute if available
      const lbl = (btn as HTMLElement).getAttribute('data-cursor-label') || '';
      setLabel(lbl);
    } else if (txt) {
      setMode('text');
      setLabel('');
    } else {
      setMode('default');
      setLabel('');
    }
  }, [rawX, rawY, visible]);

  useEffect(() => {
    if (isMobile) return;

    const onDown = () => {
      setClicking(true);
      setRippleVisible(false);
      setTimeout(() => { setRippleVisible(true); clickRippleKey.current++; }, 10);
    };
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', detectTarget);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', detectTarget);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [detectTarget, isMobile]);

  const isPointer = mode === 'pointer';
  const isText    = mode === 'text';
  const ringSize  = clicking ? 22 : isPointer ? 52 : 34;
  const ringColor = isPointer ? '#E0aaff' : 'rgba(224,170,255,0.45)';

  if (isMobile) return null;

  return (
    <>
      {/* ── Outer ring (slow spring) ─────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'white',
          opacity: visible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          borderWidth: isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* ── Crosshair ticks ─ */}
        {(['top','bottom','left','right'] as const).map((side) => {
          const isVert = side === 'top' || side === 'bottom';
          const base: React.CSSProperties = {
            position: 'absolute',
            background: 'white',
            ...(isVert
              ? { width: 1, height: 6, left: '50%', transform: 'translateX(-50%)' }
              : { height: 1, width: 6, top:  '50%', transform: 'translateY(-50%)' }),
            ...(side === 'top'    ? { top:    -6 } : {}),
            ...(side === 'bottom' ? { bottom: -6 } : {}),
            ...(side === 'left'   ? { left:   -6 } : {}),
            ...(side === 'right'  ? { right:  -6 } : {}),
          };
          return <div key={side} style={base} />;
        })}

        {/* ── Pointer mode: "play" triangle inside ring ─ */}
        <AnimatePresence>
          {isPointer && (
            <motion.div
              key="play"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.18 }}
            >
              <div style={{
                width: 0, height: 0,
                marginLeft: 2,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: '8px solid white',
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Inner dot / I-beam (fast spring) ────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
      >
        {isText ? (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.85, repeat: Infinity }}
            style={{ width: 2, height: 18, background: '#E0aaff', borderRadius: 1 }}
          />
        ) : (
          <motion.div
            animate={{ scale: clicking ? 0.3 : isPointer ? 0 : 1 }}
            transition={{ duration: 0.12 }}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'white',
            }}
          />
        )}
      </motion.div>

      {/* ── Click ripple ────────────────────────────────── */}
      <AnimatePresence>
        {rippleVisible && (
          <motion.div
            key={clickRippleKey.current}
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
            style={{
              x: dotX, y: dotY,
              translateX: '-50%', translateY: '-50%',
              border: '1px solid rgba(224,170,255,0.5)',
            }}
            initial={{ width: 8, height: 8, opacity: 0.9 }}
            animate={{ width: 64, height: 64, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() => setRippleVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
