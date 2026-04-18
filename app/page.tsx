"use client";

import { WebHaptics } from "web-haptics";
import { HapticButton } from "./com";
import useHaptic from "./useHaptic";

export default function Home() {
  // ── Untouched — working fine ───────────────────────────────────────────────

  function triggerDirectMatchVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
        { delay: 200, duration: 760, intensity: 1 },
      ]);
      console.log("direct matched vibrate");
    }, 0);
    return () => clearTimeout(timer);
  }

  function triggerFullUnmatchedVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 30, duration: 130, intensity: 0.9 },
        { delay: 50, duration: 50, intensity: 0.6 },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }

  function triggerErrorVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([{ duration: 7000 }], { intensity: 1 });
    }, 0);
    return () => clearTimeout(timer);
  }

  function triggerSeparateVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 30, duration: 130, intensity: 0.9 },
        { delay: 50, duration: 50, intensity: 0.6 },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }

  // ── Delayed functions — FIXED ──────────────────────────────────────────────
  // KEY FIX: Use `delay` on the FIRST step (true silence/pause)
  // NOT intensity:0 (that still physically vibrates)
  // WebHaptics is created INSTANTLY on tap → gesture window stays alive
  // delay: Xms on first step = true zero vibration for X milliseconds

  function one800sec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 800, duration: 800, intensity: 1 }, // truly silent 800ms → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 800ms passed — HIGH intensity vibration started");
    }, 800);
  }

  function one900sec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 900, duration: 800, intensity: 1 }, // truly silent 900ms → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 900ms passed — HIGH intensity vibration started");
    }, 900);
  }

  function one99sec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 999, duration: 800, intensity: 1 }, // truly silent 999ms → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 999ms passed — HIGH intensity vibration started");
    }, 999);
  }

  function onesec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 1000, duration: 800, intensity: 1 }, // truly silent 1s → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 1 second passed — HIGH intensity vibration started");
    }, 1000);
  }

  function twosec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 2000, duration: 800, intensity: 1 }, // truly silent 2s → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 2 seconds passed — HIGH intensity vibration started");
    }, 2000);
  }

  function threesec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 3000, duration: 800, intensity: 1 }, // truly silent 3s → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 3 seconds passed — HIGH intensity vibration started");
    }, 3000);
  }

  function foursec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 4000, duration: 800, intensity: 1 }, // truly silent 4s → then BUZZ
    ]);
    setTimeout(() => {
      console.log("✅ 4 seconds passed — HIGH intensity vibration started");
    }, 4000);
  }

  function fivesec() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { delay: 5000, duration: 760, intensity: 1 }, // truly silent 5s → then 7 BUZZES
      { delay: 200, duration: 760, intensity: 1 },
      { delay: 200, duration: 760, intensity: 1 },
      { delay: 200, duration: 760, intensity: 1 },
      { delay: 200, duration: 760, intensity: 1 },
      { delay: 200, duration: 760, intensity: 1 },
      { delay: 200, duration: 760, intensity: 1 },
    ]);
    setTimeout(() => {
      console.log(
        "✅ 5 seconds passed — HIGH intensity vibration started (7 buzzes ~10sec)",
      );
    }, 5000);
  }

  const { trigger } = useHaptic();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => trigger("medium")}>Tap me</button>

      <br />
      <br />
      <br />

      <button onClick={() => triggerDirectMatchVibration()}>
        triggerDirectMatchVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => triggerFullUnmatchedVibration()}>
        triggerFullUnmatchedVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => triggerErrorVibration()}>
        triggerErrorVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => triggerSeparateVibration()}>
        triggerSeparateVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={() => one800sec()}>Vibrate after 800 ms</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => one900sec()}>Vibrate after 900 ms</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => one99sec()}>Vibrate after 999 ms</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => onesec()}>Vibrate after 1 sec</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => twosec()}>Vibrate after 2 sec</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => threesec()}>Vibrate after 3 sec</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => foursec()}>Vibrate after 4 sec</button>
      <span style={{ color: "green" }}> working</span>
      <br />
      <button onClick={() => fivesec()}>Vibrate after 5 sec</button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <HapticButton />
    </div>
  );
}
