import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    
    try {
      // Typically, you would call your backend endpoint here
      // const response = await fetch('http://localhost:5000/api/forgot-password', { ... });
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('If an account exists with that email, a password reset link has been sent.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#111113] text-white font-sans w-full absolute inset-0 z-50">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 border-r border-[#2C2D32] relative">
        <div className="max-w-md text-center flex flex-col items-center">
          {/* Logo SVG */}
          <div className="mb-6 relative">
            <svg width="100" height="110" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 2L76 22V66L40 86L4 66V22L40 2Z" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M15 60V45" stroke="#26E7FF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M25 60V35" stroke="#26E7FF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M35 60V25" stroke="#7B61FF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M45 60V40" stroke="#7B61FF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M55 60V30" stroke="#9B6CFF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M65 60V15" stroke="#9B6CFF" strokeWidth="6" strokeLinecap="round"/>
              <path d="M40 40L65 15M65 15H50M65 15V30" stroke="#26E7FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="4" y1="2" x2="76" y2="86" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#26E7FF" />
                  <stop offset="1" stopColor="#9B6CFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="text-[28px] font-bold mb-2">Trend<span className="text-[#26E7FF]">Forge</span></h1>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] mb-8 font-semibold">PREDICTIVE MEDIA INTELLIGENCE</p>
          
          <h2 className="text-3xl font-medium leading-snug mb-6">
            Regain access to your<br />command center.
          </h2>
          
          <p className="text-sm text-[#8A8F98] leading-relaxed mb-16 max-w-sm">
            We will send you a secure link to reset your password and restore access to your workspace.
          </p>
        </div>
      </div>
      
      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#111113]">
        <div className="w-full max-w-[360px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-lg bg-[#18191C] border border-[#2C2D32] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#26E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8v4" stroke="#9B6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16h.01" stroke="#9B6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-[22px] font-bold">Reset password</h2>
              <p className="text-[13px] text-[#8A8F98]">Enter your email to receive a link</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded bg-red-500/20 text-red-400 text-sm border border-red-500/50">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 rounded bg-green-500/20 text-green-400 text-sm border border-green-500/50">
                {message}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-[#8A8F98]">WORK EMAIL</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@acmemedia.com"
                className="w-full bg-[#111113] border border-[#2C2D32] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#26E7FF] transition-colors"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#26E7FF] hover:bg-[#5AD7E5] disabled:opacity-50 text-black font-semibold py-3 rounded-md transition-colors text-sm"
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center">
            <Link to="/login" className="flex items-center gap-2 text-sm text-[#8A8F98] hover:text-[#26E7FF] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
