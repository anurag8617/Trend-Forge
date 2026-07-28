import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming logo is imported from your assets
import logo from "../assets/logo.png";

const categories = [
  "Beauty",
  "Fashion",
  "Entertainment",
  "Travel",
  "Lifestyle",
  "Technology",
  "Food & Beverage",
  "Automotive",
];

const connectedSources = [
  { name: "Lifestyle", active: true },
  { name: "Bluesky", active: true },
  { name: "GDELT news", active: true },
  { name: "Telegram", active: false },
];

function Onboarding() {
  const [selectedCategories, setSelectedCategories] = useState([
    "Beauty",
    "Fashion",
    "Entertainment",
  ]);
  const navigate = useNavigate();

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="min-h-screen bg-[#111113] font-sans text-white p-6 md:p-6 flex flex-col items-center selection:bg-[#00E5FF]/30">
      <div className="w-full max-w-6xl flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-3 mb-12">
          {/* Use standard img tag if logo is an actual image file, or fallback to text if missing */}
          {logo ? (
            <img
              src={logo}
              alt="TrendForge Logo"
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-tr from-[#6366F1] to-[#00E5FF] rounded flex items-center justify-center font-bold">
              TF
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold leading-tight tracking-tight flex items-center">
              <span>Trend</span>
              <span className="text-[#00E5FF]">Forge</span>
            </h1>
            <p className="text-[7px] uppercase tracking-[0.2em] text-[#71717a] font-semibold">
              Predictive Media Intelligence
            </p>
            <div className="w-12 h-px bg-[#27272a] my-0.5"></div>
            <p className="text-[7px] uppercase tracking-[0.3em] font-semibold text-[#71717a]">
              THE6KID
            </p>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-4xl mx-auto mb-12">
          {/* Step 1 */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-7 h-7 rounded-full bg-[#00E5FF] flex items-center justify-center z-10">
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-[13px] font-medium text-white">
              Connect sources
            </span>
          </div>

          <div className="hidden md:block flex-1 min-w-[40px] h-[2px] bg-[#00E5FF] mx-4 shrink-0"></div>
          <div className="md:hidden w-[2px] h-6 bg-[#00E5FF] ml-[13px] my-1 shrink-0"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-7 h-7 rounded-full border-2 border-[#00E5FF] flex items-center justify-center text-[13px] font-bold text-[#00E5FF] z-10 bg-[#111113]">
              2
            </div>
            <span className="text-[13px] font-medium text-white">
              Choose categories
            </span>
          </div>

          <div className="hidden md:block flex-1 min-w-[40px] h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#27272a] mx-4 shrink-0"></div>
          <div className="md:hidden w-[2px] h-6 bg-gradient-to-b from-[#00E5FF] to-[#27272a] ml-[13px] my-1 shrink-0"></div>

          {/* Step 3 */}
          <div className="flex items-center gap-3 shrink-0 opacity-50">
            <div className="w-7 h-7 rounded-full border-2 border-[#52525b] flex items-center justify-center text-[13px] font-bold text-[#52525b] z-10 bg-[#111113]">
              3
            </div>
            <span className="text-[13px] font-medium text-[#a1a1aa]">
              Review settings
            </span>
          </div>

          <div className="hidden md:block flex-1 min-w-[40px] h-[2px] bg-[#27272a] mx-4 shrink-0"></div>
          <div className="md:hidden w-[2px] h-6 bg-[#27272a] ml-[13px] my-1 shrink-0"></div>

          {/* Step 4 */}
          <div className="flex items-center gap-3 shrink-0 opacity-50">
            <div className="w-7 h-7 rounded-full border-2 border-[#52525b] flex items-center justify-center text-[13px] font-bold text-[#52525b] z-10 bg-[#111113]">
              4
            </div>
            <span className="text-[13px] font-medium text-[#a1a1aa]">Done</span>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-4 w-full max-w-6xl mx-auto">
          {/* Categories Card */}
          <section className="bg-[#1C1C1E] rounded-xl p-8 shadow-lg border border-transparent">
            <h2 className="text-[17px] font-semibold text-white mb-1">
              Which categories should DARIA watch?
            </h2>
            <p className="text-[#a1a1aa] text-[13px] mb-8">
              Pick as many as apply — you can change these any time in Settings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-all duration-200 border ${
                      isActive
                        ? "bg-[#172A2D] border-[#00E5FF] text-white"
                        : "bg-transparent border-[#3f3f46] hover:border-[#52525b] text-[#e4e4e7]"
                    }`}
                  >
                    <span className="text-[14px] font-semibold mb-1">
                      {cat}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${isActive ? "text-[#00E5FF]" : "text-[#71717a]"}`}
                    >
                      {isActive ? "Selected" : "—"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Connected Sources Card */}
          <section className="bg-[#1C1C1E] rounded-xl p-8 shadow-lg border border-transparent">
            <h2 className="text-[17px] font-semibold text-white mb-1">
              Connected sources
            </h2>
            <p className="text-[#a1a1aa] text-[13px] mb-8">
              Ghost Mode is already streaming from these — add more any time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {connectedSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-5 py-4 border border-[#3f3f46] rounded-lg bg-transparent"
                >
                  <span className="text-[14px] font-semibold text-white">
                    {source.name}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${source.active ? "bg-[#00E5FF]" : "bg-[#52525b]"}`}
                  ></div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="w-full max-w-4xl mx-auto mt-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#3f3f46] text-[#e4e4e7] hover:bg-[#1C1C1E] transition-colors text-[14px] font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-6 py-3 bg-[#00E5FF] hover:bg-[#00c9e0] text-[#111113] text-[14px] font-bold rounded-lg transition-colors duration-200"
          >
            Continue to compliance
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </footer>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Onboarding;
