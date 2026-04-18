"use client";

import { WebHaptics } from "web-haptics";
import { HapticButton } from "./com";
import useHaptic from "./useHaptic";
import vibrationPattern from "./pwa-vibration-api";

export default function Home() {
  // ── These 4 untouched — work fine ─────────────────────────────────────────

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

  // ── Delayed functions — navigator.vibrate() inside setTimeout ─────────────
  // navigator.vibrate has ZERO gesture restriction — works at ANY delay
  // WebHaptics is NOT used here because it always fires immediately on call

  function one800sec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 800ms passed — vibration started");
    }, 800);
  }

  function one900sec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 900ms passed — vibration started");
    }, 900);
  }

  function one99sec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 999ms passed — vibration started");
    }, 999);
  }

  function onesec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 1 second passed — vibration started");
    }, 1000);
  }

  function twosec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 2 seconds passed — vibration started");
    }, 2000);
  }

  function threesec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 3 seconds passed — vibration started");
    }, 3000);
  }

  function foursec() {
    setTimeout(() => {
      navigator.vibrate([800]);
      console.log("✅ 4 seconds passed — vibration started");
    }, 4000);
  }

  function fivesec() {
    // 7 buzzes after 5 seconds = flat pattern passed to navigator.vibrate
    // [buzz, pause, buzz, pause ...] all in one call
    setTimeout(() => {
      navigator.vibrate([
        760, 200, 760, 200, 760, 200, 760, 200, 760, 200, 760, 200, 760,
      ]);
      console.log("✅ 5 seconds passed — HIGH intensity 7 buzzes started");
    }, 5000);
  }

  const { trigger } = useHaptic();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => vibrationPattern(2)}>PWA PROJECT CODE</button>


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


      {/* <HapticButton /> */}
    </div>
  );
}
