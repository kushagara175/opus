import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { CloudBackground } from './components/CloudBackground';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  // If we are in Dashboard view, render only the Dashboard
  if (view === 'dashboard') {
    return <Dashboard />;
  }

  // Otherwise render the Landing Page
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-sky-900 flex flex-col" style={{ scrollBehavior: 'smooth' }}>
      {/* Fixed Background - Premium Cloud Parallax */}
      <CloudBackground />

      {/* Navbar Fixed Top */}
      <Navbar onStart={() => setView('dashboard')} />

      {/* Main Content */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 pt-32 pb-32 md:pt-48 space-y-24 md:space-y-32 flex flex-col items-center">
        <Hero onStart={() => setView('dashboard')} />

        <div className="w-full relative pt-20">
          {/* Subtle separator glow - updated for light theme */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
          <HowItWorks />
        </div>

        <div className="w-full relative pt-32">
          {/* Subtle separator glow - updated for light theme */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <Pricing />
        </div>
      </main>

      {/* Footer Full Width */}
      <Footer />
    </div>
  );
};

export default App;