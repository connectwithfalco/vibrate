"use client";

import { WebHaptics } from "web-haptics";
import HapticPage from "./com";

export default function Home() {

  function triggerDirectMatchVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 30 },
        { delay: 60, duration: 40, intensity: 1 },
        { delay: 50, duration: 40, intensity: 1 },
        { delay: 80, duration: 50, intensity: 1 },
      ])
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
      ])
    }, 0);
    return () => clearTimeout(timer);
  }


  function triggerErrorVibration() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 7000 }],
        { intensity: 1 }
      );
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
      ])
    }, 0);
    return () => clearTimeout(timer);
  }


  function onesec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 1000);
    return () => clearTimeout(timer);
  }

  function twosec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 2000);
    return () => clearTimeout(timer);
  }

  function threesec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 3000);
    return () => clearTimeout(timer);
  }

  function foursec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 4000);
    return () => clearTimeout(timer);
  }

  function one800sec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 800);
    return () => clearTimeout(timer);
  }



  function one99sec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 999);
    return () => clearTimeout(timer);
  }


  function one900sec() {
    const timer = setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 900);
    return () => clearTimeout(timer);
  }



  function fivesec() {
    console.log('1111');
    
    const haptics = new WebHaptics();
    haptics.trigger(
      [
        { duration: 6000, intensity: 0 },
      ]
    );
    const timer = setTimeout(() => {
      haptics.trigger(
        [
           { duration: 6000, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
          { delay: 40, duration: 760, intensity: 1 },
           { duration: 6000, intensity: 1 },
        ]
      );

    }, 5000);
    return () => clearTimeout(timer);
  }



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => fivesec()}>Vibrate after 5 sec</button><br /><br />

      <button onClick={() => triggerDirectMatchVibration()}>triggerDirectMatchVibration</button> <br />
      <button onClick={() => triggerFullUnmatchedVibration()}>triggerFullUnmatchedVibration</button><br />
      <button onClick={() => triggerErrorVibration()}>triggerErrorVibration</button><br />
      <button onClick={() => triggerSeparateVibration()}>triggerSeparateVibration</button><br />



      <button onClick={() => one800sec()}>Vibrate afetr 800 ms</button> <span style={{ color: "green" }}> working</span>  <br />
      <button onClick={() => one900sec()}>Vibrate afetr 900 ms</button> <span style={{ color: "green" }}> working</span><br />
      <button onClick={() => one99sec()}>Vibrate afetr 999 ms</button><br />
      <button onClick={() => onesec()}>Vibrate afetr 1 sec</button><br />
      <button onClick={() => twosec()}>Vibrate after 2 sec</button><br />
      <button onClick={() => threesec()}>Vibrate after 3 sec</button><br />
      <button onClick={() => foursec()}>Vibrate after 4 sec</button><br />
      <button onClick={() => fivesec()}>Vibrate after 5 sec</button><br />


      <HapticPage />
    </div>
  );
}
