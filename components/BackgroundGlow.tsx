import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Primary Top Glow - The "Source" (Blue/White) */}
      <div className="absolute -top-[15%] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px] mix-blend-screen" />
      
      {/* 2. Top Right Drifting Cloud (Indigo) */}
      <div className="absolute top-[10%] right-[-10%] h-[600px] w-[600px] animate-blob rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen opacity-60" />
      
      {/* 3. Bottom Left Drifting Cloud (Violet/Purple) */}
      <div className="absolute bottom-[10%] left-[-10%] h-[700px] w-[700px] animate-blob animation-delay-2000 rounded-full bg-violet-600/5 blur-[120px] mix-blend-screen opacity-40" />
      
      {/* 4. Ambient Center Haze */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-blue-400/5 blur-[150px] mix-blend-screen" />

      {/* 5. Deep Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90" />
    </div>
  );
};