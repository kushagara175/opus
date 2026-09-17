import React from 'react';
import { Box, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 pt-24 pb-12 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-24 mb-20">

          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <span className="font-bold text-slate-900 text-xl tracking-tight">Opus<span className="text-blue-600">.</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 pr-4">
              We're building the future of document generation. Turn messy drafts into masterpiece designs instantly with AI.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Github} href="#" />
              <SocialLink icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 tracking-wide">Product</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><FooterLink>Features</FooterLink></li>
              <li><FooterLink>Templates</FooterLink></li>
              <li><FooterLink>Integrations</FooterLink></li>
              <li><FooterLink>Changelog</FooterLink></li>
              <li><FooterLink>Pricing</FooterLink></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 tracking-wide">Resources</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><FooterLink>Documentation</FooterLink></li>
              <li><FooterLink>API Reference</FooterLink></li>
              <li><FooterLink>Community</FooterLink></li>
              <li><FooterLink>Blog</FooterLink></li>
              <li><FooterLink>Help Center</FooterLink></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><FooterLink>About</FooterLink></li>
              <li><FooterLink>Careers</FooterLink></li>
              <li><FooterLink>Legal</FooterLink></li>
              <li><FooterLink>Privacy</FooterLink></li>
              <li><FooterLink>Contact</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 text-sm flex items-center gap-1">
            © 2024 Opus Inc. Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in San Francisco.
          </p>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: any;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href }) => (
  <a href={href} className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900 hover:scale-110 shadow-sm">
    <Icon className="h-4 w-4" />
  </a>
);

interface FooterLinkProps {
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children }) => (
  <a href="#" className="hover:text-blue-600 transition-colors duration-200 block">
    {children}
  </a>
);
