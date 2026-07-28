import React from 'react';

function EmptyState() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-center max-w-[800px] w-full mx-auto text-center h-full">
          
          <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-6 relative">
            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 animate-ping absolute"></div>
            <div className="w-3 h-3 rounded-full bg-[#00E5FF] relative z-10 shadow-[0_0_15px_rgba(0,229,255,0.8)]"></div>
          </div>

          <h2 className="text-[16px] font-semibold text-white mb-3">Hold tight. We're tracking 3.2M data points for you.</h2>
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed max-w-[500px] mb-10">
            It typically takes around 2-3 hours to establish a baseline for a new project. We are scanning TikTok, Instagram, and Reddit for anomalies.
          </p>

          <div className="bg-[#1C1C1E] border border-[#27272a] rounded-xl p-6 w-full max-w-[500px] text-left">
            <h3 className="text-[11px] text-[#71717a] font-bold tracking-widest uppercase mb-4">What's happening right now?</h3>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 border-2 border-[#00E5FF]/30 border-t-[#00E5FF] rounded-full animate-spin"></div>
              <span className="text-[13px] text-[#e4e4e7]">Scanning for anomalies in fashion and beauty...</span>
            </div>
          </div>

        </div>
      </>
  );
}

export default EmptyState;
