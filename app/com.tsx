import { useState, useRef } from "react";
import { useHaptic } from "use-haptic";

export const HapticButton = () => {
  const [isContinuous, setIsContinuous] = useState(false);
  const [duration, setDuration] = useState(5000); // run time
  const [pause, setPause] = useState(4000); // pause time
  const [interval, setIntervalValue] = useState(100);

  const { triggerHaptic } = useHaptic();
  const isRunningRef = useRef(false);

  const runHapticCycle = () => {
    if (!isRunningRef.current) return;

    const startTime = Date.now();

    const vibrate = () => {
      if (!isRunningRef.current) return;

      if (Date.now() - startTime < duration) {
        triggerHaptic();
        setTimeout(vibrate, interval);
      } else {
        // Pause after 5 sec
        setTimeout(() => {
          runHapticCycle(); // start again after pause
        }, pause);
      }
    };

    vibrate();
  };

  const handleClick = () => {
    if (isContinuous) {
      isRunningRef.current = true;
      runHapticCycle();
    } else {
      triggerHaptic();
    }
  };

  const stopHaptic = () => {
    isRunningRef.current = false;
  };

  return (
    <div className="haptic-btn-container">
      <button className="haptic-btn" onClick={handleClick} type="button">
        Start Haptic
      </button>

      <button onClick={stopHaptic}>Stop</button>

      <label>
        <input
          type="checkbox"
          checked={isContinuous}
          onChange={() => setIsContinuous((prev) => !prev)}
        />
        Continuous Haptic
      </label>

      <label>
        Duration (ms):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>

      <label>
        Pause (ms):
        <input
          type="number"
          value={pause}
          onChange={(e) => setPause(Number(e.target.value))}
        />
      </label>

      <label>
        Interval (ms):
        <input
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(Number(e.target.value))}
        />
      </label>
    </div>
  );
};