"use client";

import { WebHaptics } from "web-haptics";

export default function Home() {

  function triggerDirectMatchVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 30 },
        { delay: 60, duration: 40, intensity: 1 },
        { delay: 50, duration: 40, intensity: 1 },
        { delay: 80, duration: 50, intensity: 1 },
      ])
      console.log("direct matched vibrate");
    }, 0);
  }


  function triggerFullUnmatchedVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 30, duration: 130, intensity: 0.9 },
        { delay: 50, duration: 50, intensity: 0.6 },
      ])
    }, 0);
  }


  function triggerErrorVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 0);
  }


  function triggerSeparateVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 30, duration: 130, intensity: 0.9 },
        { delay: 50, duration: 50, intensity: 0.6 },
      ])
    }, 0);
  }


  function onesec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 1000);
  }

  function twosec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 2000);
  }

  function threesec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 3000);
  }

  function foursec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 4000);
  }

  function fivesec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 5000);
  }

  function one800sec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 800);
  }



  function one99sec() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 999);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => triggerDirectMatchVibration()}>triggerDirectMatchVibration</button> <br />
      <button onClick={() => triggerFullUnmatchedVibration()}>triggerFullUnmatchedVibration</button><br />
      <button onClick={() => triggerErrorVibration()}>triggerErrorVibration</button><br />
      <button onClick={() => triggerSeparateVibration()}>triggerSeparateVibration</button><br />



      <button onClick={() => one800sec()}>Vibrate afetr 800 ms</button><br />
      <button onClick={() => one99sec()}>Vibrate afetr 999 ms</button><br />
      <button onClick={() => onesec()}>Vibrate afetr 1 sec</button><br />
      <button onClick={() => twosec()}>Vibrate after 2 sec</button><br />
      <button onClick={() => threesec()}>Vibrate after 3 sec</button><br />
      <button onClick={() => foursec()}>Vibrate after 4 sec</button><br />
      <button onClick={() => fivesec()}>Vibrate after 5 sec</button><br />

    </div>
  );
}
