import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1200px] w-full mx-auto">
          
          <div className="flex justify-between items-center mb-8 border-b border-[#27272a] pb-4">
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <div className="flex gap-4 text-sm font-medium">
               <span className="text-white border-b-2 border-[#00E5FF] pb-4 -mb-[17px]">General</span>
               <Link to="/billing" className="text-[#71717a] hover:text-white pb-4 -mb-[17px] transition-colors">Billing & Plans</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="flex flex-col gap-6">
              
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[11px] text-white font-bold tracking-widest uppercase">Profile</h2>
                  <button className="text-[11px] text-[#00E5FF] font-semibold hover:underline">Edit Profile</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-1">Name</div>
                    <div className="text-[14px] text-white">Alex Morgan</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-1">Role</div>
                    <div className="text-[14px] text-white">Admin</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-1">Email</div>
                    <div className="text-[14px] text-white">alex@acme.com</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
                <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-6">Organization details</h2>
                <div className="flex flex-col divide-y divide-[#27272a]">
                  <div className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-[13px] font-medium text-white mb-0.5">Data retention</h4>
                      <p className="text-[11px] text-[#71717a]">How long to store raw evidence packs</p>
                    </div>
                    <select className="bg-[#111113] border border-[#27272a] text-sm text-white rounded-md px-3 py-1.5 outline-none focus:border-[#00E5FF]">
                      <option>90 Days</option>
                      <option>180 Days</option>
                      <option>1 Year</option>
                    </select>
                  </div>
                  <div className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-[13px] font-medium text-white mb-0.5">API Keys</h4>
                      <p className="text-[11px] text-[#71717a]">Manage keys for external integrations</p>
                    </div>
                    <button className="text-[12px] font-medium text-[#00E5FF]">Manage</button>
                  </div>
                  <div className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-[13px] font-medium text-white mb-0.5">Webhooks</h4>
                      <p className="text-[11px] text-[#71717a]">Configure automated event triggers</p>
                    </div>
                    <button className="text-[12px] font-medium text-[#00E5FF]">Configure</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8">
              <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-6">Data sources</h2>
              <div className="flex flex-col gap-4">
                <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                    <span className="text-[13px] text-white">Reddit Firehose</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] uppercase font-bold">Connected</span>
                </div>
                <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                    <span className="text-[13px] text-white">Discord API</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] uppercase font-bold">Live</span>
                </div>
                <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 flex justify-between items-center opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#71717a]"></div>
                    <span className="text-[13px] text-white">TikTok Firehose</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] uppercase font-bold">Pending</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
  );
}

export default Settings;
