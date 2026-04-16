import { useState, useRef } from "react";
import { useHaptic } from "use-haptic";

export const HapticButton = () => {
  const [isContinuous, setIsContinuous] = useState(false);
  const [duration, setDuration] = useState(5000); // run time
  const [pause, setPause] = useState(5000); // pause time
  const [interval, setIntervalValue] = useState(100);

  const { triggerHaptic } = useHaptic();

  const intervalRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const runningRef = useRef(false);

  const startCycle = () => {
    if (!runningRef.current) return;

    // 🔁 Start vibration interval
    intervalRef.current = setInterval(() => {
      triggerHaptic();
    }, interval);

    // ⏱ Stop after duration (5 sec)
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current); // 🛑 stop vibration

      // ⏳ Pause (5 sec), then restart
      timeoutRef.current = setTimeout(() => {
        startCycle(); // 🔁 next cycle
      }, pause);
    }, duration);
  };

  const handleClick = () => {
    if (isContinuous) {
      runningRef.current = true;
      startCycle();
    } else {
      triggerHaptic();
    }
  };

  const stopHaptic = () => {
    runningRef.current = false;
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div>
      <button onClick={handleClick}>Start</button>
      <button onClick={stopHaptic}>Stop</button>

      <label>
        <input
          type="checkbox"
          checked={isContinuous}
          onChange={() => setIsContinuous((prev) => !prev)}
        />
        Continuous
      </label>

      <div>
        Duration:
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <div>
        Pause:
        <input
          type="number"
          value={pause}
          onChange={(e) => setPause(Number(e.target.value))}
        />
      </div>

      <div>
        Interval:
        <input
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
};