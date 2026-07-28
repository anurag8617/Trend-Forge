import React from 'react';

function Forecasts() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1400px] w-full mx-auto">
          
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-6">
            
            {/* Left Column Stack */}
            <div className="flex flex-col gap-6">
              
              {/* Trajectory Graph Box */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[11px] text-white font-bold tracking-widest uppercase">Trajectory — Mob-wife aesthetic</h2>
                  <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase bg-[#00E5FF]/10 px-3 py-1 rounded-full">
                    Confidence Band
                  </span>
                </div>
                
                {/* SVG Graph Placeholder */}
                <div className="relative h-[120px] w-full mb-8 border-b border-[#27272a]/50">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {/* Area fill */}
                    <path d="M0,80 Q15,70 30,50 T60,45 T100,60 L100,100 L0,100 Z" fill="url(#area_gradient)" opacity="0.3" />
                    {/* Line */}
                    <path d="M0,80 Q15,70 30,50 T60,45 T100,60" stroke="#00E5FF" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                    <defs>
                      <linearGradient id="area_gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <p className="text-[#a1a1aa] text-[12px] leading-relaxed">
                  Forecasting a 12-hour window target. 94% signal fidelity — velocity threshold_not trailing.
                </p>
              </div>

              {/* What Quantum Cluster Claims */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col">
                <h2 className="text-[10px] text-white font-bold tracking-widest uppercase mb-4">What Quantum Cluster Claims — And Doesnt</h2>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-3xl">
                  Quantum cluster is a predictive model, not a prediction oracle. It does not forecast reality. Ghost Mode sited — the field-publishing models rely too heavy. Left unsteered on base firms, at-scale signal has cleared threshold. It forecasts trajectory and mid-point with hallmarks better accuracy. That's the torrent edge, and the only one we let.
                </p>
              </div>

            </div>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-6">
              
              {/* Opportunity Window */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Opportunity Window</h2>
                <div className="text-4xl font-medium text-white flex items-baseline gap-2">
                  18 <span className="text-sm font-semibold text-[#a1a1aa]">hrs</span>
                </div>
              </div>

              {/* Forecast Confidence */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Forecast Confidence</h2>
                <div className="text-4xl font-medium text-white flex items-baseline gap-2">
                  91 <span className="text-sm font-semibold text-[#a1a1aa]">%</span>
                </div>
              </div>

              {/* Saturation */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Saturation</h2>
                <div className="text-4xl font-medium text-white mb-4 flex items-baseline gap-2">
                  34 <span className="text-sm font-semibold text-[#a1a1aa]">% — climbing</span>
                </div>
                <p className="text-[12px] text-[#71717a] leading-relaxed">
                  Forecast to reach 75% market mass in 2 hrs. Act fast, rapidly.
                </p>
              </div>

            </div>

          </div>

        </div>
      </>
  );
}

export default Forecasts;
