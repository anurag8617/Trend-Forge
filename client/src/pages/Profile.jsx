import React from 'react';

function Profile() {
  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[800px] w-full mx-auto">
          
          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-10">
              <img src="https://i.pravatar.cc/150?u=jane" alt="Jane Cooper" className="w-20 h-20 rounded-full border-2 border-[#27272a]" />
              <div>
                <h1 className="text-xl font-semibold text-white">Jane Cooper</h1>
                <p className="text-[13px] text-[#71717a]">jane@acme.com</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4 border-b border-[#27272a] pb-4">Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Full Name</label>
                  <input type="text" defaultValue="Jane Cooper" className="w-full bg-[#111113] border border-[#27272a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Role</label>
                  <input type="text" defaultValue="Admin" disabled className="w-full bg-[#111113] border border-[#27272a] rounded-lg px-4 py-2.5 text-sm text-[#71717a] cursor-not-allowed" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Email Address</label>
                  <input type="email" defaultValue="jane@acme.com" className="w-full bg-[#111113] border border-[#27272a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4 border-b border-[#27272a] pb-4">Security</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">Password</label>
                  <input type="password" defaultValue="****************" className="w-full bg-[#111113] border border-[#27272a] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">2-Factor Auth</label>
                  <div className="flex gap-4">
                    <input type="text" defaultValue="Phone (***) ***-1234" disabled className="flex-1 bg-[#111113] border border-[#27272a] rounded-lg px-4 py-2.5 text-sm text-[#71717a] cursor-not-allowed" />
                    <button className="px-6 py-2.5 text-[12px] font-semibold text-[#00E5FF] border border-[#00E5FF]/30 rounded-lg hover:bg-[#00E5FF]/10 transition-colors whitespace-nowrap">
                      Setup 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex justify-end">
              <button className="px-6 py-2.5 text-[12px] font-semibold text-black bg-[#00E5FF] rounded-lg hover:bg-cyan-400 transition-colors">
                Save Changes
              </button>
            </div>

          </div>

        </div>
      </>
  );
}

export default Profile;
