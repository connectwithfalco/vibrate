"use client";

import { useCallback } from 'react';

const useHaptic = () => {
  const trigger = useCallback((type = 'medium') => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        
        // iOS requires the context to be "resumed" or started during a user gesture
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        gainNode.gain.value = 0; 
        oscillator.frequency.value = 1;
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.01);
      } catch (e) {
        console.error("Haptic error:", e);
      }
    } else {
      // Android / Web Standard
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        const patterns = {
          light: [30],
          medium: [60],
          heavy: [100],
        };
        navigator.vibrate(patterns[type] || [60]);
      }
    }
  }, []);

  return { trigger };
};

export default useHaptic;