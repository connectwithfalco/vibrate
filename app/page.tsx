"use client";

import React from 'react';
import { WebHaptics } from "web-haptics";
import useHaptic from './useHaptic';

// Define the shape of the haptic steps
interface HapticStep {
  duration: number;
  delay?: number;
  intensity?: number;
}

// Simple HapticButton mock if you don't have the file
const HapticButton = () => <button className="p-2 border rounded">Haptic Button Component</button>;

export default function Home() {
  const { trigger } = useHaptic();

  /**
   * FIX: Properly typed 'pattern' as HapticStep[]
   */
  const playVibration = (pattern: HapticStep[], delay: number = 0) => {
    const timer = setTimeout(() => {
      try {
        // Ensure this only runs in the browser
        if (typeof window !== "undefined") {
          const haptics = new WebHaptics();
          haptics.trigger(pattern);
          console.log(`Vibration triggered after ${delay}ms`);
        }
      } catch (error) {
        console.warn("Vibration blocked: Browser security requires user activation < 1000ms.");
      }
    }, delay);
    
    return () => clearTimeout(timer);
  };

  // Pre-defined patterns with explicit typing
  const directMatchPattern: HapticStep[] = [
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
    { delay: 200, duration: 760, intensity: 1 },
  ];

  const unmatchedPattern: HapticStep[] = [
    { duration: 40, intensity: 0.7 },
    { delay: 40, duration: 40, intensity: 0.7 },
    { delay: 30, duration: 130, intensity: 0.9 },
    { delay: 50, duration: 50, intensity: 0.6 },
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-10 text-sm text-zinc-900 dark:text-zinc-100">
      <h1 className="font-bold text-xl mb-4">Haptic TSX Tester</h1>

      <button 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg active:scale-95 transition-transform"
        onClick={() => trigger('medium')}
      >
        Immediate Tap
      </button>

      <div className="flex flex-col gap-2 w-full max-w-sm mt-6">
        <button onClick={() => playVibration(directMatchPattern, 0)} className="text-left border p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Direct Match <span className="text-green-500 float-right">Working</span>
        </button>
        
        <button onClick={() => playVibration(unmatchedPattern, 0)} className="text-left border p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Full Unmatched <span className="text-green-500 float-right">Working</span>
        </button>

        <button onClick={() => playVibration([{ duration: 7000 }], 0)} className="text-left border p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Error Pulse (7s) <span className="text-green-500 float-right">Working</span>
        </button>

        <div className="h-px bg-zinc-300 dark:bg-zinc-700 my-4" />

        <button onClick={() => playVibration([{ duration: 800 }], 800)} className="text-left border p-3 rounded opacity-80">
          Delay 800ms <span className="text-green-500 float-right">Working</span>
        </button>

        <button onClick={() => playVibration([{ duration: 800 }], 999)} className="text-left border p-3 rounded opacity-80">
          Delay 999ms <span className="text-orange-500 float-right">Unstable</span>
        </button>

        <button onClick={() => playVibration([{ duration: 800 }], 2000)} className="text-left border p-3 rounded opacity-50">
          Delay 2s <span className="text-red-500 float-right">Blocked</span>
        </button>
      </div>

      <div className="mt-8">
        <HapticButton />
      </div>

      <footer className="mt-auto text-center text-zinc-500 text-xs max-w-xs">
        Browser Security: If a vibration is scheduled for {'>'} 1000ms after a click, 
        the browser cancels the "User Activation" and blocks hardware access.
      </footer>
    </div>
  );
}