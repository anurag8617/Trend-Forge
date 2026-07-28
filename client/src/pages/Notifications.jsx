import React from 'react';

function Notifications() {
  const notifs = [
    { title: "Expected volume drop in 'Quiet luxury fits'", desc: "Forecast models show a 12% drop in engagement momentum over the next 48 hours.", time: "2 hours ago", unread: true },
    { title: "Archival fashion - bot farm flagging active", desc: "Compliance scanners intercepted 2.4k bot-like activities on the current campaign.", time: "4 hours ago", unread: true },
    { title: "Dynamic bid execution - Cozy productivity", desc: "HoloBidder executed a $1.2k bid based on velocity metrics.", time: "1 day ago", unread: false },
    { title: "System Check - 100% SLA", desc: "All APIs and integrations are functioning correctly.", time: "2 days ago", unread: false },
  ];

  return (
    <>
        <div className="p-6 sm:p-8 flex-1 max-w-[1000px] w-full mx-auto">
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1">Notifications</h1>
              <p className="text-[12px] text-[#71717a]">2 unread • 1204 alerts over the past 30 days</p>
            </div>
            <button className="text-[12px] font-medium text-[#00E5FF] hover:underline">Mark all read</button>
          </div>

          <div className="flex bg-[#1C1C1E] p-1 rounded-lg border border-[#27272a] w-fit mb-6">
            <button className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#27272a] rounded-md shadow-sm">All</button>
            <button className="px-4 py-1.5 text-[12px] font-medium text-[#71717a] hover:text-white transition-colors">Forecasts</button>
            <button className="px-4 py-1.5 text-[12px] font-medium text-[#71717a] hover:text-white transition-colors">Compliance</button>
            <button className="px-4 py-1.5 text-[12px] font-medium text-[#71717a] hover:text-white transition-colors">Performance</button>
          </div>

          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <div className="flex flex-col divide-y divide-[#27272a]">
              {notifs.map((item, i) => (
                <div key={i} className={`flex items-start gap-4 py-5 group ${item.unread ? '' : 'opacity-70 hover:opacity-100 transition-opacity'}`}>
                  <div className="mt-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.unread ? 'bg-[#00E5FF]' : 'bg-[#52525b]'}`}></div>
                  </div>
                  <div>
                    <h4 className={`text-[14px] font-medium mb-1 ${item.unread ? 'text-white' : 'text-[#e4e4e7]'}`}>{item.title}</h4>
                    <p className="text-[13px] text-[#a1a1aa] mb-1.5 leading-relaxed">{item.desc}</p>
                    <p className="text-[11px] text-[#71717a]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-[12px] text-[#71717a] hover:text-white transition-colors">Load more notifications...</button>
            </div>
          </div>

        </div>
      </>
  );
}

export default Notifications;
