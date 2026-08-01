import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../state/AppContext';
import logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addAuditLog } = useAppState();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Success, store token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      addAuditLog('USER_LOGIN', `User ${data.user.email} logged in`);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#111113] text-white font-sans">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 border-r border-[#2C2D32] relative">
        <div className="max-w-md text-center flex flex-col items-center">
          {/* Logo png */}
          <div className="mb-6 relative">
            <img src={logo} alt="TrendForge Logo" className="w-20 h-20" />
          </div>

          <h1 className="text-[28px] font-bold mb-2">
            Trend<span className="text-[#26E7FF]">Forge</span>
          </h1>

          <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] font-semibold">
            PREDICTIVE MEDIA INTELLIGENCE
          </p>

          {/* Line + THE6KID */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-44 h-px bg-gradient-to-r from-transparent via-[#596272] to-transparent opacity-60"></div>

            <span className="mt-3 text-[9px] tracking-[0.35em] font-bold text-[#6F7888]">
              THE6KID
            </span>
          </div>
          
          <h2 className="text-3xl font-medium leading-snug mb-6">
            Predict the cascade in its<br />first hours. Buy inside the<br />window.
          </h2>
          
          <p className="text-sm text-[#8A8F98] leading-relaxed mb-16 max-w-sm">
            DARPA runs five engines behind one conversation — detect, forecast, and clear the buy before the market replaces it.
          </p>
        </div>
        
        <div className="absolute bottom-12 flex gap-4 text-[10px] text-[#8A8F98]">
          <div className="px-4 py-2 rounded-full border border-[#2C2D32]">SAM.GOV REGISTERED</div>
          <div className="px-4 py-2 rounded-full border border-[#2C2D32]">SBIR ELIGIBLE</div>
          <div className="px-4 py-2 rounded-full border border-[#2C2D32]">GDPR / CCPA</div>
        </div>
      </div>
      
      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#111113]">
        <div className="w-full max-w-[360px]">
          <div className="flex items-center gap-4 mb-10">
              <img src={logo} alt="TrendForge Logo" className="w-12 h-12 " />
            <div>
              <h2 className="text-[22px] font-bold">Welcome back</h2>
              <p className="text-[13px] text-[#8A8F98]">Sign in to your account</p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded bg-red-500/20 text-red-400 text-sm border border-red-500/50">
                {error}
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
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-[#8A8F98]">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111113] border border-[#2C2D32] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#26E7FF] tracking-widest transition-colors"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#8A8F98]">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#2C2D32] bg-[#18191C] checked:bg-[#26E7FF] accent-[#26E7FF]" />
                <span>Keep me logged in</span>
              </label>
              <Link to="/forgot-password" className="text-[#26E7FF] hover:underline">Forgot password?</Link>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#26E7FF] hover:bg-[#5AD7E5] text-black font-semibold py-3 rounded-md transition-colors text-sm"
            >
              Sign in
            </button>
          </form>
          
          <div className="mt-8 flex items-center gap-4 text-[11px] text-[#8A8F98] before:h-px before:flex-1 before:bg-[#2C2D32] after:h-px after:flex-1 after:bg-[#2C2D32]">
            OR
          </div>
          
          <button className="mt-8 w-full bg-[#111113] border border-[#2C2D32] hover:bg-[#18191C] transition-colors py-3 rounded-md flex items-center justify-center gap-3 text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <p className="mt-8 text-center text-[13px] text-[#8A8F98]">
            Don't have an account? <Link to="/register" className="text-[#26E7FF] hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
