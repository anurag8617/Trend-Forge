import React from 'react';
import { Link } from 'react-router-dom';

function Billing() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1200px] w-full mx-auto">
          
          <div className="flex justify-between items-center mb-8 border-b border-[#27272a] pb-4">
            <h1 className="text-xl font-semibold text-white">Billing & Plans</h1>
            <div className="flex gap-4 text-sm font-medium">
               <Link to="/settings" className="text-[#71717a] hover:text-white pb-4 -mb-[17px] transition-colors">General</Link>
               <span className="text-white border-b-2 border-[#00E5FF] pb-4 -mb-[17px]">Billing & Plans</span>
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 mb-6">
            <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-6">Current usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between text-[12px] text-[#e4e4e7] mb-2">
                  <span>Signal queries</span>
                  <span className="text-[#00E5FF]">45k / 100k</span>
                </div>
                <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[12px] text-[#e4e4e7] mb-2">
                  <span>API calls</span>
                  <span className="text-[#00E5FF]">2.1M / 5.0M</span>
                </div>
                <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[42%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Starter Plan */}
            <div className="bg-[#1C1C1E] border border-[#27272a] rounded-xl p-6 flex flex-col">
              <h3 className="text-[16px] font-semibold text-white mb-1">Starter</h3>
              <div className="text-3xl font-medium text-white mb-4">$499<span className="text-sm text-[#71717a]"> / mo</span></div>
              <ul className="text-[13px] text-[#a1a1aa] space-y-3 mb-8 flex-1">
                <li>• 10k Signal queries</li>
                <li>• 500k API calls</li>
                <li>• Standard support</li>
              </ul>
              <button className="w-full border border-[#27272a] text-white font-semibold text-[13px] py-2 rounded-lg hover:bg-[#27272a] transition-colors">Downgrade</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#052e2e] border border-[#00E5FF] rounded-xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00E5FF]"></div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[16px] font-semibold text-white">Pro</h3>
                <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase bg-[#00E5FF]/10 px-2 py-0.5 rounded">Current</span>
              </div>
              <div className="text-3xl font-medium text-white mb-4">$2,499<span className="text-sm text-[#71717a]"> / mo</span></div>
              <ul className="text-[13px] text-[#a1a1aa] space-y-3 mb-8 flex-1">
                <li>• 100k Signal queries</li>
                <li>• 5.0M API calls</li>
                <li>• Priority support</li>
                <li>• Auto-bidding enabled</li>
              </ul>
              <button className="w-full border border-[#00E5FF] text-[#00E5FF] font-semibold text-[13px] py-2 rounded-lg opacity-50 cursor-default">Current Plan</button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#1C1C1E] border border-[#27272a] rounded-xl p-6 flex flex-col">
              <h3 className="text-[16px] font-semibold text-white mb-1">Enterprise</h3>
              <div className="text-3xl font-medium text-white mb-4">$10,000+<span className="text-sm text-[#71717a]"> / mo</span></div>
              <ul className="text-[13px] text-[#a1a1aa] space-y-3 mb-8 flex-1">
                <li>• Unlimited Signal queries</li>
                <li>• Unlimited API calls</li>
                <li>• Dedicated rep</li>
                <li>• Custom integrations</li>
              </ul>
              <button className="w-full border border-[#27272a] text-white font-semibold text-[13px] py-2 rounded-lg hover:bg-[#27272a] transition-colors">Contact Sales</button>
            </div>

          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4 border-b border-[#27272a] pb-4">Invoices</h2>
            <div className="flex flex-col divide-y divide-[#27272a]">
              {[
                { date: "May 1, 2026", amount: "$2,499.00", status: "Paid" },
                { date: "Apr 1, 2026", amount: "$2,499.00", status: "Paid" },
                { date: "Mar 1, 2026", amount: "$2,499.00", status: "Paid" }
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-[13px] font-medium text-white">{inv.date}</h4>
                    <p className="text-[11px] text-[#71717a]">{inv.amount} — {inv.status}</p>
                  </div>
                  <button className="text-[12px] font-medium text-[#00E5FF] border border-[#27272a] px-3 py-1.5 rounded hover:bg-[#27272a] transition-colors">Download</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </>
  );
}

export default Billing;
