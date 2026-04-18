"use client";

import { WebHaptics } from "web-haptics";
import { HapticButton } from "./com";
import useHaptic from "./useHaptic";

export default function Home() {
  const { trigger } = useHaptic();

  function triggerDirectMatchVibration() {
    navigator.vibrate([
      200, 760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
    ]);
    console.log("direct matched vibrate");
  }

  function triggerFullUnmatchedVibration() {
    navigator.vibrate([
      40, 40,
      40, 30,
      130, 50,
      50,
    ]);
  }

  function triggerErrorVibration() {
    navigator.vibrate([7000]);
  }

  function triggerSeparateVibration() {
    navigator.vibrate([
      40, 40,
      40, 30,
      130, 50,
      50,
    ]);
  }

  function one800sec() {
    navigator.vibrate([800, 800]);
  }

  function one900sec() {
    navigator.vibrate([900, 800]);
  }

  function one99sec() {
    navigator.vibrate([999, 800]);
  }

  function onesec() {
    navigator.vibrate([1000, 800]);
  }

  function twosec() {
    navigator.vibrate([2000, 800]);
  }

  function threesec() {
    navigator.vibrate([3000, 800]);
  }

  function foursec() {
    navigator.vibrate([4000, 800]);
  }

  function fivesec() {
    navigator.vibrate([
      5000,
      760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
      200, 760,
    ]);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => trigger("medium")}>
        Tap me
      </button>

      <br />
      <br />
      <br />

      <button onClick={triggerDirectMatchVibration}>
        triggerDirectMatchVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={triggerFullUnmatchedVibration}>
        triggerFullUnmatchedVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={triggerErrorVibration}>
        triggerErrorVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={triggerSeparateVibration}>
        triggerSeparateVibration
      </button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={one800sec}>Vibrate after 800 ms</button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={one900sec}>Vibrate after 900 ms</button>
      <span style={{ color: "green" }}> working</span>
      <br />

      <button onClick={one99sec}>Vibrate after 999 ms</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <button onClick={onesec}>Vibrate after 1 sec</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <button onClick={twosec}>Vibrate after 2 sec</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <button onClick={threesec}>Vibrate after 3 sec</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <button onClick={foursec}>Vibrate after 4 sec</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <button onClick={fivesec}>Vibrate after 5 sec</button>
      <span style={{ color: "green" }}> fixed</span>
      <br />

      <HapticButton />
    </div>
  );
}