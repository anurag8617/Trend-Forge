import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="h-[64px] border-b border-[#27272a] flex items-center justify-between px-6 shrink-0 sticky top-0 bg-[#111113] z-20">
      
      <div className="flex items-center gap-3">
        {/* Mobile Menu Icon */}
        <button 
          onClick={() => window.dispatchEvent(new Event('toggleMobileMenu'))}
          className="lg:hidden text-[#a1a1aa] hover:text-white mr-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        
        <div className="w-7 h-7 flex items-center justify-center">
          <img src={logo} alt="Acme Logo" className="w-7 h-7 object-contain" />
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-[#e4e4e7] hover:text-white">
          Acme Media Group
          <svg className="w-3 h-3 text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272a] text-[11px] font-medium text-[#e4e4e7] bg-[#161618]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span> GDPR
        </span>
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272a] text-[11px] font-medium text-[#e4e4e7] bg-[#161618]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span> CCPA
        </span>
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272a] text-[11px] font-medium text-[#e4e4e7] bg-[#161618]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span> FISMA — pending
        </span>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/notifications" className="relative p-2 text-[#a1a1aa] hover:text-white transition-colors">
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00E5FF] rounded-full"></div>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </Link>
        <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-[#27272a] cursor-pointer hover:border-[#00E5FF] transition-colors">
          <img src="https://i.pravatar.cc/150?u=jane" alt="Avatar" className="w-full h-full object-cover" />
        </Link>
      </div>
      
    </header>
  );
}

export default Header;
