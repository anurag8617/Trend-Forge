import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [plan, setPlan] = useState("Enterprise / agency buyer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      {/* Centered Two-Panel Card */}
      <div className="flex w-full h-screen bg-[#111113] rounded-2xl border border-[#27272a] shadow-2xl overflow-hidden font-sans text-white selection:bg-cyan-500/30">
        
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
              Predict the cascade in its
              <br />
              first hours. Buy inside the
              <br />
              window.
            </h2>

            <p className="text-[13px] text-[#a1a1aa] leading-relaxed mb-12 px-4">
              DARPA runs five engines behind one conversation —<br />
              detect, forecast, and clear the buy before the market
              <br />
              replaces it.
            </p>

            <div className="flex items-center justify-center gap-3">
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">
                SAM.GOV REGISTERED
              </span>
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">
                SBIR ELIGIBLE
              </span>
              <span className="px-4 py-1.5 border border-[#27272a] rounded-full text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider bg-[#161618]">
                GDPR / CCPA
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex w-full lg:w-[40%] min-w-[320px] flex-col items-center justify-center p-8 sm:p-10 overflow-y-auto">
          <div className="w-full max-w-[380px]">
            <div className="flex items-center gap-4 mb-10">
              <img src={logo} alt="TrendForge Logo" className="w-12 h-12" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create your workspace
                </h2>
                <p className="text-[#a1a1aa] text-[13px] mt-0.5">
                  Start with DARPA Core, free while you evaluate
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Jane Cooper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">
                  Workspace Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">
                  Plan Selection
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white text-[14px] appearance-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
                    <option>Enterprise / agency buyer</option>
                    <option>Individual trader</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#71717a]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00E5FF] hover:bg-[#00c9e0] text-black text-[14px] font-semibold py-2.5 rounded-md transition-colors duration-200 disabled:opacity-50 mt-4"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Workspace"}
              </button>
            </form>

            <p className="mt-8 text-center text-[13px] text-[#a1a1aa]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
