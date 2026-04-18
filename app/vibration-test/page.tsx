"use client";

import React, { useEffect, useRef, useState } from "react";
import "ios-vibrator-pro-max";
import { enableMainThreadBlocking } from "ios-vibrator-pro-max";

enableMainThreadBlocking(true);

export default function IOSVibrationTestPage(){
 const [running,setRunning]=useState(false);
 const [seconds,setSeconds]=useState(0);
 const [mode,setMode]=useState<string>("1000");
 const tickRef=useRef<any>(null);
 const stopRef=useRef<any>(null);
 const pulseRef=useRef<any>(null);

 const presets=[1,2,3,5,10,30,60,120,300,600];

 const clearAll=()=>{
  clearInterval(tickRef.current); clearTimeout(stopRef.current); clearInterval(pulseRef.current);
  tickRef.current=null; stopRef.current=null; pulseRef.current=null;
  navigator.vibrate(0);
  setRunning(false);
 };

 const start=(ms:number|null)=>{
  clearAll();
  setSeconds(0); setRunning(true);
  tickRef.current=setInterval(()=>setSeconds(s=>s+1),1000);
  pulseRef.current=setInterval(()=>navigator.vibrate(800),1000);
  if(ms!==null){ stopRef.current=setTimeout(clearAll,ms); }
 };

 useEffect(()=>()=>clearAll(),[]);

 return <div style={{padding:24,fontFamily:'Arial',maxWidth:900,margin:'0 auto'}}>
  <h1>iPhone Vibration Test Lab</h1>
  <p>Route test page for delay / timeout / unlimited vibration flow.</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:12}}>
   {presets.map(s=><button key={s} onClick={()=>start(s*1000)} style={{padding:14,borderRadius:12}}>Start {s}s</button>)}
   <button onClick={()=>start(600000)} style={{padding:14,borderRadius:12}}>10 Min</button>
   <button onClick={()=>start(null)} style={{padding:14,borderRadius:12,background:'#111',color:'#fff'}}>Unlimited</button>
   <button onClick={clearAll} style={{padding:14,borderRadius:12,background:'red',color:'#fff'}}>Stop</button>
  </div>

  <div style={{marginTop:24,padding:20,border:'1px solid #ddd',borderRadius:16}}>
   <h2>Status: {running ? 'Running' : 'Stopped'}</h2>
   <p>Elapsed: {seconds}s</p>
   <p>Selected: {mode}</p>
  </div>

  <div style={{marginTop:24}}>
   <h3>Delay Flow Tests</h3>
   <button onClick={()=>{setTimeout(()=>navigator.vibrate(500),1000)}} style={{marginRight:8,padding:12}}>After 1 sec</button>
   <button onClick={()=>{setTimeout(()=>navigator.vibrate(500),5000)}} style={{marginRight:8,padding:12}}>After 5 sec</button>
   <button onClick={()=>{setTimeout(()=>navigator.vibrate(500),60000)}} style={{padding:12}}>After 1 min</button>
  </div>
 </div>
}
