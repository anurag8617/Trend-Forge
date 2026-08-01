import React, { useState, useEffect } from 'react';
import { useAppState } from '../state/AppContext';
import { EngineGlyphs } from '../components/EngineGlyph';
import { Link, useNavigate } from 'react-router-dom';

type FilterType = 'All' | 'Signals' | 'Buy Decisions' | 'Compliance';

const formatRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-5 h-5 text-[#26E7FF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const getActionDetails = (action: string) => {
  switch (action) {
    case 'SYSTEM_START':
      return { title: 'System initialized', icon: <div className="w-5 h-5 rounded-full border-2 border-gray-500" /> };
    case 'ALERT_TRIGGERED':
      return { title: 'Signal detected', icon: <IconWrapper>{EngineGlyphs.ghost}</IconWrapper> };
    case 'BUY_WINDOW_DELEGATED':
      return { title: 'Delegated a buy decision to HoloBidder', icon: <IconWrapper>{EngineGlyphs.holo}</IconWrapper> };
    case 'BUY_WINDOW_CONFIRMED':
      return { title: 'Confirmed a buy window directly', icon: <IconWrapper>{EngineGlyphs.holo}</IconWrapper> };
    case 'BID_EXECUTING':
      return { title: 'Executing bid', icon: <IconWrapper>{EngineGlyphs.holo}</IconWrapper> };
    case 'BID_COMPLETED':
      return { title: 'Bid completed', icon: <IconWrapper>{EngineGlyphs.holo}</IconWrapper> };
    case 'COMPLIANCE_STATE_CHANGED':
      return { title: 'Updated compliance settings', icon: <IconWrapper>{EngineGlyphs.disinfo}</IconWrapper> };
    case 'EVIDENCE_EXPORTED':
      return { title: 'Exported evidence pack', icon: <svg className="w-5 h-5 text-[#26E7FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg> };
    case 'USER_LOGIN':
      return { title: 'User logged in', icon: <div className="w-5 h-5 rounded-full bg-[#26E7FF] opacity-50" /> };
    case 'USER_REGISTERED':
      return { title: 'New user registered', icon: <div className="w-5 h-5 rounded-full bg-[#26E7FF] opacity-50" /> };
    default:
      return { title: action.replace(/_/g, ' ').toLowerCase(), icon: <div className="w-5 h-5 rounded-full border-2 border-gray-500" /> };
  }
};

const getFilterForAction = (action: string): FilterType | null => {
  if (['ALERT_TRIGGERED'].includes(action)) return 'Signals';
  if (['BUY_WINDOW_DELEGATED', 'BUY_WINDOW_CONFIRMED', 'BID_EXECUTING', 'BID_COMPLETED'].includes(action)) return 'Buy Decisions';
  if (['COMPLIANCE_STATE_CHANGED'].includes(action)) return 'Compliance';
  return null;
};

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export default function History() {
  const { auditLogs } = useAppState();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<'All Time' | 'Today' | 'Last 7 Days'>('All Time');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, timeframe]);

  const totalSignals = auditLogs.filter(l => l.action === 'ALERT_TRIGGERED').length;
  const totalBuys = auditLogs.filter(l => ['BUY_WINDOW_DELEGATED', 'BUY_WINDOW_CONFIRMED'].includes(l.action)).length;

  const filteredLogs = auditLogs.filter(log => {
    if (activeFilter !== 'All' && getFilterForAction(log.action) !== activeFilter) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const { title } = getActionDetails(log.action);
      if (
        !log.action.toLowerCase().includes(q) &&
        !log.detail.toLowerCase().includes(q) &&
        !title.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (timeframe !== 'All Time') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const diffMs = now.getTime() - logDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (timeframe === 'Today' && diffDays > 1) return false;
      if (timeframe === 'Last 7 Days' && diffDays > 7) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex-1 min-h-full mx-auto pt-4 pb-12  text-white overflow-y-auto font-sans ">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-2xl font-bold mb-2 text-white">History</h1>
          <p className="text-[#8A8F98] text-sm">
            Every action DARIA has taken, so you can see exactly what happened and why.
          </p>
        </header>

        {/* Track Record */}
        <section className="bg-[#111113] border border-[#2C2D32] rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Track Record</h2>
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold text-[#26E7FF] mb-1">{totalSignals}</div>
              <div className="text-xs text-[#8A8F98] uppercase tracking-widest font-semibold">Signals Detected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#26E7FF] mb-1">{totalBuys}</div>
              <div className="text-xs text-[#8A8F98] uppercase tracking-widest font-semibold">Buy Actions Taken</div>
            </div>
          </div>
        </section>

        {/* Advanced Filters */}
        <div className="bg-[#111113] border border-[#2C2D32] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Signals', 'Buy Decisions', 'Compliance'] as FilterType[]).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === filter 
                    ? 'bg-[#26E7FF]/10 text-[#26E7FF] border border-[#26E7FF]/30' 
                    : 'bg-[#18191C] text-[#8A8F98] border border-[#2C2D32] hover:bg-[#2C2D32] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-9 pr-4 py-2 bg-[#18191C] border border-[#2C2D32] rounded-lg text-xs text-white placeholder-[#8A8F98] focus:outline-none focus:border-[#26E7FF] transition-colors"
              />
            </div>
            
            {/* Timeframe Dropdown */}
            <div className="relative shrink-0">
              <select 
                value={timeframe}
                onChange={e => setTimeframe(e.target.value as any)}
                className="pl-3 pr-8 py-2 bg-[#18191C] border border-[#2C2D32] rounded-lg text-xs text-[#8A8F98] focus:outline-none focus:border-[#26E7FF] transition-colors appearance-none cursor-pointer outline-none"
              >
                <option value="All Time">All Time</option>
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8A8F98] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="bg-[#111113] border border-[#2C2D32] rounded-xl p-12 text-center text-[#8A8F98]">
              No activity yet — this page fills in as DARIA takes action.
            </div>
          ) : (
            <>
              {paginatedLogs.map(log => {
                const { title, icon } = getActionDetails(log.action);
                return (
                  <div 
                    key={log.id} 
                    className="bg-[#111113] border border-[#2C2D32] rounded-xl p-5 flex items-start gap-4 hover:border-[#26E7FF]/30 transition-colors cursor-pointer group"
                    onClick={() => navigate('/evidence', { state: { openId: log.evidencePackId } })}
                  >
                    <div className="mt-1 bg-[#18191C] p-2 rounded-lg border border-[#2C2D32] group-hover:border-[#26E7FF]/30 transition-colors">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="text-sm font-medium text-white flex items-center gap-2">
                            {title}
                            {log.evidencePackId && (
                              <span className="text-xs text-[#26E7FF] font-medium border border-[#26E7FF]/30 px-2 py-0.5 rounded-full bg-[#26E7FF]/10">
                                View evidence
                              </span>
                            )}
                          </h3>
                        </div>
                        <span 
                          className="text-xs text-[#8A8F98] whitespace-nowrap" 
                          title={new Date(log.timestamp).toLocaleString()}
                        >
                          {formatRelativeTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-[#8A8F98]">{log.detail}</p>
                    </div>
                  </div>
                );
              })}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#2C2D32]">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#18191C] border border-[#2C2D32] text-[#8A8F98] rounded-lg hover:bg-[#2C2D32] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors font-medium"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {generatePagination(currentPage, totalPages).map((page, idx) => (
                      <React.Fragment key={idx}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-[#8A8F98] text-xs">...</span>
                        ) : (
                          <button
                            onClick={() => setCurrentPage(page as number)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                              currentPage === page 
                                ? 'bg-[#26E7FF]/10 text-[#26E7FF] border-[#26E7FF]/30' 
                                : 'bg-[#18191C] text-[#8A8F98] border-[#2C2D32] hover:bg-[#2C2D32] hover:text-white'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#18191C] border border-[#2C2D32] text-[#8A8F98] rounded-lg hover:bg-[#2C2D32] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}
