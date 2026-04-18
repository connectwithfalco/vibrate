"use client";

import React, { useRef } from 'react';
import { WebHaptics } from "web-haptics";
import useHaptic from './useHaptic';

interface HapticStep {
  duration: number;
  delay?: number;
  intensity?: number;
}

export default function Home() {
  const { trigger } = useHaptic();
  
  // Using a ref to track if we have "Active Activation"
  const audioContextRef = useRef<AudioContext | null>(null);

  const manageLongDelayVibration = (pattern: HapticStep[], delay: number) => {
    // STEP 1: Immediate feedback to "claim" the user interaction
    trigger('light'); 
    
    // STEP 2: Resume AudioContext immediately (Crucial for iOS)
    if (typeof window !== 'undefined') {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      audioContextRef.current.resume();
    }

    console.log(`Scheduling vibration for ${delay}ms... Stay on the page.`);

    // STEP 3: The Delay
    const timer = setTimeout(() => {
      try {
        const haptics = new WebHaptics();
        haptics.trigger(pattern);
        console.log("Delayed vibration executed successfully!");
      } catch (e) {
        alert("Browser blocked the delayed vibration. Interaction expired.");
      }
    }, delay);

    return () => clearTimeout(timer);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-bold border-b border-zinc-800 pb-2">Haptic Bridge Fix</h1>
      
      <p className="text-xs text-zinc-400 text-center mb-4">
        Scheme: We trigger a "Heartbeat" tap immediately to try and keep the 
        hardware communication channel open for the delayed pulse.
      </p>

      <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
        {/* Working normally */}
        <button 
          className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl active:bg-zinc-800"
          onClick={() => manageLongDelayVibration([{ duration: 500 }], 500)}
        >
          0.5 Second Delay (Likely OK)
        </button>

        {/* The "Danger Zone" */}
        <button 
          className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl active:bg-blue-800"
          onClick={() => manageLongDelayVibration([{ duration: 800 }], 2000)}
        >
          2 Second Delay (Attempting Fix)
        </button>

        <button 
          className="p-4 bg-purple-900/30 border border-purple-500/50 rounded-xl active:bg-purple-800"
          onClick={() => manageLongDelayVibration([{ duration: 1000 }], 5000)}
        >
          5 Second Delay (Experimental)
        </button>
      </div>

      <div className="mt-10 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded text-[10px] text-yellow-200 uppercase tracking-widest">
        Warning: If 5s fails, your mobile OS has a hard-lock. 
        You MUST ask user for another tap at 4.5s.
      </div>
    </div>
  );
}