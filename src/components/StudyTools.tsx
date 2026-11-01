"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function StudyTools(){
 const [seconds,setSeconds]=useState(25*60),[running,setRunning]=useState(false);
 useEffect(()=>{if(!running)return;const id=setInterval(()=>setSeconds(n=>{if(n<=1){setRunning(false);return 0;}return n-1;}),1000);return()=>clearInterval(id);},[running]);
 return <div className="study-strip"><div><span className="eyebrow">One thing at a time</span><h3>Make room for a focused session.</h3></div><output aria-label="Focus timer" className="timer">{Math.floor(seconds/60).toString().padStart(2,"0")}:{(seconds%60).toString().padStart(2,"0")}</output><button className="btn" onClick={()=>setRunning(!running)} disabled={seconds===0}>{running?"Pause":"Focus"}</button><button className="btn ghost" onClick={()=>{setRunning(false);setSeconds(1500);}}>Reset</button><Link className="btn" href="/coverage">Syllabus map ↗</Link></div>;
}
