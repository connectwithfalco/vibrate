import { useState, useRef, useEffect } from "react";
import { useHaptic } from "use-haptic";

export const HapticButton = () => {
  const [isContinuous, setIsContinuous] = useState(false);

  // ON time (ms)
  const [duration, setDuration] = useState(5000);

  // OFF time (ms) -> aap ne bola 5 sec pause
  const [pause, setPause] = useState(5000);

  // haptic trigger interval during ON (ms)
  const [interval, setIntervalValue] = useState(100);

  const { triggerHaptic } = useHaptic();

  const runningRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearAll = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const stopHaptic = () => {
    runningRef.current = false;
    clearAll();
  };

  const startCycle = () => {
    if (!runningRef.current) return;

    // ON phase: keep triggering every `interval`
    triggerHaptic();
    intervalRef.current = window.setInterval(() => {
      if (!runningRef.current) return;
      triggerHaptic();
    }, interval);

    // After `duration`, stop ON-phase and start OFF-phase (pause)
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (!runningRef.current) return;

      // OFF phase: wait `pause`, then restart ON phase
      timeoutRef.current = window.setTimeout(() => {
        startCycle();
      }, pause);
    }, duration);
  };

  const handleStart = () => {
    if (!isContinuous) {
      triggerHaptic();
      return;
    }

    // prevent multiple starts
    if (runningRef.current) return;

    runningRef.current = true;
    clearAll();
    startCycle();
  };

  useEffect(() => {
    // cleanup on unmount
    return () => stopHaptic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={stopHaptic}>Stop</button>

      <label style={{ display: "block", marginTop: 12 }}>
        <input
          type="checkbox"
          checked={isContinuous}
          onChange={() => setIsContinuous((prev) => !prev)}
        />
        Continuous (5s ON → 5s OFF → repeat)
      </label>

      <div style={{ marginTop: 12 }}>
        Duration (ms):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <div>
        Pause (ms):
        <input
          type="number"
          value={pause}
          onChange={(e) => setPause(Number(e.target.value))}
        />
      </div>

      <div>
        Interval (ms):
        <input
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
};


