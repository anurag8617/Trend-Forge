import { motion } from 'framer-motion';
import { colors, typography } from '../lib/tokens';

const TIERS = [
  {
    name: 'DARIA Core',
    price: 'Included',
    description: 'Prediction is subscription. Baseline intelligence and anomaly scanning.',
    features: ['Daily intelligence briefing', 'Natural-language command layer', '30-day memory', 'Alert escalation', 'Compliance confirmation'],
    isActive: true,
  },
  {
    name: 'DARIA Pro',
    price: '+$750 / mo',
    description: 'Extended foresight and proactive execution mapping.',
    features: ['12-month memory', 'Proactive bid recommendations', 'Competitor monitoring', 'Creative performance intelligence', 'Cross-channel CTV planner'],
    isActive: false,
  },
  {
    name: 'DARIA Autonomous',
    price: '+$2,000 / mo',
    description: 'Autonomous execution is consumption. Revenue tracks value.',
    features: ['Guardrailed autonomous execution', 'Agent-to-agent trading (AdCP / ARTF)', 'Multimodal brief upload', 'White-label persona'],
    isActive: false,
  }
];

export default function Billing() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full max-w-6xl mx-auto pt-4 pb-12"
    >
      <div className="mb-8 border-b border-border pb-6">
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Workspace</h2>
        <h1 className="text-4xl font-light tracking-tight text-white">Billing & Plans</h1>
        <p className={`${typography.textTertiary} mt-2 text-sm`}>
          Manage your TrendForge subscription and execution consumption limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <div 
            key={tier.name} 
            className={`p-8 rounded-xl border flex flex-col relative overflow-hidden transition-colors ${
              tier.isActive 
                ? 'bg-surface/20 border-accent shadow-[0_0_30px_rgb(var(--theme-accent-rgb)_/_0.05)]' 
                : 'bg-background border-border hover:border-border/80'
            }`}
          >
            {tier.isActive && (
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-white">{tier.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-light text-white">{tier.price}</span>
              </div>
              <p className={`${typography.textSecondary} text-sm leading-relaxed h-10`}>
                {tier.description}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 border-t border-border pt-6">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className={`w-4 h-4 shrink-0 mt-0.5 ${tier.isActive ? colors.accentText : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`${typography.textSecondary} text-sm`}>{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className={`mt-8 w-full py-3 rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                tier.isActive 
                  ? 'bg-surface text-white cursor-default' 
                  : 'bg-transparent border border-border text-white hover:bg-surface/50'
              }`}
            >
              {tier.isActive ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}