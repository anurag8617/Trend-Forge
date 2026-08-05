import { useState } from 'react';
import { 
  AdminCard, AdminSection, SectionHeader, 
  StatusBadge, HealthIndicator, SeverityPill, 
  PrimaryButton, SecondaryButton, DangerButton,
  MetricCard, StatGrid, AuditTimeline, LogViewer, KPIBlock, 
  PageTemplate, ActivityPanelTemplate
} from '../components/ui';

export default function Engines() {
  const [activeEngine, setActiveEngine] = useState('Overview');

  const navItems = [
    { id: 'Overview', label: 'Global Overview', version: 'v5.12', health: 'Optimal' },
    { id: 'Ghost Mode', label: 'Ghost Mode', version: 'v2.1.0', health: 'Healthy' },
    { id: 'Quantum Guess', label: 'Quantum Guess', version: 'v3.0.4', health: 'Warning' },
    { id: 'Bio-Feel', label: 'Bio-Feel', version: 'v1.4.2', health: 'Healthy' },
    { id: 'DisinfoDefender', label: 'DisinfoDefender', version: 'v2.8.1', health: 'Healthy' },
    { id: 'HoloBidder', label: 'HoloBidder', version: 'v4.1.0', health: 'Healthy' }
  ];

  const engineLogs = [
    'INFO [Core] Initialization sequence started',
    'INFO [API] Connected to external DSP gateway',
    'WARN [Queue] Backpressure detected on stream A',
    'INFO [Worker] Thread pool scaled to 64',
    'ERROR [Model] Timeout during inference step',
    'INFO [Recover] Automated retry successful'
  ];

  const events = [
    { time: '12:00 PM', user: 'system', action: 'RESTART', detail: 'Automated health-check restart' },
    { time: '11:45 AM', user: 'j.doe', action: 'CONFIG', detail: 'Updated threshold parameters' },
    { time: '09:30 AM', user: 'admin_sys', action: 'DEPLOY', detail: 'Pushed v2.4.1 to production' },
  ];

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <AdminSection title="Engine Fleet Health">
        <StatGrid>
          <MetricCard title="Running Jobs" value="2.4M" trend={{ value: '+12%', isPositive: true }} />
          <MetricCard title="Average Latency" value="42ms" trend={{ value: '-5ms', isPositive: true }} />
          <MetricCard title="Queued Tasks" value="1,842" trend={{ value: '+142', isPositive: false }} />
          <MetricCard title="Deployments (24h)" value="4" />
        </StatGrid>
      </AdminSection>

      <AdminSection title="Engine Fleet">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navItems.filter(n => n.id !== 'Overview').map(eng => (
            <AdminCard 
              key={eng.id} 
              className="p-6 flex flex-col cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20" 
              onClick={() => setActiveEngine(eng.id)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:text-primary transition-colors group-hover:shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-lg group-hover:text-primary transition-colors">{eng.label}</h4>
                    <span className="text-xs font-mono text-muted">{eng.version}</span>
                  </div>
                </div>
                <HealthIndicator status={eng.health as any} />
              </div>
              <div className="mt-auto grid grid-cols-2 gap-4 text-xs">
                <div className="bg-surface/30 p-3 rounded-xl border border-border/50">
                  <span className="text-muted block mb-1">CPU Utilization</span>
                  <span className="font-mono text-text text-base font-semibold">42%</span>
                </div>
                <div className="bg-surface/30 p-3 rounded-xl border border-border/50">
                  <span className="text-muted block mb-1">Task Queue</span>
                  <span className="font-mono text-text text-base font-semibold">0</span>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Recent Failures">
        <AdminCard className="p-0 border-danger/20 overflow-hidden shadow-lg shadow-danger/5">
          <div className="bg-danger/5 flex flex-col divide-y divide-danger/10">
            <div className="text-sm px-6 py-5 flex justify-between items-center group hover:bg-danger/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="font-bold text-danger text-base">HoloBidder</span>
                <span className="text-textSecondary">Connection Timeout (Exchange A)</span>
              </div>
              <span className="text-xs font-mono text-muted">14m ago</span>
            </div>
            <div className="text-sm px-6 py-5 flex justify-between items-center group hover:bg-danger/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <span className="font-bold text-warning text-base">Bio-Feel</span>
                <span className="text-textSecondary">GPU Memory Exhaustion (Recovered)</span>
              </div>
              <span className="text-xs font-mono text-muted">2h ago</span>
            </div>
          </div>
        </AdminCard>
      </AdminSection>
    </div>
  );

  const renderGhostModeMetrics = () => (
    <StatGrid>
      <MetricCard title="Ingestion Sources" value="142 Active" />
      <MetricCard title="Detection Rate" value="12.4k/s" trend={{ value: '+4%', isPositive: true }} />
      <MetricCard title="Processing Time" value="18ms" trend={{ value: '-2ms', isPositive: true }} />
      <MetricCard title="Signal Queue" value="0" />
    </StatGrid>
  );

  const renderGhostModeConfig = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminCard className="p-8 hover:border-primary/30 transition-colors shadow-sm">
          <KPIBlock label="Pipeline Status" value="Healthy" />
          <div className="mt-4 text-sm text-textSecondary leading-relaxed">The ingestion pipeline is running at optimal capacity with no backpressure. Real-time buffers are well below thresholds.</div>
        </AdminCard>
        <AdminCard className="p-8 hover:border-primary/30 transition-colors shadow-sm">
          <KPIBlock label="Raw Feed Status" value="Streaming" />
          <div className="mt-4 text-sm text-textSecondary leading-relaxed">Connected to 12 distinct firehoses without interruption. Last reconnect was 14 days ago.</div>
        </AdminCard>
      </div>
      <AdminCard className="p-8 border-warning/30 bg-warning/5 relative overflow-hidden shadow-lg shadow-warning/5">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-warning" />
        <h4 className="text-lg font-bold text-text mb-2">Threshold Controls</h4>
        <p className="text-sm text-textSecondary mb-8 max-w-2xl leading-relaxed">Modify the engine's sensitivity to market noise. Changes take effect immediately across all ingestion streams and will generate a compliance audit trail.</p>
        <div className="flex flex-wrap gap-4">
          <SecondaryButton disabled className="bg-surface/50 px-6 py-3">Update Velocity Sensitivity</SecondaryButton>
          <SecondaryButton disabled className="bg-surface/50 px-6 py-3">Adjust Noise Floor</SecondaryButton>
        </div>
      </AdminCard>
    </>
  );

  const renderQuantumGuessMetrics = () => (
    <StatGrid>
      <MetricCard title="Inference Latency" value="84ms" trend={{ value: '+12ms', isPositive: false }} />
      <MetricCard title="Prediction Queue" value="1,204" />
      <MetricCard title="Model Drift" value="1.2%" />
      <MetricCard title="Training Status" value="Idle" />
    </StatGrid>
  );

  const renderQuantumGuessConfig = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AdminCard className="col-span-2 p-8 border-border flex flex-col justify-between shadow-sm">
        <div>
          <h4 className="text-lg font-bold mb-2 text-text">Model Operations</h4>
          <p className="text-sm text-textSecondary mb-8 leading-relaxed max-w-xl">Trigger manual recalibration if drift exceeds 5%. Emergency rollback will safely revert to the previous verified weights without dropping current queue items.</p>
        </div>
        <div className="flex space-x-4">
          <SecondaryButton disabled className="px-6 py-3">Trigger Calibration</SecondaryButton>
          <DangerButton disabled className="shadow-lg shadow-danger/20 px-6 py-3">Emergency Rollback</DangerButton>
        </div>
      </AdminCard>
      <AdminCard className="col-span-1 p-8 flex flex-col items-center justify-center text-center shadow-sm">
        <KPIBlock label="Confidence Distribution" value="Bimodal" />
        <p className="text-xs text-muted mt-4 mt-auto">Awaiting recalibration to smooth curve</p>
      </AdminCard>
    </div>
  );

  const renderBioFeelMetrics = () => (
    <StatGrid>
      <MetricCard title="Sentiment Pipeline" value="Operational" />
      <MetricCard title="Emotion Model" value="v3.1 loaded" />
      <MetricCard title="Processing Queue" value="45" />
      <MetricCard title="Language Models" value="8 Active" />
    </StatGrid>
  );

  const renderBioFeelConfig = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <AdminCard className="p-8 shadow-sm"><KPIBlock label="Noise Filter Status" value="Aggressive" /></AdminCard>
      <AdminCard className="p-8 shadow-sm"><KPIBlock label="Normalization Status" value="Stable" /></AdminCard>
    </div>
  );

  const renderDisinfoDefenderMetrics = () => (
    <StatGrid>
      <MetricCard title="Compliance Engine" value="Strict Mode" />
      <MetricCard title="Risk Scanner" value="Active" />
      <MetricCard title="Blocked Campaigns" value="1,402" trend={{ value: '+24', isPositive: true }} />
      <MetricCard title="Rule Engine" value="Synced" />
    </StatGrid>
  );

  const renderDisinfoDefenderConfig = () => (
    <>
      <AdminCard className="p-8 bg-danger/5 border-danger/30 relative overflow-hidden shadow-lg shadow-danger/10">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-danger" />
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
          <div>
            <KPIBlock label="Global Threat Level" value="ELEVATED" />
            <p className="text-sm text-textSecondary mt-3 max-w-xl leading-relaxed">Multiple coordinated campaigns detected in the last hour. Defensive perimeters automatically tightened.</p>
          </div>
          <DangerButton disabled className="w-full md:w-auto shrink-0 shadow-lg shadow-danger/20 py-4 px-10 text-base tracking-wider font-bold">ENGAGE KILL SWITCH</DangerButton>
        </div>
      </AdminCard>
      <div className="flex flex-col sm:flex-row gap-6">
        <SecondaryButton className="flex-1 justify-center py-4 text-base" disabled>Manage Blacklist</SecondaryButton>
        <SecondaryButton className="flex-1 justify-center py-4 text-base" disabled>Manage Whitelist</SecondaryButton>
      </div>
    </>
  );

  const renderHoloBidderMetrics = () => (
    <StatGrid>
      <MetricCard title="DSP Connections" value="12/12 Up" />
      <MetricCard title="Bid Rate" value="4.2k / sec" />
      <MetricCard title="Execution Queue" value="0" />
      <MetricCard title="Spend Ceiling" value="$1M / hr" />
    </StatGrid>
  );

  const renderHoloBidderConfig = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminCard className="p-8 shadow-sm"><KPIBlock label="Execution Status" value="Throttled" /></AdminCard>
        <AdminCard className="p-8 shadow-sm"><KPIBlock label="Connection Health" value="Stable" /></AdminCard>
      </div>
      <AdminCard className="p-8 border-warning/30 bg-warning/5 relative overflow-hidden shadow-lg shadow-warning/10">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-warning" />
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
          <div>
            <h4 className="text-lg font-bold text-text mb-2">Circuit Breaker</h4>
            <p className="text-sm text-textSecondary max-w-xl leading-relaxed">Halts all algorithmic bidding immediately across all connected DSPs. Requires manual override by a Super Admin to resume.</p>
          </div>
          <DangerButton disabled className="w-full md:w-auto shrink-0 shadow-lg shadow-danger/20 py-4 px-10 text-base font-bold">TRIP BREAKER</DangerButton>
        </div>
      </AdminCard>
    </>
  );

  return (
    <PageTemplate
      breadcrumbItems={[{ label: 'Admin', href: '/admin' }, { label: 'Engines' }, { label: activeEngine }]}
      title={activeEngine === 'Overview' ? 'Engine Fleet' : activeEngine}
      tabs={navItems}
      activeTab={activeEngine}
      onTabChange={setActiveEngine}
      headerAction={
        activeEngine !== 'Overview' ? (
          <div className="flex space-x-4">
            <SecondaryButton disabled className="border-border hover:border-text/50">Restart Engine</SecondaryButton>
            <PrimaryButton disabled>Configure Engine</PrimaryButton>
          </div>
        ) : undefined
      }
    >
      {activeEngine !== 'Overview' && (
         <div className="flex flex-wrap gap-6 items-center -mt-2 mb-10 animate-in fade-in duration-500 bg-surface/30 p-4 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Status</span>
              <StatusBadge status="Running" />
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Environment</span>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">Production</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Owner Team</span>
              <span className="text-sm font-semibold text-text">Core ML Team</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Version</span>
              <span className="text-sm font-mono text-text bg-background px-2 py-1 rounded border border-border/50">{navItems.find(n => n.id === activeEngine)?.version || 'v2.1.0'}</span>
            </div>
         </div>
      )}
      
      {activeEngine === 'Overview' ? renderOverview() : (
         <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
           {/* Metric Cards */}
           {activeEngine === 'Ghost Mode' && renderGhostModeMetrics()}
           {activeEngine === 'Quantum Guess' && renderQuantumGuessMetrics()}
           {activeEngine === 'Bio-Feel' && renderBioFeelMetrics()}
           {activeEngine === 'DisinfoDefender' && renderDisinfoDefenderMetrics()}
           {activeEngine === 'HoloBidder' && renderHoloBidderMetrics()}
           
           {/* Runtime Health & Infrastructure Dependencies */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AdminCard className="p-8 shadow-sm">
                <SectionHeader title="Resource Usage & Health" />
                <div className="grid grid-cols-2 gap-8 mt-6">
                  <KPIBlock label="Memory Allocation" value="4.2 GB" />
                  <KPIBlock label="CPU Utilization" value="42%" />
                  <KPIBlock label="Active Queue Depth" value="0" />
                  <KPIBlock label="Processing Latency" value="14ms" />
                </div>
              </AdminCard>
              
              <AdminCard className="p-8 shadow-sm">
                <SectionHeader title="Infrastructure Dependencies" />
                <div className="space-y-5 mt-6">
                  <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/60">
                    <span className="font-medium text-textSecondary text-base">Redis Cluster</span>
                    <SeverityPill level="Low" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/60">
                     <span className="font-medium text-textSecondary text-base">PostgreSQL Database</span>
                     <div className="flex items-center gap-2.5"><div className="w-3 h-3 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div><span className="text-muted font-medium">Operational</span></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/60">
                     <span className="font-medium text-textSecondary text-base">Kafka Event Stream</span>
                     <div className="flex items-center gap-2.5"><div className="w-3 h-3 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div><span className="text-muted font-medium">Operational</span></div>
                  </div>
                </div>
              </AdminCard>
           </div>
           
           {/* Configuration & Operational Actions */}
           {activeEngine === 'Ghost Mode' && renderGhostModeConfig()}
           {activeEngine === 'Quantum Guess' && renderQuantumGuessConfig()}
           {activeEngine === 'Bio-Feel' && renderBioFeelConfig()}
           {activeEngine === 'DisinfoDefender' && renderDisinfoDefenderConfig()}
           {activeEngine === 'HoloBidder' && renderHoloBidderConfig()}
           
           {/* Recent Logs & Activity Timeline */}
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <AdminCard className="p-8 shadow-sm h-full flex flex-col">
                <SectionHeader title="Recent Engine Logs" />
                <div className="mt-6 rounded-xl overflow-hidden border border-border/80 shadow-inner flex-1 bg-[#0d0d0d]">
                  <LogViewer logs={engineLogs} />
                </div>
              </AdminCard>
              <AdminCard className="p-8 shadow-sm h-full flex flex-col">
                <SectionHeader title="Operational Timeline" />
                <div className="mt-6 flex-1">
                  <AuditTimeline events={events} />
                </div>
              </AdminCard>
           </div>
         </div>
      )}

      <div className="mt-16 flex-1 flex flex-col justify-end">
        <ActivityPanelTemplate 
          title="Recent Engine Events"
          timeline={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1 border border-border/50 p-6 rounded-2xl bg-surface/40 hover:bg-surface hover:border-primary/30 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-5 text-muted uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
                  Deployments
                </h5>
                <ul className="space-y-5">
                  <li className="flex flex-col"><span className="text-xs font-mono text-muted mb-1">10:00 AM</span><span className="text-sm font-semibold text-text">v2.4.1 Shipped</span></li>
                  <li className="flex flex-col"><span className="text-xs font-mono text-muted mb-1">Yesterday</span><span className="text-sm font-medium text-textSecondary">v2.4.0 Shipped</span></li>
                </ul>
              </div>
              <div className="col-span-1 border border-border/50 p-6 rounded-2xl bg-surface/40 hover:bg-surface hover:border-warning/30 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-5 text-muted uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Restarts
                </h5>
                <ul className="space-y-5">
                  <li className="flex flex-col"><span className="text-xs font-mono text-muted mb-1">12:00 PM</span><span className="text-sm font-semibold text-text">Bio-Feel (Auto)</span></li>
                  <li className="flex flex-col"><span className="text-xs font-mono text-muted mb-1">04:00 AM</span><span className="text-sm font-medium text-textSecondary">HoloBidder (Manual)</span></li>
                </ul>
              </div>
              <div className="col-span-2 border border-danger/20 p-6 rounded-2xl bg-danger/5 hover:bg-danger/10 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-5 text-danger uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Warnings & Failures
                </h5>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3 text-danger">
                    <span className="text-[10px] font-mono font-bold mt-1 bg-danger/20 px-2 py-0.5 rounded">WARN</span>
                    <span className="text-sm font-medium leading-relaxed">Redis latency spike detected in Quantum Guess. Connection pool auto-scaled to compensate.</span>
                  </li>
                  <li className="flex items-start gap-3 text-danger">
                    <span className="text-[10px] font-mono font-bold mt-1 bg-danger/20 px-2 py-0.5 rounded">ERROR</span>
                    <span className="text-sm font-medium leading-relaxed">External API timeout in DisinfoDefender. Dropped 14 requests before recovery.</span>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    </PageTemplate>
  );
}
