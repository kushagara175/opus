import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, ScanLine, ArrowDownToLine, UploadCloud, Wand2 } from 'lucide-react';

const Step1Visual: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Subtle parallax for background texture
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className="relative h-64 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden group">
            {/* Parallax Background */}
            <motion.div
                style={{ y: bgY }}
                className="absolute -top-[25%] -bottom-[25%] left-0 right-0 z-0 pointer-events-none"
            >
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08]" />
                {/* Soft Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
            </motion.div>

            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105"
            >
                <div className="relative">
                    <FileText className="h-10 w-10 text-slate-400" />
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                </div>
                <div className="space-y-2 w-24">
                    <div className="h-2 w-full bg-slate-200 rounded-full" />
                    <div className="h-2 w-2/3 bg-slate-200 rounded-full" />
                </div>
            </motion.div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-blue-500/40 group-hover:blur-[80px]" />
        </div>
    );
};

const Step2Visual: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Subtle parallax for grid
    const gridY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

    return (
        <div ref={ref} className="relative h-64 w-full rounded-xl border border-slate-200 bg-slate-50 p-6 overflow-hidden group">
            <motion.div
                style={{ y: gridY }}
                className="absolute -top-[25%] -bottom-[25%] left-0 right-0 bg-grid-slate-200/[0.5] bg-[length:24px_24px] pointer-events-none"
            />

            {/* Browser Window Controls */}
            <div className="absolute top-3 left-3 flex gap-1.5 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-purple-500/30 group-hover:blur-[100px]" />

            <div className="relative z-10 space-y-4 opacity-80">
                <div className="flex gap-4">
                    <div className="h-24 w-1/3 bg-white rounded-lg border border-slate-200 shadow-sm" />
                    <div className="flex-1 space-y-3 pt-2">
                        <div className="h-2 w-3/4 bg-slate-300 rounded" />
                        <div className="h-2 w-1/2 bg-slate-300 rounded" />
                        <div className="h-2 w-full bg-slate-300 rounded" />
                    </div>
                </div>
                <div className="h-24 w-full bg-white/50 rounded-lg border border-slate-200 p-3 grid grid-cols-3 gap-3">
                    <div className="col-span-3 h-2 w-1/4 bg-slate-300/50 rounded mb-2" />
                    <div className="h-8 bg-slate-200/50 rounded" />
                    <div className="h-8 bg-slate-200/50 rounded" />
                    <div className="h-8 bg-slate-200/50 rounded" />
                </div>
            </div>

            {/* Scanning Beam */}
            <motion.div
                initial={{ top: "-20%" }}
                animate={{ top: "120%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1)] z-20"
            >
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-500/10 to-transparent" />
            </motion.div>
        </div>
    );
};

const Step3Visual: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax movement for texture inside card
    const textureY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <div ref={ref} className="relative h-64 w-full flex items-center justify-center group">
            <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-[3/4] h-48 bg-white border border-slate-200 rounded-lg shadow-2xl flex flex-col overflow-hidden transition-colors group-hover:border-emerald-500/30 z-10"
            >
                {/* Cover Art with Parallax Texture */}
                <div className="h-2/5 bg-gradient-to-br from-emerald-100 to-slate-100 relative overflow-hidden">
                    <motion.div
                        style={{ y: textureY }}
                        className="absolute -top-[30%] -bottom-[30%] left-0 right-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="h-1.5 w-1/3 bg-emerald-400/80 rounded mb-1" />
                        <div className="h-3 w-3/4 bg-white/90 rounded" />
                    </div>
                </div>

                {/* Body */}
                <div className="p-3 space-y-2 bg-white relative z-10">
                    <div className="flex gap-2 mb-2">
                        <div className="h-1.5 w-12 bg-slate-200 rounded-full" />
                        <div className="h-1.5 w-8 bg-slate-300 rounded-full" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-1 w-full bg-slate-100 rounded" />
                        <div className="h-1 w-full bg-slate-100 rounded" />
                        <div className="h-1 w-5/6 bg-slate-100 rounded" />
                    </div>
                </div>

                {/* Download Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/20 transform translate-y-2 group-hover:translate-y-0 transition-all">
                        <ArrowDownToLine className="h-3 w-3" />
                        Download
                    </button>
                </div>
            </motion.div>

            {/* Decoration */}
            <div className="absolute right-10 bottom-10 h-16 w-16 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none transition-all duration-500 group-hover:scale-[2] group-hover:bg-emerald-500/20 group-hover:blur-[50px]" />
        </div>
    );
};

const steps = [
    {
        id: 1,
        title: "Drop messy files",
        description: "Drag and drop your raw .docx, .txt, or markdown files. No formatting needed. We handle the chaos.",
        icon: <UploadCloud className="h-6 w-6 text-blue-400" />,
        VisualComponent: Step1Visual,
        color: "bg-blue-500",
        borderColor: "border-blue-500/30",
        shadow: "shadow-blue-500/20"
    },
    {
        id: 2,
        title: "AI Semantic Analysis",
        description: "Our engine reads your content like a human, identifying quotes, data tables, and headers to structure them perfectly.",
        icon: <ScanLine className="h-6 w-6 text-purple-400" />,
        VisualComponent: Step2Visual,
        color: "bg-purple-500",
        borderColor: "border-purple-500/30",
        shadow: "shadow-purple-500/20"
    },
    {
        id: 3,
        title: "Instant Editorial PDF",
        description: "Download a professionally designed, branded PDF ready for distribution, print, or client presentation.",
        icon: <Wand2 className="h-6 w-6 text-emerald-400" />,
        VisualComponent: Step3Visual,
        color: "bg-emerald-500",
        borderColor: "border-emerald-500/30",
        shadow: "shadow-emerald-500/20"
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <section className="relative w-full">
            {/* Timeline Connector Line (Desktop Only) */}
            <div className="absolute left-1/2 top-24 bottom-20 w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="text-center mb-32 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.1 },
                        y: { duration: 0.6, delay: 0.1 },
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-blue-800 to-slate-900 drop-shadow-sm filter pb-4 leading-tight"
                >
                    From chaos to clarity in 3 steps
                </motion.h2>
            </div>

            <div className="space-y-40">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                        }}
                        // Increased gap to md:gap-32 to separate text/bullets/visuals better
                        className={`relative flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-32 lg:gap-40 will-change-transform`}
                    >
                        {/* Center Node (Desktop) */}
                        <motion.div
                            variants={{
                                hidden: { scale: 0, opacity: 0 },
                                visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "backOut" } }
                            }}
                            // Explicit positioning logic with fixed values:
                            // left-1/2 puts the LEFT edge at the center.
                            // Even Index (Text Left) -> Bullet on RIGHT of line. 'translate-x-6' shifts it 24px right from center line.
                            // Odd Index (Visual Left) -> Bullet on LEFT of line. '-translate-x-14' (56px) shifts it left.
                            // (Width 32px + Gap 24px = 56px shift needed to clear the line by 24px from right edge)
                            className={`absolute left-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border ${step.borderColor} shadow-sm hover:${step.shadow} z-20 transition-shadow duration-500 ${index % 2 === 1 ? '-translate-x-14' : 'translate-x-6'}`}
                        >
                            <div className={`w-2.5 h-2.5 rounded-full ${step.color}`} />
                        </motion.div>

                        {/* Text Side */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: index % 2 === 1 ? 50 : -50, y: 20 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
                                }
                            }}
                            className={`flex-1 flex flex-col gap-6 z-10 text-center ${index % 2 === 1 ? 'md:text-left md:items-start' : 'md:text-right md:items-end'}`}
                        >
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-md backdrop-blur-md">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">{step.title}</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-light">{step.description}</p>
                            </div>
                        </motion.div>

                        {/* Visual Side */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, scale: 0.9, y: 40 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }
                                }
                            }}
                            className="flex-1 w-full max-w-lg"
                        >
                            <div className="group relative rounded-2xl border border-slate-200 bg-white/50 p-2 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-slate-300 hover:bg-white/80">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
                                <div className="rounded-xl overflow-hidden bg-slate-50 p-6 md:p-8 relative">
                                    <step.VisualComponent />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}