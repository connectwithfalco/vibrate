import { useState, useRef } from "react";
import { useHaptic } from "use-haptic";

export const HapticButton = () => {
    const [isContinuous, setIsContinuous] = useState(false);
    const [duration, setDuration] = useState(5000); // 5 sec run
    const [pause, setPause] = useState(4000); // 4 sec pause
    const [interval, setIntervalValue] = useState(100);

    const { triggerHaptic } = useHaptic();
    const runningRef: any = useRef(false);
    const timeoutRef: any = useRef(null);

    const startCycle = () => {
        if (!runningRef.current) return;

        let elapsed = 0;

        const run = () => {
            if (!runningRef.current) return;

            if (elapsed < duration) {
                triggerHaptic();
                elapsed += interval;

                timeoutRef.current = setTimeout(run, interval);
            } else {
                // ✅ After 5 sec complete → pause → restart fresh 5 sec
                timeoutRef.current = setTimeout(() => {
                    startCycle(); // 🔁 new fresh cycle (again 5 sec)
                }, pause);
            }
        };

        run();
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