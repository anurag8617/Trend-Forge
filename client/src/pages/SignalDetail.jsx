import React from 'react';
import { Link } from 'react-router-dom';

function SignalDetail() {
  const prescriptions = [
    { title: "Allocate budget", desc: "Target $5-10k per day across TikTok and IG Reels.", tag: "Executing", active: true },
    { title: "Creative direction", desc: "Focus on bold, unapologetic messaging.", tag: "Pending", active: false },
    { title: "Demographic shift", desc: "Move targeting from 18-24 to 25-34.", tag: "Pending", active: false },
    { title: "Bidding strategy", desc: "Switch from manual CPM to Auto-execute up to $30.", tag: "Auto-executed", active: true }
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1000px] w-full mx-auto">
          
          <Link to="/signals" className="inline-flex items-center gap-2 text-[12px] text-[#71717a] hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Signals
          </Link>

          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">Mob-wife aesthetics</h1>
              <p className="text-[13px] text-[#a1a1aa]">Beauty - Fringe cluster -&gt; mainstream/reddit fashion subs</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-medium text-[#00E5FF] flex items-baseline gap-2 justify-end">
                87 <span className="text-sm font-semibold text-[#a1a1aa]">/100 momentum</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 mb-8">
            <div className="relative pt-6 pb-2">
              <div className="absolute top-6 left-0 w-full h-1 bg-[#27272a] rounded-full"></div>
              <div className="absolute top-6 left-0 h-1 bg-[#00E5FF] rounded-full w-[67%]"></div>
              
              <div className="flex justify-between relative z-10 text-[10px] font-bold tracking-widest uppercase text-[#71717a]">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00E5FF] border-2 border-[#1C1C1E] mb-2 -mt-1"></div>
                  Fringe
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00E5FF] border-2 border-[#1C1C1E] mb-2 -mt-1"></div>
                  Mainstream
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-[#00E5FF] mb-2 -mt-1.5 shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                  <span className="text-[#00E5FF]">Saturation</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#27272a] border-2 border-[#1C1C1E] mb-2 -mt-1"></div>
                  Decay
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Prescriptions */}
          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4 border-b border-[#27272a] pb-4">Actionable Prescriptions</h2>
            
            <div className="flex flex-col divide-y divide-[#27272a]">
              {prescriptions.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-5">
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      {item.active ? (
                        <div className="w-5 h-5 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-[#52525b] flex items-center justify-center"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-medium text-white mb-1">{item.title}</h4>
                      <p className="text-[13px] text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#71717a]">
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
  );
}

export default SignalDetail;
