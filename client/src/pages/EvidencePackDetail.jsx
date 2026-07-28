import React from 'react';

function EvidencePackDetail() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1200px] w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1">Retro gaming revival — Evidence Pack</h1>
              <p className="text-[12px] text-[#71717a]">Generated 2h ago. All data verified and cryptographically hashed.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-[12px] font-semibold text-white border border-[#27272a] rounded-lg hover:bg-[#27272a] transition-colors">Export PDF</button>
              <button className="px-4 py-2 text-[12px] font-semibold text-black bg-[#00E5FF] rounded-lg hover:bg-cyan-400 transition-colors">Export API JSON</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            
            <div className="flex flex-col gap-6">
              {/* Confidence calibration graph */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[11px] text-white font-bold tracking-widest uppercase">Confidence calibration</h2>
                  <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase">Live</span>
                </div>
                <div className="relative h-[120px] w-full border-b border-[#27272a]/50">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,80 L20,80 L25,60 L50,60 L70,55 L90,40 L100,35" stroke="#00E5FF" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#71717a] mt-4">Graph shows 48-hour velocity window. Daria cross-validated with 3 independent models.</p>
              </div>

              {/* Sentiment analysis */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
                <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-6">Sentiment analysis</h2>
                <div className="flex flex-col gap-5">
                  {[
                    { label: "Joy", value: 65 },
                    { label: "Nostalgia", value: 82 },
                    { label: "Anger", value: 4 },
                    { label: "Fear", value: 1 }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex justify-between text-[12px] text-[#e4e4e7] mb-1.5">
                        <span>{item.label}</span>
                        <span className="text-[#00E5FF]">{item.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E5FF]" style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Sources analyzed</h2>
                <div className="text-3xl font-medium text-white">40<span className="text-[12px] text-[#71717a] font-normal ml-2">platforms</span></div>
              </div>
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Compliance clearance</h2>
                <div className="text-2xl font-medium text-[#00E5FF]">CLEARED</div>
              </div>
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 flex-1">
                <h2 className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-4">Bio-feel insights</h2>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
                  The physiological response reflects deep comfort and nostalgia. High dopamine markers observed in text-analysis models. Users are seeking escapism through retro aesthetics. Recommend heavy brand alignment.
                </p>
              </div>
            </div>

          </div>
        </div>
      </>
  );
}

export default EvidencePackDetail;
