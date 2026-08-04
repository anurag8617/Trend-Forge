import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../state/AppContext';
import logo from '../../assets/logo.png';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addAuditLog } = useAppState();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store admin token and redirect to admin dashboard
      localStorage.setItem('token', data.token);
      addAuditLog('ADMIN_LOGIN', `Admin ${data.user.email} logged in`);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#111113] text-white font-sans">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 border-r border-[#2C2D32] relative">
        <div className="max-w-md text-center flex flex-col items-center">
          <div className="mb-6 relative">
            <img src={logo} alt="TrendForge Logo" className="w-20 h-20" />
          </div>
          <h1 className="text-[28px] font-bold mb-2">
            Admin <span className="text-[#26E7FF]">Panel</span>
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] font-semibold">
            ADMINISTRATIVE ACCESS
          </p>
          <div className="flex flex-col items-center mt-6">
            <div className="w-44 h-px bg-gradient-to-r from-transparent via-[#596272] to-transparent opacity-60" />
            <span className="mt-3 text-[9px] tracking-[0.35em] font-bold text-[#6F7888]">
              ADMIN ACCESS ONLY
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#111113]">
        <div className="w-full max-w-[360px]">
          <div className="flex items-center gap-4 mb-10">
            <img src={logo} alt="TrendForge Logo" className="w-12 h-12" />
            <div>
              <h2 className="text-[22px] font-bold">Admin Sign In</h2>
              <p className="text-[13px] text-[#8A8F98]">Secure access to admin console</p>
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
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@trendforge.com"
                className="w-full bg-[#111113] border border-[#2C2D32] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#26E7FF] transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-[#8A8F98]">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111113] border border-[#2C2D32] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#26E7FF] transition-colors"
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#8A8F98]"><input type="checkbox" className="w-3.5 h-3.5 rounded border-[#2C2D32] bg-[#18191C] checked:bg-[#26E7FF] accent-[#26E7FF]" /> Keep me logged in</label>
              <Link to="/forgot-password" className="text-[#26E7FF] hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#26E7FF] hover:bg-[#5AD7E5] text-black font-semibold py-3 rounded-md transition-colors text-sm"
            >
              Sign in
            </button>
          </form>
          <p className="mt-8 text-center text-[13px] text-[#8A8F98]">
            Not an admin? <Link to="/login" className="text-[#26E7FF] hover:underline">User login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
