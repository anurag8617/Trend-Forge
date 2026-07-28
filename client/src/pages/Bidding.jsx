import React from 'react';

function Bidding() {
  const queue = [
    { name: "Quiet luxury fits", status: "Executing ($1.2M allocated)", details: "68% filled, velocity $14/CPM", active: true },
    { name: "Cozy productivity", status: "Paused (Awaiting manual)", details: "$0 filled", active: false },
    { name: "Tech-wear core", status: "Executed", details: "100% filled, velocity $28/CPM", active: false }
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1200px] w-full mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">
            
            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[13px] text-white font-semibold">HoloBidder — Mob-wife gaming chairs</h2>
                <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase">Pending bid execution</span>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Confidence threshold</div>
                  <div className="text-3xl font-medium text-white">90<span className="text-sm text-[#71717a]"> %</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Maximum bid</div>
                  <div className="text-3xl font-medium text-[#00E5FF]">$4,000</div>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-1 bg-[#00E5FF] text-black font-semibold text-[13px] py-3 rounded-lg hover:bg-cyan-400 transition-colors">
                  EXECUTE
                </button>
                <button className="flex-1 border border-[#27272a] text-white font-semibold text-[13px] py-3 rounded-lg hover:bg-[#27272a] transition-colors">
                  PAUSE & ESCALATE
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 flex-1 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Max CPM Velocity</h2>
                <div className="text-2xl font-medium text-white">$30</div>
              </div>
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 flex-1 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Max Bid Frequency</h2>
                <div className="text-2xl font-medium text-white">10 <span className="text-sm text-[#71717a]">/ sec</span></div>
              </div>
            </div>

          </div>

          <div className="bg-[#052e2e] border border-[#00E5FF]/20 text-[#00E5FF] rounded-xl p-4 mb-6 flex items-center gap-3 text-[12px] font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            System check: Quantum Cluster fidelity holds at 91%. HoloBidder approved for Auto-execute up to $2.5M max total limit.
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4 border-b border-[#27272a] pb-4">Bid execution queue</h2>
            <div className="flex flex-col divide-y divide-[#27272a]">
              {queue.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-[#00E5FF] animate-pulse' : 'bg-[#52525b]'}`}></div>
                    <div>
                      <h4 className="text-[13px] font-medium text-white">{item.name}</h4>
                      <p className="text-[11px] text-[#71717a]">{item.status}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#71717a] text-right">
                    {item.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
  );
}

export default Bidding;
