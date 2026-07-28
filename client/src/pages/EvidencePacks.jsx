import React from 'react';
import { Link } from 'react-router-dom';

function EvidencePacks() {
  const packs = [
    { name: "Mob-wife gaming chairs — Full execution", size: "740 MB", active: true },
    { name: "Quiet luxury fits — Active execution", size: "412 MB", active: true },
    { name: "Cozy productivity — Forecast only", size: "120 MB", active: false },
    { name: "Gorp-core hiking fits — Forecast only", size: "85 MB", active: false },
    { name: "Archival fashion revival — Aborted (Bot farm)", size: "1.2 GB", active: false },
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1000px] w-full mx-auto">
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="relative flex-1 min-w-[240px] max-w-[320px]">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" placeholder="Search evidence packs..." className="w-full bg-[#1C1C1E] border border-[#27272a] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#00E5FF] transition-colors" />
            </div>
            <div className="flex bg-[#1C1C1E] p-1 rounded-lg border border-[#27272a]">
              <button className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#27272a] rounded-md shadow-sm">All</button>
              <button className="px-4 py-1.5 text-[12px] font-medium text-[#71717a] hover:text-white transition-colors">Executed</button>
              <button className="px-4 py-1.5 text-[12px] font-medium text-[#71717a] hover:text-white transition-colors">Forecast only</button>
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 mb-6">
            <h2 className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-2">What is this?</h2>
            <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
              Evidence packs are automatically generated for every trend. They contain the raw data, provenance logs, and math used to make the forecast and bid. Full accountability and transparency.
            </p>
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <div className="flex flex-col divide-y divide-[#27272a]">
              {packs.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-[#00E5FF]' : 'bg-[#52525b]'}`}></div>
                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[#71717a]">{item.size}</span>
                    <Link to="/evidence-packs/1" className="text-[11px] text-[#00E5FF] font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                      View Evidence
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
  );
}

export default EvidencePacks;
