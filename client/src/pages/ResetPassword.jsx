import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await axios.post("/api/reset-password", {
        email,
      });
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
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
              Compliance is visible, not<br/>buried. Neither is your <br/>account recovery.
            </h2>
            
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-12 px-4">
              We'll email a secure, time-limited reset link. It expires 
              in 30 minutes for your workspace's security.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex w-full lg:w-[40%] min-w-0 sm:min-w-[320px] flex-col items-center p-6 sm:p-10 overflow-y-auto">
          <div className="w-full max-w-[380px] my-auto py-8">
            <div className="flex items-center gap-4 mb-10">
               <img src={logo} alt="TrendForge Logo" className="w-12 h-12" />
               <div>
                 <h2 className="text-xl font-semibold text-white">Reset Password</h2>
                 <p className="text-[#a1a1aa] text-[13px] mt-0.5">Enter your email to receive a reset link</p>
               </div>
            </div>

            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm mb-6">{error}</div>}
            {message && <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-sm mb-6">{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button 
                type="submit" 
                className="w-full bg-[#00E5FF] hover:bg-[#00c9e0] text-black text-[14px] font-semibold py-2.5 rounded-md transition-colors duration-200 disabled:opacity-50 mt-4" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <div className="mt-6 text-[13px] text-[#a1a1aa] leading-relaxed border border-[#27272a] p-4 rounded-md bg-[#161618] flex gap-2">
              <div className="mb-2 font-semibold text-[#00E5FF]">✓</div>
              <p>
                If an account exists for that email, 
                we've sent a reset link. It'll arrive 
                within a minute — check your spam 
                folder if not.
              </p>
            </div>

            <p className="mt-8 text-center text-[13px] text-[#a1a1aa]">
              Remembered it? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium underline">Back to sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword; 
