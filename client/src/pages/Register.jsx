import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Centered Two-Panel Card */}
      <div className="flex w-full h-screen bg-[#111113] md:rounded-2xl md:border border-[#27272a] shadow-2xl overflow-hidden font-sans text-white selection:bg-cyan-500/30">
        
        {/* Left Panel */}
        <div className="hidden lg:flex w-[60%] flex-col items-center justify-center p-12 border-r border-[#27272a] relative">
          <div className="flex flex-col items-center max-w-[420px] text-center">
            <img src={logo} alt="TrendForge Logo" className="w-24 h-24 mb-4" />
            <h1 className="text-[28px] font-bold tracking-tight mb-1">
              Trend<span className="text-cyan-400">Forge</span>
            </h1>
            <p className="text-[10px] text-[#71717a] font-semibold tracking-[0.2em] uppercase mb-2">
              Predictive Media Intelligence
            </p>
            <div className="w-16 h-[1px] bg-[#27272a] mb-2"></div>
            <p className="text-[10px] text-[#71717a] font-semibold tracking-widest uppercase mb-8">
              The6kid
            </p>
            
            <h2 className="text-[28px] font-medium leading-[1.2] mb-8 text-white">
              Predict the cascade in its<br/>first hours. Buy inside the<br/>window.
            </h2>
            
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-12 px-4">
              DARPA runs five engines behind one conversation —<br/>
              detect, forecast, and clear the buy before the market<br/>
              replaces it.
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">SAM.GOV REGISTERED</span>
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">SBIR ELIGIBLE</span>
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">GDPR / CCPA</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex w-full lg:w-[40%] min-w-0 sm:min-w-[320px] flex-col items-center p-6 sm:p-10 overflow-y-auto">
          <div className="w-full max-w-[380px] my-auto py-8">
            <div className="flex items-center gap-4 mb-10">
               <img src={logo} alt="TrendForge Logo" className="w-12 h-12" />
               <div>
                 <h2 className="text-xl font-semibold text-white">Create your account</h2>
                 <p className="text-[#a1a1aa] text-[13px] mt-0.5">Start with DARPA Core, free while you evaluate</p>
               </div>
            </div>

            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  placeholder="Jane Cooper"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">Work Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    placeholder="jane@acmemedia.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">Company</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder="Minimum 10 characters"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">I'm signing up as a...</label>
                <div className="relative">
                  <select className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white text-[14px] appearance-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
                    <option>Enterprise / agency buyer</option>
                    <option>Individual trader</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#71717a]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 pb-2">
                <label className="flex items-start gap-3 cursor-pointer group mt-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 appearance-none border border-[#27272a] bg-[#09090b] rounded-sm checked:bg-cyan-500 checked:border-cyan-500 focus:outline-none cursor-pointer transition-colors relative after:content-[''] after:absolute after:hidden checked:after:block after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-black after:rotate-45 after:left-[5px] after:top-[2px]"
                  />
                  <span className="text-[12px] text-[#a1a1aa] leading-tight">
                    I agree to the <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">Terms of Service</a> and <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">Privacy Policy</a>
                  </span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#00E5FF] hover:bg-[#00c9e0] text-black text-[14px] font-semibold py-2.5 rounded-md transition-colors duration-200 disabled:opacity-50" 
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </form>

            <p className="mt-8 text-center text-[13px] text-[#a1a1aa]">
              Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
