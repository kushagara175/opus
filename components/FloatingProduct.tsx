import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Wand2, Image as ImageIcon, BarChart3, Grip, Sparkles, ArrowRight, Server, Cloud, Zap } from 'lucide-react';

export const FloatingProduct: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: 10 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      className="relative w-full"
    >
      <motion.div
        animate={{ y: [-5, 5] }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 6,
          ease: "easeInOut",
        }}
        className="relative mx-auto w-full max-w-4xl"
      >
        {/* Main Glass Container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-2xl backdrop-blur-xl ring-1 ring-white/50">

          {/* Mac-style Window Header */}
          <div className="flex items-center justify-between border-b border-slate-200/50 bg-white/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400/80 border border-red-500/20" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80 border border-yellow-500/20" />
              <div className="h-3 w-3 rounded-full bg-green-400/80 border border-green-500/20" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span>Opus Engine</span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Content Area - Split View */}
          <div className="relative grid grid-cols-[1.3fr_1fr] h-[500px]">

            {/* Left Side: The "Boring Input" */}
            <div className="relative border-r border-slate-200 bg-gray-50 p-0 flex flex-col font-mono text-[10px] text-slate-600">
              {/* Editor Header */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-gray-100 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="ml-2 text-xs text-slate-500 font-medium">nebula_draft_v1.txt</div>
              </div>

              <div className="p-6 h-full flex flex-col justify-center gap-6 overflow-y-auto leading-relaxed text-slate-700">
                <p className="text-lg font-medium text-center">"Write a whitepaper for my new cloud project called Nebula. It's an intelligent cloud platform, not static storage like AWS or Azure. We call it 'Atmospheric Computing' because it's active, not passive."</p>


              </div>
            </div>

            {/* Right Side: The "Stunning Output" */}
            <div className="relative bg-white overflow-hidden flex flex-col">
              {/* Magic Beam Effect at Divider - Static */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent z-20 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <div
                  className="absolute top-1/2 -left-[3px] h-6 w-[7px] -translate-y-1/2 rounded-full bg-blue-500 blur-[2px]"
                />
                {/* Arrow Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-1.5 shadow-lg border border-blue-100">
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                </div>
              </div>

              {/* Rendered HTML Content */}
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom right, #ffffff, #f0f9ff)', position: 'relative', overflowY: 'auto', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#111' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>

                <div style={{ padding: '40px 50px 80px 50px', display: 'flex', flexDirection: 'column', minHeight: '100%', boxSizing: 'border-box' }}>

                  <div style={{ borderBottom: '3px solid #000', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#3b82f6', marginBottom: '5px' }}>Whitepaper V2.0</div>
                      <h1 style={{ fontSize: '36px', lineHeight: 1, margin: 0, fontWeight: 900, letterSpacing: '-1.5px', color: '#000' }}>NEBULA.</h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#000' }}>The Intelligent Cloud</div>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Nov 2025 // Confidential</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: '#334155', margin: 0, textAlign: 'justify' }}>
                      <span style={{ fontWeight: 700, color: '#3b82f6' }}>Abstract:</span> We are introducing a paradigm shift from traditional Cloud Storage to "Atmospheric Computing." Nebula is not a passive host; it is an active partner that liquefies data across 5,000 edge nodes.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '15px', marginTop: '0px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.6)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', textAlign: 'center', fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>LIQUID ARCHITECTURE</div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
                      <div style={{ width: '60px', height: '130px', background: 'rgba(255,255,255,0.8)', border: '1px solid #cbd5e1', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
                          <div style={{ fontSize: '8px', fontWeight: 700, lineHeight: 1.2 }}>CODE<br />INPUT</div>
                        </div>
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '20px' }}>→</div>
                      <div style={{ width: '80px', height: '140px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)', border: '1px solid #3b82f6', borderRadius: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)', position: 'relative', zIndex: 2 }}>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: '#3b82f6', marginBottom: '10px', textAlign: 'center', lineHeight: 1.2 }}>NEBULA<br />CORE</div>
                        <div style={{ width: '60%', height: '3px', background: '#bfdbfe', borderRadius: '2px', marginBottom: '4px' }}></div>
                        <div style={{ width: '40%', height: '3px', background: '#bfdbfe', borderRadius: '2px', marginBottom: '4px' }}></div>
                        <div style={{ width: '50%', height: '3px', background: '#bfdbfe', borderRadius: '2px' }}></div>
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '20px' }}>→</div>
                      <div style={{ width: '60px', height: '130px', background: 'rgba(255,255,255,0.8)', border: '1px solid #cbd5e1', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌍</div>
                          <div style={{ fontSize: '8px', fontWeight: 700, lineHeight: 1.2 }}>GLOBAL<br />SCALE</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '30px', fontSize: '11px', lineHeight: 1.8, color: '#475569', textAlign: 'justify' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000', margin: '0 0 10px 0', textTransform: 'uppercase' }}>01. Zero Latency</h3>
                      <p style={{ margin: 0 }}>Unlike AWS or Azure, where you select a region and stay there, Nebula’s AI predicts user traffic patterns milliseconds before they occur. It flows your application across the globe, instantiating micro-instances instantly where they are needed most.</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000', margin: '0 0 10px 0', textTransform: 'uppercase' }}>02. Security & Scale</h3>
                      <p style={{ margin: 0 }}>This is the end of "managing servers." This is the beginning of Zero-Latency Orchestration. With military-grade encryption interwoven into the fabric of the network, Nebula ensures that speed never comes at the cost of security.</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', marginBottom: '5px' }}>FIG 2.0: PERFORMANCE ANALYSIS</div>
                    <div style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '15px', border: '1px solid rgba(255,255,255,0.6)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', height: '80px', gap: '15px' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <Server className="w-3 h-3 text-slate-400" />
                          <div style={{ width: '100%', height: '40%', background: '#cbd5e1', borderRadius: '4px 4px 0 0', opacity: 0.5 }}></div>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b' }}>AWS</div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <Cloud className="w-3 h-3 text-slate-400" />
                          <div style={{ width: '100%', height: '55%', background: '#cbd5e1', borderRadius: '4px 4px 0 0', opacity: 0.5 }}></div>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b' }}>AZURE</div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <Zap className="w-3 h-3 text-blue-500" />
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, #3b82f6, #60a5fa)', borderRadius: '4px 4px 0 0', boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}></div>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#3b82f6' }}>NEBULA</div>
                        </div>
                      </div>
                      <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '10px', color: '#64748b' }}>
                        Nebula outperforms traditional cloud providers by <span style={{ color: '#3b82f6', fontWeight: 700 }}>3.5x</span> in cold-start latency.
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000', margin: '0 0 10px 0', textTransform: 'uppercase' }}>03. Global Infrastructure</h3>
                    <p style={{ fontSize: '11px', lineHeight: 1.8, color: '#475569', textAlign: 'justify', marginBottom: '20px' }}>
                      Our mesh network spans 120+ countries, utilizing decentralized edge nodes to bypass traditional internet bottlenecks. This ensures that your data takes the shortest physical path to the user, regardless of geopolitical boundaries.
                    </p>

                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', marginBottom: '5px' }}>FIG 3.0: NODE TOPOLOGY</div>
                    <div className="mt-5 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center" style={{ height: '220px' }}>
                      {/* Starry Background */}
                      <div className="absolute inset-0 opacity-20">
                        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '1px', height: '1px', background: '#fff', boxShadow: '0 0 2px #fff' }}></div>
                        <div style={{ position: 'absolute', top: '80%', left: '20%', width: '2px', height: '2px', background: '#fff', opacity: 0.5 }}></div>
                        <div style={{ position: 'absolute', top: '40%', left: '80%', width: '1px', height: '1px', background: '#fff' }}></div>
                        <div style={{ position: 'absolute', top: '10%', left: '90%', width: '2px', height: '2px', background: '#fff', opacity: 0.7 }}></div>
                        <div style={{ position: 'absolute', top: '70%', left: '60%', width: '1px', height: '1px', background: '#fff' }}></div>
                      </div>

                      {/* Globe Image */}
                      <img
                        src="/globe_infrastructure.jpg"
                        alt="Global Infrastructure"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-125"
                      />

                      {/* Overlay Gradient for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                      <div style={{ position: 'absolute', bottom: '10px', left: '15px', color: 'rgba(255,255,255,0.8)', fontSize: '8px', fontFamily: 'monospace', zIndex: 10 }}>
                        <div>MESH: ACTIVE</div>
                        <div style={{ color: '#60a5fa' }}>LATENCY: 12ms</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase' }}>Uptime Guarantee</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>99.999%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase' }}>Global Nodes</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>5,200+</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase' }}>Latency</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>&lt; 10ms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Accent behind the card */}
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

          </div>
        </div>

        {/* Floating Badges decorating the main card */}
        <FloatingBadge icon={FileText} text="OCR Active" top="10%" left="-5%" delay={0} />
        <FloatingBadge icon={Grip} text="Auto-Layout" bottom="15%" right="-8%" delay={1.5} />
      </motion.div>
    </motion.div >
  );
};

const FloatingBadge = ({ icon: Icon, text, top, left, right, bottom, delay }: any) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: delay + 1, duration: 0.5, type: "spring" }}
    style={{ top, left, right, bottom }}
    className="absolute flex items-center gap-2 rounded-lg border border-white/40 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
  >
    <div className="rounded-md bg-blue-500/10 p-1">
      <Icon className="h-3.5 w-3.5 text-blue-600" />
    </div>
    <span className="text-xs font-medium text-slate-700">{text}</span>
  </motion.div>
);
