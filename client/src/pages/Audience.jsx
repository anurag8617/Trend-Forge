import React from 'react';

function Audience() {
  const demographics = [
    { label: "18-24", value: 35 },
    { label: "25-34", value: 42 },
    { label: "35-44", value: 15 },
    { label: "45+", value: 8 }
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1200px] w-full mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">
            
            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[11px] text-white font-bold tracking-widest uppercase">Emotional Resonance — Mob-wife aesthetics</h2>
                <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase">High Arousal</span>
              </div>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-6xl font-medium text-white">82</div>
                <div className="text-sm text-[#71717a] mb-2">/ 100 arousal</div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-[#00E5FF] w-[82%]"></div>
                <div className="absolute top-0 left-[82%] w-1 h-full bg-white scale-125 z-10"></div>
              </div>
              <div className="flex justify-between text-[10px] text-[#71717a] font-bold tracking-widest uppercase mt-2">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col justify-center">
              <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-4">Virality Multiplier (K)</h2>
              <div className="text-5xl font-medium text-white flex items-baseline gap-2">
                2.4 <span className="text-sm font-semibold text-[#a1a1aa]">multiplier</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            
            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
              <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-6">Demographics distribution</h2>
              <div className="flex flex-col gap-5">
                {demographics.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] text-[#e4e4e7] mb-1.5">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00E5FF]" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col">
              <h2 className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-4">Bio-Feel Summary</h2>
              <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
                Audience demonstrates high physiological arousal and dominance. Sentiment is overwhelmingly positive and eager. They feel powerful and want to project it. Perfect for premium conversion.
              </p>
            </div>

          </div>

        </div>
      </>
  );
}

export default Audience;
