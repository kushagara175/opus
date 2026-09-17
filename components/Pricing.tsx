import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/mo",
        description: "Perfect for testing the engine.",
        features: ["3 documents per month", "Basic templates", "Standard email support", "720p export quality"],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Pro",
        price: "$5",
        period: "/mo",
        description: "For serious content creators.",
        features: ["Unlimited documents", "All premium templates", "Priority support 24/7", "4K vector export", "Custom fonts & branding", "Analytics dashboard"],
        cta: "Get Pro",
        popular: true
    },
    {
        name: "Team",
        price: "$29",
        period: "/mo",
        description: "Scale with your organization.",
        features: ["Everything in Pro", "10 team seats", "Shared asset library", "Admin controls", "SSO & API Access", "Dedicated success manager"],
        cta: "Contact Sales",
        popular: false
    }
];

export const Pricing: React.FC = () => {
    return (
        <section className="relative py-12 w-full">
            {/* Background Light Spill */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

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
                    className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-blue-800 to-slate-900 drop-shadow-sm filter pb-4 leading-tight mb-2"
                >
                    Simple, transparent pricing
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-600 text-lg"
                >
                    No hidden fees. Cancel anytime. <br className="md:hidden" /> Upgrade as you grow.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch relative z-10 px-4">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`relative rounded-3xl backdrop-blur-xl flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 group will-change-transform
                            ${plan.popular
                                ? 'bg-gradient-to-b from-white to-slate-50 border border-blue-200 shadow-2xl shadow-blue-900/10 md:-mt-8 md:mb-8 ring-1 ring-blue-400/20'
                                : 'bg-white/60 border border-slate-200 hover:border-slate-300 shadow-lg shadow-slate-200/50'
                            }
                        `}
                    >
                        {/* Border Beam Effect for First Card */}
                        {i === 0 && (
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMaskComposite: 'xor',
                                    padding: '2px'
                                }}
                            >
                                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,white_360deg)] animate-[spin_4s_linear_infinite]" />
                            </div>
                        )}

                        {plan.popular && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-900/50 uppercase tracking-widest ring-1 ring-white/20">
                                    <Sparkles className="h-3 w-3" />
                                    Most Popular
                                </div>
                            </div>
                        )}

                        <div className="mb-8 pt-4">
                            <h3 className={`text-lg font-semibold ${plan.popular ? 'text-slate-900' : 'text-slate-700'}`}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mt-4">
                                <span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span>
                                <span className="text-slate-500 font-medium">{plan.period}</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-4 leading-relaxed border-b border-slate-200 pb-8">{plan.description}</p>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.popular ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-500'}`}>
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <span className="opacity-90">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group
                            ${plan.popular
                                ? 'bg-slate-900 text-white hover:bg-slate-800'
                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
                            }
                        `}>
                            <span className="relative z-10">{plan.cta}</span>
                            {plan.popular && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}