import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppContext';

const FORECASTS = [
  {
    id: 1,
    title: 'Mob-wife aesthetic',
    window: 'Peaks in ~12 hours',
    confidence: 88,
    caption: 'This is spreading incredibly fast. Expect a sharp peak very soon.',
    pathLine: 'M0 80 Q 25 50, 50 20 T 100 15',
    pathBand1: 'M0 90 Q 25 60, 50 30 T 100 20 L 100 100 L 0 100 Z',
    pathBand2: 'M0 70 Q 25 40, 50 10 T 100 10 L 100 100 L 0 100 Z',
    timeHours: 12
  },
  {
    id: 2,
    title: 'Y2K translucent hardware',
    window: 'Peaks in ~36 hours',
    confidence: 65,
    caption: 'This is expected to grow steadily and peak in about a day and a half.',
    pathLine: 'M0 90 Q 50 80, 75 40 T 100 30',
    pathBand1: 'M0 100 Q 50 90, 75 50 T 100 40 L 100 100 L 0 100 Z',
    pathBand2: 'M0 80 Q 50 70, 75 30 T 100 20 L 100 100 L 0 100 Z',
    timeHours: 36
  },
  {
    id: 3,
    title: 'Brutalist web revival',
    window: 'Peaks in ~4 days',
    confidence: 42,
    caption: 'A slow build-up that might reach its maximum spread later this week.',
    pathLine: 'M0 80 Q 30 75, 60 60 T 100 50',
    pathBand1: 'M0 90 Q 30 85, 60 70 T 100 60 L 100 100 L 0 100 Z',
    pathBand2: 'M0 70 Q 30 65, 60 50 T 100 40 L 100 100 L 0 100 Z',
    timeHours: 96
  }
];

const severityColors = {
  high: 'border-cyan-400 bg-cyan-400/5',
  medium: 'border-cyan-400/50 bg-cyan-400/5',
  low: 'border-cyan-400/20 bg-transparent'
};

export default function ForecastTimeline() {
  const sortedForecasts = [...FORECASTS].sort((a, b) => a.timeHours - b.timeHours);
  const navigate = useNavigate();
  const { openBuyWindow, addAuditLog } = useAppState();

  const handleCtaClick = (forecast: any, isHigh: boolean) => {
    if (isHigh) {
      openBuyWindow({ title: forecast.title, confidence: forecast.confidence });
      navigate('/dashboard');
    } else {
      addAuditLog('EVIDENCE_VIEWED', `Viewed evidence for forecast: ${forecast.title}`);
      navigate('/evidence');
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col gap-4 p-4 pl-6">
      <div className="flex-shrink-0">
        <h3 className="text-white font-medium text-sm">
          Here's what DARIA expects to happen next, ranked by how soon each one peaks
        </h3>
      </div>
      
      <div className="flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar pb-8">
        {sortedForecasts.map(forecast => {
          const isHigh = forecast.confidence >= 80;
          const severity = isHigh ? 'high' : forecast.confidence >= 60 ? 'medium' : 'low';
          
          return (
            <motion.div 
              key={forecast.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl border ${severityColors[severity]} flex flex-col gap-4 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <h3 className="text-white font-medium text-lg leading-tight">{forecast.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-cyan-400 font-semibold text-xs tracking-wider uppercase">
                      {forecast.window}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-light ${isHigh ? 'text-white' : 'text-gray-300'}`}>
                    {forecast.confidence}%
                  </span>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Confidence</div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="w-full h-24 relative overflow-hidden rounded-lg bg-black/40 mt-2 z-10 border border-white/5">
                <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d={forecast.pathBand1} fill="rgba(34, 211, 238, 0.05)" />
                  <path d={forecast.pathBand2} fill="rgba(34, 211, 238, 0.1)" />
                  <path d={forecast.pathLine} fill="none" className="stroke-cyan-400" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              <div className="flex justify-between items-end z-10 relative mt-2">
                <p className="text-gray-400 text-sm max-w-[70%] leading-relaxed">
                  {forecast.caption}
                </p>
                
                <button 
                  onClick={() => handleCtaClick(forecast, isHigh)}
                  className={`px-4 py-2 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isHigh 
                    ? 'bg-cyan-400 text-background hover:bg-cyan-300' 
                    : 'border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                }`}>
                  {isHigh ? 'Review buy window' : 'View evidence'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
