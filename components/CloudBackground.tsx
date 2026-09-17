import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const CloudBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax transforms for different cloud layers
    // Moving horizontally as we scroll down - Increased range for "moving from left to right" effect
    const x1 = useTransform(scrollY, [0, 1000], [0, 250]);
    const x2 = useTransform(scrollY, [0, 1000], [0, -300]);
    const x3 = useTransform(scrollY, [0, 1000], [0, 200]);
    const x4 = useTransform(scrollY, [0, 1000], [0, -250]);
    const x5 = useTransform(scrollY, [0, 1000], [0, 150]);
    const x6 = useTransform(scrollY, [0, 1000], [0, -180]);

    // Cloud scroll behavior: Fades out after scrolling past the main section
    const opacityCloud = useTransform(scrollY, [1000, 1500], [0.7, 0]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#F0F8FF]">
            {/* Base Sky Gradient - "Award Winning" Sky Blue */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#bae6fd_0%,_#e0f2fe_40%,_#f0f9ff_70%,_#ffffff_100%)]" />

            {/* Subtle Atmosphere Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.8)_0%,_transparent_60%)]" />

            {/* Liquid Mesh Gradients - Cohesive Sky Tones */}
            {/* --- 3D CUTE CLOUD CHARACTER (CSS) --- */}
            <motion.div
                style={{ opacity: opacityCloud }} // Fades out after scrolling past Hero/Product
                animate={{
                    y: [0, -30, 0], // Increased floating range
                    rotate: [-12, -9, -15, -12] // Tilted MORE (-12deg) and bobbing
                }}
                transition={{
                    duration: 4, // Faster for more visibility
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[15%] left-[5%] z-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
                {/* Container with Drop Shadow for the WHOLE shape */}
                <div className="relative w-96 h-72 filter drop-shadow-2xl">
                    {/* Unified Cloud Body - SVG for Perfect Silhouette */}
                    <svg
                        viewBox="0 0 400 300"
                        className="w-full h-full overflow-visible"
                    >
                        <defs>
                            <radialGradient id="cloudGradient" cx="40%" cy="30%" r="70%" fx="40%" fy="30%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="60%" stopColor="#f8fafc" />
                                <stop offset="100%" stopColor="#e2e8f0" />
                            </radialGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Fluffy, Multi-Lobed "Beautiful" Cloud Path - Fluffy Bottom too! */}
                        <path
                            d="M 60,220
                               C 30,200 20,160 50,130
                               C 40,90 70,60 110,60
                               C 130,30 180,20 220,40
                               C 260,20 320,40 340,90
                               C 380,110 390,160 360,200
                               C 350,230 320,250 290,240
                               C 260,260 220,260 190,240
                               C 160,260 120,250 90,230
                               C 80,230 70,225 60,220 Z"
                            fill="url(#cloudGradient)"
                        />
                    </svg>

                    {/* Face Container - Centered on the Main Bulk */}
                    <div className="absolute top-[50%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                        {/* Eyes - Glossy & Cute */}
                        <div className="flex gap-12 mb-3">
                            <div className="w-8 h-9 bg-slate-900 rounded-full relative shadow-md overflow-hidden">
                                <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-white rounded-full opacity-90" />
                                <div className="absolute bottom-2 left-2.5 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
                            </div>
                            <div className="w-8 h-9 bg-slate-900 rounded-full relative shadow-md overflow-hidden">
                                <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-white rounded-full opacity-90" />
                                <div className="absolute bottom-2 left-2.5 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
                            </div>
                        </div>

                        {/* Cheeks */}
                        <div className="absolute top-9 -left-6 w-10 h-5 bg-rose-300 blur-md rounded-full opacity-50" />
                        <div className="absolute top-9 -right-6 w-10 h-5 bg-rose-300 blur-md rounded-full opacity-50" />

                        {/* Mouth - Gentle Smile */}
                        <svg width="36" height="18" viewBox="0 0 36 18" className="mt-1 opacity-80">
                            <path d="M4 4 Q18 20 32 4" fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </motion.div>

            {/* Orb 1: Deep Sky Blue (Top Left) */}
            <motion.div
                style={{ x: x1 }}
                className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vh] bg-blue-300/30 blur-[100px] rounded-full mix-blend-multiply"
            />

            {/* Orb 2: Soft Cyan (Bottom Right) */}
            <motion.div
                style={{ x: x2 }}
                className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vh] bg-cyan-200/30 blur-[90px] rounded-full mix-blend-multiply"
            />

            {/* Orb 3: Airy White (Center/Top) */}
            <motion.div
                style={{ x: x3 }}
                className="absolute top-[10%] left-[20%] w-[50vw] h-[50vh] bg-white/60 blur-[80px] rounded-full mix-blend-overlay"
            />

            {/* --- SIDE-FRAMING PARALLAX CLOUDS --- */}

            {/* Cloud 1: Top Right - Pushed further out */}
            <motion.div
                style={{ x: x4 }}
                className="absolute top-[5%] right-[-25%] w-[50vw] h-[35vh] bg-white/90 blur-[40px] rounded-full mix-blend-normal"
            />

            {/* Cloud 2: Bottom Left - Pushed further out */}
            <motion.div
                style={{ x: x1 }}
                className="absolute bottom-[15%] left-[-25%] w-[55vw] h-[40vh] bg-white/85 blur-[45px] rounded-full mix-blend-normal"
            />

            {/* Cloud 3: Top Left - Subtle side accent */}
            <motion.div
                style={{ x: x3 }}
                className="absolute top-[20%] left-[-15%] w-[35vw] h-[25vh] bg-white/80 blur-[35px] rounded-full mix-blend-overlay"
            />

            {/* Cloud 4: Bottom Center - Floating Up */}
            <motion.div
                style={{ x: x5 }}
                className="absolute bottom-[-5%] left-[30%] w-[40vw] h-[30vh] bg-white/70 blur-[50px] rounded-full mix-blend-soft-light"
            />

            {/* Cloud 5: Top Center - High Altitude */}
            <motion.div
                style={{ x: x6 }}
                className="absolute top-[-15%] right-[30%] w-[45vw] h-[35vh] bg-white/60 blur-[60px] rounded-full mix-blend-overlay"
            />

            {/* Cloud 6: Mid Right - Dense */}
            <motion.div
                style={{ x: x2 }}
                className="absolute top-[40%] right-[-10%] w-[25vw] h-[40vh] bg-white/50 blur-[40px] rounded-full mix-blend-soft-light"
            />

            {/* Cloud 7: Mid Left - Whispy */}
            <motion.div
                style={{ x: x1 }}
                className="absolute top-[60%] left-[-5%] w-[30vw] h-[20vh] bg-white/40 blur-[30px] rounded-full mix-blend-overlay"
            />

            {/* Noise Texture for "Premium" feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

            {/* Glass Overlay - Reduced opacity to show clouds */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
        </div>
    );
};
