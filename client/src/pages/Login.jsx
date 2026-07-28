import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/onboarding");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Restricted strictly to signing in existing accounts
    console.log("Initiating Google Sign-In for existing user...");
    // Add your Google OAuth sign-in logic here
  };

  return (
    <>
      {/* Centered Two-Panel Card */}
      <div className="flex w-full h-screen bg-[#111113] md:rounded-2xl md:border border-[#27272a] shadow-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="hidden lg:flex w-[60%] flex-col items-center justify-center p-12 border-r border-[#27272a] relative">
          <div className="flex flex-col items-center max-w-[420px] text-center">
            <img src={logo} alt="TrendForge Logo" className="w-24 h-24 mb-4" />
            <h1 className="text-[28px] font-bold tracking-tight mb-1">
              Trend<span className="text-cyan-400">Forge</span>
            </h1>
            <p className="text-[10px] text-[#71717a] font-semibold tracking-[0.2em] uppercase mb-2  ">
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
        <div className="flex w-full lg:w-[40%] min-w-0 sm:min-w-[320px] flex-col items-center p-6 sm:p-10 overflow-y-auto">
          <div className="w-full max-w-[380px] my-auto py-8">
            <div className="flex items-center gap-4 mb-10">
              <img src={logo} alt="TrendForge Logo" className="w-12 h-12" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Welcome back
                </h2>
                <p className="text-[#a1a1aa] text-[13px] mt-0.5">
                  Sign in to your workspace
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">
                  Work Email
                </label>
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
                <label className="block text-[11px] font-semibold text-[#71717a] mb-2 uppercase tracking-widest">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2.5 bg-[#09090b] border border-[#27272a] rounded-md text-white placeholder-[#52525b] text-[14px] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between pt-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 appearance-none border border-[#27272a] bg-[#09090b] rounded-sm checked:bg-cyan-500 checked:border-cyan-500 focus:outline-none cursor-pointer transition-colors relative after:content-[''] after:absolute after:hidden checked:after:block after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-black after:rotate-45 after:left-[5px] after:top-[2px]"
                  />
                  <span className="text-[12px] text-[#a1a1aa] group-hover:text-white transition-colors">
                    Keep me logged in
                  </span>
                </label>
                <Link
                  to="/reset-password"
                  className="text-[12px] text-cyan-400 hover:text-cyan-300 transition-colors underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00E5FF] hover:bg-[#00c9e0] text-black text-[14px] font-semibold py-2.5 rounded-md transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="h-[1px] flex-1 bg-[#27272a]"></div>
                <span className="text-[10px] text-[#71717a] font-medium uppercase tracking-widest">
                  Or
                </span>
                <div className="h-[1px] flex-1 bg-[#27272a]"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-[#09090b] border border-[#27272a] hover:bg-[#1f1f22] text-white text-[14px] font-medium py-2.5 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#a1a1aa]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-medium underline "
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

export default Login;
  888 