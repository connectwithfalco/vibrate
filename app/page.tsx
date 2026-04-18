"use client";

import { WebHaptics } from "web-haptics";
import { HapticButton } from "./com";
import useHaptic from './useHaptic';

export default function Home() {

  const { trigger, triggerSequence } = useHaptic();

  function triggerDirectMatchVibration() {
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
  }

  function triggerFullUnmatchedVibration() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { duration: 40, intensity: 0.7 },
      { delay: 40, duration: 40, intensity: 0.7 },
      { delay: 30, duration: 130, intensity: 0.9 },
      { delay: 50, duration: 50, intensity: 0.6 },
    ]);
  }

  function triggerErrorVibration() {
    const haptics = new WebHaptics();
    haptics.trigger([{ duration: 7000 }], { intensity: 1 });
  }

  function triggerSeparateVibration() {
    const haptics = new WebHaptics();
    haptics.trigger([
      { duration: 40, intensity: 0.7 },
      { delay: 40, duration: 40, intensity: 0.7 },
      { delay: 30, duration: 130, intensity: 0.9 },
      { delay: 50, duration: 50, intensity: 0.6 },
    ]);
  }

  // All delayed — pattern [1, delayMs, buzz] called synchronously on tap
  function one800ms()  { trigger('heavy', 800);  }
  function one900ms()  { trigger('heavy', 900);  }
  function one999ms()  { trigger('heavy', 999);  }
  function onesec()    { trigger('heavy', 1000); }
  function twosec()    { trigger('heavy', 2000); }
  function threesec()  { trigger('heavy', 3000); }
  function foursec()   { trigger('heavy', 4000); }

  function fivesec() {
    triggerSequence([
      { duration: 760, gap: 200 },
      { duration: 760, gap: 200 },
      { duration: 760, gap: 200 },
      { duration: 760, gap: 200 },
      { duration: 760, gap: 200 },
      { duration: 760, gap: 200 },
      { duration: 760 },
    ], 5000);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <button onClick={() => trigger('medium')}>
        Tap me
      </button>

      <br /><br /><br />

      <button onClick={triggerDirectMatchVibration}>triggerDirectMatchVibration</button>
      <span style={{ color: "green" }}> working</span><br />

      <button onClick={triggerFullUnmatchedVibration}>triggerFullUnmatchedVibration</button>
      <span style={{ color: "green" }}> working</span><br />

      <button onClick={triggerErrorVibration}>triggerErrorVibration</button>
      <span style={{ color: "green" }}> working</span><br />

      <button onClick={triggerSeparateVibration}>triggerSeparateVibration</button>
      <span style={{ color: "green" }}> working</span><br />

      <br />

      <button onClick={one800ms}>Vibrate after 800ms</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={one900ms}>Vibrate after 900ms</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={one999ms}>Vibrate after 999ms</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={onesec}>Vibrate after 1 sec</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={twosec}>Vibrate after 2 sec</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={threesec}>Vibrate after 3 sec</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={foursec}>Vibrate after 4 sec</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <button onClick={fivesec}>Vibrate after 5 sec (7 buzzes)</button>
      <span style={{ color: "green" }}> ✓ fixed</span><br />

      <HapticButton />

    </div>
  );
}