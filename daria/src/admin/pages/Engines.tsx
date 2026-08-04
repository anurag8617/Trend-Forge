import React, { useState } from 'react';
import { 
  AdminCard, AdminSection, PageHeader, SectionHeader, 
  StatusBadge, HealthIndicator, SeverityPill, 
  PrimaryButton, SecondaryButton, DangerButton,
  MetricCard, StatGrid, AuditTimeline, LogViewer, KPIBlock, 
  WorkspaceLayoutTemplate, PageTemplate, InspectorTemplate, ActivityPanelTemplate
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
              className="p-5 flex flex-col cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20" 
              onClick={() => setActiveEngine(eng.id)}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:text-primary transition-colors group-hover:shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text group-hover:text-primary transition-colors">{eng.label}</h4>
                    <span className="text-xs font-mono text-muted">{eng.version}</span>
                  </div>
                </div>
                <HealthIndicator status={eng.health as any} />
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3 text-xs">
                <div className="bg-surface/30 p-2.5 rounded-lg border border-border/50">
                  <span className="text-muted block mb-1">CPU Utilization</span>
                  <span className="font-mono text-text text-sm">42%</span>
                </div>
                <div className="bg-surface/30 p-2.5 rounded-lg border border-border/50">
                  <span className="text-muted block mb-1">Task Queue</span>
                  <span className="font-mono text-text text-sm">0</span>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      </AdminSection>

      <AdminSection title="Recent Failures">
        <AdminCard className="p-0 border-danger/20 overflow-hidden shadow-lg shadow-danger/5">
          <div className="bg-danger/5 flex flex-col divide-y divide-danger/10">
            <div className="text-sm px-5 py-4 flex justify-between items-center group hover:bg-danger/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="font-bold text-danger text-base">HoloBidder</span>
                <span className="text-textSecondary">Connection Timeout (Exchange A)</span>
              </div>
              <span className="text-xs font-mono text-muted">14m ago</span>
            </div>
            <div className="text-sm px-5 py-4 flex justify-between items-center group hover:bg-danger/10 transition-colors">
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

  const renderGhostMode = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StatGrid>
        <MetricCard title="Ingestion Sources" value="142 Active" />
        <MetricCard title="Detection Rate" value="12.4k/s" trend={{ value: '+4%', isPositive: true }} />
        <MetricCard title="Processing Time" value="18ms" trend={{ value: '-2ms', isPositive: true }} />
        <MetricCard title="Signal Queue" value="0" />
      </StatGrid>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard className="p-6 hover:border-primary/30 transition-colors shadow-sm">
          <KPIBlock label="Pipeline Status" value="Healthy" />
          <div className="mt-4 text-sm text-textSecondary leading-relaxed">The ingestion pipeline is running at optimal capacity with no backpressure. Real-time buffers are well below thresholds.</div>
        </AdminCard>
        <AdminCard className="p-6 hover:border-primary/30 transition-colors shadow-sm">
          <KPIBlock label="Raw Feed Status" value="Streaming" />
          <div className="mt-4 text-sm text-textSecondary leading-relaxed">Connected to 12 distinct firehoses without interruption. Last reconnect was 14 days ago.</div>
        </AdminCard>
      </div>
      <AdminCard className="p-8 border-warning/30 bg-warning/5 relative overflow-hidden shadow-lg shadow-warning/5">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-warning" />
        <h4 className="text-lg font-bold text-text mb-2">Threshold Controls</h4>
        <p className="text-sm text-textSecondary mb-8 max-w-2xl leading-relaxed">Modify the engine's sensitivity to market noise. Changes take effect immediately across all ingestion streams and will generate a compliance audit trail.</p>
        <div className="flex flex-wrap gap-4">
          <SecondaryButton disabled className="bg-surface/50">Update Velocity Sensitivity</SecondaryButton>
          <SecondaryButton disabled className="bg-surface/50">Adjust Noise Floor</SecondaryButton>
        </div>
      </AdminCard>
    </div>
  );

  const renderQuantumGuess = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StatGrid>
        <MetricCard title="Inference Latency" value="84ms" trend={{ value: '+12ms', isPositive: false }} />
        <MetricCard title="Prediction Queue" value="1,204" />
        <MetricCard title="Model Drift" value="1.2%" />
        <MetricCard title="Training Status" value="Idle" />
      </StatGrid>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard className="col-span-2 p-8 border-border flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="text-lg font-bold mb-2 text-text">Model Operations</h4>
            <p className="text-sm text-textSecondary mb-8 leading-relaxed max-w-xl">Trigger manual recalibration if drift exceeds 5%. Emergency rollback will safely revert to the previous verified weights without dropping current queue items.</p>
          </div>
          <div className="flex space-x-4">
            <SecondaryButton disabled>Trigger Calibration</SecondaryButton>
            <DangerButton disabled className="shadow-lg shadow-danger/20">Emergency Rollback</DangerButton>
          </div>
        </AdminCard>
        <AdminCard className="col-span-1 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <KPIBlock label="Confidence Distribution" value="Bimodal" />
          <p className="text-xs text-muted mt-4 mt-auto">Awaiting recalibration to smooth curve</p>
        </AdminCard>
      </div>
    </div>
  );

  const renderBioFeel = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StatGrid>
        <MetricCard title="Sentiment Pipeline" value="Operational" />
        <MetricCard title="Emotion Model" value="v3.1 loaded" />
        <MetricCard title="Processing Queue" value="45" />
        <MetricCard title="Language Models" value="8 Active" />
      </StatGrid>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard className="p-6 shadow-sm"><KPIBlock label="Noise Filter Status" value="Aggressive" /></AdminCard>
        <AdminCard className="p-6 shadow-sm"><KPIBlock label="Normalization Status" value="Stable" /></AdminCard>
      </div>
    </div>
  );

  const renderDisinfoDefender = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StatGrid>
        <MetricCard title="Compliance Engine" value="Strict Mode" />
        <MetricCard title="Risk Scanner" value="Active" />
        <MetricCard title="Blocked Campaigns" value="1,402" trend={{ value: '+24', isPositive: true }} />
        <MetricCard title="Rule Engine" value="Synced" />
      </StatGrid>
      <AdminCard className="p-8 bg-danger/5 border-danger/30 relative overflow-hidden shadow-lg shadow-danger/10">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-danger" />
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
          <div>
            <KPIBlock label="Global Threat Level" value="ELEVATED" />
            <p className="text-sm text-textSecondary mt-3 max-w-xl leading-relaxed">Multiple coordinated campaigns detected in the last hour. Defensive perimeters automatically tightened.</p>
          </div>
          <DangerButton disabled className="w-full md:w-auto shrink-0 shadow-lg shadow-danger/20 py-3 px-8 text-base tracking-wider font-bold">ENGAGE KILL SWITCH</DangerButton>
        </div>
      </AdminCard>
      <div className="flex flex-col sm:flex-row gap-4">
        <SecondaryButton className="flex-1 justify-center py-3" disabled>Manage Blacklist</SecondaryButton>
        <SecondaryButton className="flex-1 justify-center py-3" disabled>Manage Whitelist</SecondaryButton>
      </div>
    </div>
  );

  const renderHoloBidder = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StatGrid>
        <MetricCard title="DSP Connections" value="12/12 Up" />
        <MetricCard title="Bid Rate" value="4.2k / sec" />
        <MetricCard title="Execution Queue" value="0" />
        <MetricCard title="Spend Ceiling" value="$1M / hr" />
      </StatGrid>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard className="p-6 shadow-sm"><KPIBlock label="Execution Status" value="Throttled" /></AdminCard>
        <AdminCard className="p-6 shadow-sm"><KPIBlock label="Connection Health" value="Stable" /></AdminCard>
      </div>
      <AdminCard className="p-8 border-warning/30 bg-warning/5 relative overflow-hidden shadow-lg shadow-warning/10">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-warning" />
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
          <div>
            <h4 className="text-lg font-bold text-text mb-2">Circuit Breaker</h4>
            <p className="text-sm text-textSecondary max-w-xl leading-relaxed">Halts all algorithmic bidding immediately across all connected DSPs. Requires manual override by a Super Admin to resume.</p>
          </div>
          <DangerButton disabled className="w-full md:w-auto shrink-0 shadow-lg shadow-danger/20 py-3 px-8 text-base font-bold">TRIP BREAKER</DangerButton>
        </div>
      </AdminCard>
    </div>
  );

  const mainContent = (
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
         <div className="flex flex-wrap gap-4 items-center -mt-2 mb-2 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg border border-border/60">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Status</span>
              <StatusBadge status="Running" />
            </div>
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg border border-border/60">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Environment</span>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Production</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg border border-border/60">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Owner</span>
              <span className="text-sm font-semibold text-text">Core ML Team</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg border border-border/60">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Version</span>
              <span className="text-sm font-mono text-text">v2.1.0</span>
            </div>
         </div>
      )}
      
      {activeEngine === 'Overview' && renderOverview()}
      {activeEngine === 'Ghost Mode' && renderGhostMode()}
      {activeEngine === 'Quantum Guess' && renderQuantumGuess()}
      {activeEngine === 'Bio-Feel' && renderBioFeel()}
      {activeEngine === 'DisinfoDefender' && renderDisinfoDefender()}
      {activeEngine === 'HoloBidder' && renderHoloBidder()}

      <div className="mt-12 flex-1 flex flex-col justify-end">
        <ActivityPanelTemplate 
          title="Recent Engine Events"
          timeline={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1 border border-border/50 p-5 rounded-2xl bg-surface/40 hover:bg-surface hover:border-primary/30 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-4 text-muted uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
                  Deployments
                </h5>
                <ul className="space-y-4">
                  <li className="flex flex-col"><span className="text-[11px] font-mono text-muted mb-1">10:00 AM</span><span className="text-sm font-semibold text-text">v2.4.1 Shipped</span></li>
                  <li className="flex flex-col"><span className="text-[11px] font-mono text-muted mb-1">Yesterday</span><span className="text-sm font-medium text-textSecondary">v2.4.0 Shipped</span></li>
                </ul>
              </div>
              <div className="col-span-1 border border-border/50 p-5 rounded-2xl bg-surface/40 hover:bg-surface hover:border-warning/30 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-4 text-muted uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Restarts
                </h5>
                <ul className="space-y-4">
                  <li className="flex flex-col"><span className="text-[11px] font-mono text-muted mb-1">12:00 PM</span><span className="text-sm font-semibold text-text">Bio-Feel (Auto)</span></li>
                  <li className="flex flex-col"><span className="text-[11px] font-mono text-muted mb-1">04:00 AM</span><span className="text-sm font-medium text-textSecondary">HoloBidder (Manual)</span></li>
                </ul>
              </div>
              <div className="col-span-2 border border-danger/20 p-5 rounded-2xl bg-danger/5 hover:bg-danger/10 transition-all duration-300">
                <h5 className="text-[10px] font-bold mb-4 text-danger uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Warnings & Failures
                </h5>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-danger">
                    <span className="text-[10px] font-mono font-bold mt-1 bg-danger/20 px-1.5 py-0.5 rounded">WARN</span>
                    <span className="text-sm font-medium leading-relaxed">Redis latency spike detected in Quantum Guess. Connection pool auto-scaled to compensate.</span>
                  </li>
                  <li className="flex items-start gap-3 text-danger">
                    <span className="text-[10px] font-mono font-bold mt-1 bg-danger/20 px-1.5 py-0.5 rounded">ERROR</span>
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

  const inspector = (
    <InspectorTemplate title="Operations Inspector">
      <AdminCard className="p-6 bg-surface/50 border-border/50 shadow-sm shadow-black/10 transition-all duration-300 hover:border-border">
        <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-5">Selected Target</h4>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
           <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-inner">
             <svg className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           </div>
           <div>
             <h3 className="font-bold text-lg text-text leading-tight mb-1">{activeEngine}</h3>
             <div className="text-[10px] font-mono font-bold text-primary bg-primary/10 inline-block px-2 py-0.5 rounded border border-primary/20 tracking-wider">PRODUCTION</div>
           </div>
        </div>
        
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center"><span className="text-muted font-medium">Status</span><HealthIndicator status="Healthy" /></div>
        </div>
      </AdminCard>

      <AdminCard className="p-6 bg-surface/50 border-border/50 shadow-sm shadow-black/10 transition-all duration-300 hover:border-border mt-4">
        <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-5">Real-time Telemetry</h4>
        <div className="space-y-3 text-sm font-mono">
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-background border border-border/40"><span className="text-muted font-sans text-xs">Memory</span><span className="text-text font-semibold">4.2 GB</span></div>
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-background border border-border/40"><span className="text-muted font-sans text-xs">CPU</span><span className="text-text font-semibold">42%</span></div>
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-background border border-border/40"><span className="text-muted font-sans text-xs">Queue</span><span className="text-text font-semibold">0</span></div>
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-background border border-border/40"><span className="text-muted font-sans text-xs">Latency</span><span className="text-text font-semibold">14ms</span></div>
        </div>
      </AdminCard>

      <AdminCard className="p-6 bg-surface/50 border-border/50 shadow-sm shadow-black/10 transition-all duration-300 hover:border-border mt-4">
        <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-5">Dependencies</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs px-3 py-2.5 bg-background border border-border/50 rounded-lg shadow-sm">
            <span className="font-medium text-textSecondary">Redis DB</span>
            <SeverityPill level="Low" />
          </div>
          <div className="flex items-center justify-between text-xs px-3 py-2.5 bg-background border border-border/50 rounded-lg shadow-sm">
             <span className="font-medium text-textSecondary">PostgreSQL</span>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div><span className="text-muted">Ok</span></div>
          </div>
          <div className="flex items-center justify-between text-xs px-3 py-2.5 bg-background border border-border/50 rounded-lg shadow-sm">
             <span className="font-medium text-textSecondary">Kafka Stream</span>
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div><span className="text-muted">Ok</span></div>
          </div>
        </div>
      </AdminCard>

      {activeEngine !== 'Overview' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mt-6">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Recent Logs</h4>
            <div className="rounded-xl overflow-hidden border border-border shadow-md">
               <LogViewer logs={engineLogs} />
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Activity Timeline</h4>
            <div className="bg-surface/50 p-6 rounded-xl border border-border/50 shadow-md">
               <AuditTimeline events={events} />
            </div>
          </div>
        </div>
      )}
    </InspectorTemplate>
  );

  return (
    <WorkspaceLayoutTemplate
      mainContent={mainContent}
      inspector={inspector}
    />
  );
}
