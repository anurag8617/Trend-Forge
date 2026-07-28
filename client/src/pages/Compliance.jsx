import React from 'react';

function Compliance() {
  const checks = [
    { name: "Bot Network affiliation (Mib-Botnet)", status: "CLEAR" },
    { name: "Political / State Sponsored astroturfing", status: "CLEAR" },
    { name: "Brand Safety (Hate speech)", status: "CLEAR" },
    { name: "Troll farm origins (Olgino/IRA)", status: "CLEAR" },
    { name: "Adult content overlay/bait", status: "CLEAR" }
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1000px] w-full mx-auto">
          
          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 mb-6">
            <h2 className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-2">DisinfoDefender (Pre-screening)</h2>
            <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
              DisinfoDefender acts as the first line of defense, ensuring that the trend is organic and not artificially inflated by bot networks, state-sponsored actors, or troll farms. We do not bid on fake trends.
            </p>
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-6 border-b border-[#27272a] pb-4">
              <h2 className="text-[13px] text-white font-semibold">Provenance checks — Mob-wife gaming chairs</h2>
              <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase bg-[#00E5FF]/10 px-3 py-1 rounded-full">
                Clear - Green
              </span>
            </div>
            
            <div className="flex flex-col divide-y divide-[#27272a]">
              {checks.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></div>
                    <span className="text-[13px] text-[#e4e4e7]">{item.name}</span>
                  </div>
                  <span className="text-[11px] text-[#71717a] font-medium">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-[#ef4444]/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#ef4444]"></div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-[13px] text-white font-semibold pl-2">Compliance run: Dark-web breached database</h2>
              <span className="text-[10px] text-[#ef4444] font-bold tracking-widest uppercase">
                Red - Do Not Bid
              </span>
            </div>
            <p className="text-[#71717a] text-[12px] pl-2">
              Bot farm flagged with 99% confidence. Auto-blacklisted.
            </p>
          </div>

        </div>
      </>
  );
}

export default Compliance;
