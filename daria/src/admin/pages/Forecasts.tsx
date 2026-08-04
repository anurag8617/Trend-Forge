import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, KPIBlock, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid
} from '../components/ui';

export default function Forecasts() {
  const [selectedForecastId, setSelectedForecastId] = useState<string | null>('fc-1049');
  const [activeTab, setActiveTab] = useState('Prediction Details');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const forecasts = [
    { id: 'fc-1049', engine: 'Quantum Guess', model: 'v1.9.8', confidence: '88%', window: '48h - 72h', status: 'Awaiting Review', analyst: 'm.cole' },
    { id: 'fc-1050', engine: 'Quantum Guess', model: 'v1.9.8', confidence: '94%', window: '24h - 48h', status: 'Validated', analyst: 'e.vance' },
    { id: 'fc-1051', engine: 'Bio-Feel', model: 'v3.0.0', confidence: '62%', window: '1w - 2w', status: 'Rejected', analyst: 's.chen' },
    { id: 'fc-1052', engine: 'Quantum Guess', model: 'v1.9.7', confidence: '78%', window: '72h - 96h', status: 'Published', analyst: 'Auto' },
  ];

  const selectedForecast = forecasts.find(f => f.id === selectedForecastId) || forecasts[0];

  const tabs = [
    { id: 'Prediction Details', label: 'Prediction Summary' },
    { id: 'Forecast Validation', label: 'Validation & Quality' },
    { id: 'Forecast Lifecycle', label: 'Lifecycle' },
    { id: 'Reviewer Workspace', label: 'Analyst Review' },
  ];

  const activityEvents = [
    { time: '11:20 AM', user: 'e.vance', action: 'VALIDATE', detail: 'Forecast fc-1050 validated against ground truth proxy' },
    { time: '10:15 AM', user: 's.chen', action: 'REJECT', detail: 'Forecast fc-1051 rejected due to high confidence drift' },
    { time: '09:00 AM', user: 'system', action: 'PUBLISH', detail: 'Forecast fc-1052 published to premium tenant tier' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === forecasts.length ? [] : forecasts.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Intelligence Operations' }, { label: 'Forecast Review' }]} />
          <PageHeader 
            title="Forecast Review Center" 
            subtitle="Validate AI-generated predictions, assess model confidence drift, and publish forecasts." 
            action={<PrimaryButton>Run Bulk Validation</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6 flex-1">
          {/* Forecast Queue */}
          <AdminCard>
            <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Forecast Queue</h3></div>
            <TableToolbar>
              <TableSearch />
              <div className="flex space-x-2">
                <TableFilters />
              </div>
            </TableToolbar>
            
            <BulkActionBar 
              selectedCount={selectedRows.length} 
              actions={<><SecondaryButton className="py-1">Approve Forecasts</SecondaryButton><DangerButton className="py-1">Reject Selected</DangerButton></>} 
            />

            <DataTable>
              <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === forecasts.length} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Forecast ID" direction="desc" /></th>
                  <th className="px-4 py-3 text-left">Origin Engine</th>
                  <th className="px-4 py-3 text-left">Model</th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Confidence" /></th>
                  <th className="px-4 py-3 text-left">Time Window</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Reviewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {forecasts.map(fc => (
                  <tr 
                    key={fc.id} 
                    className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedForecastId === fc.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedForecastId(fc.id)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(fc.id)} onChange={() => handleSelectRow(fc.id)} /></td>
                    <td className="px-4 py-3 font-mono text-forecast font-medium">{fc.id}</td>
                    <td className="px-4 py-3 text-text">{fc.engine}</td>
                    <td className="px-4 py-3 font-mono text-muted">{fc.model}</td>
                    <td className="px-4 py-3 text-text">{fc.confidence}</td>
                    <td className="px-4 py-3 text-textSecondary">{fc.window}</td>
                    <td className="px-4 py-3"><StatusBadge status={fc.status === 'Published' ? 'Success' : fc.status === 'Rejected' ? 'Critical' : fc.status === 'Validated' ? 'Running' : 'Warning'} label={fc.status} /></td>
                    <td className="px-4 py-3 text-textSecondary">{fc.analyst}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <TablePagination />
          </AdminCard>

          {/* Detailed Workspace */}
          {selectedForecast && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                    Forecast Review: <span className="ml-2 font-mono text-forecast">{selectedForecast.id}</span>
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Engine: {selectedForecast.engine}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Target Window: {selectedForecast.window}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Flag for Retraining</SecondaryButton>
                  <PrimaryButton disabled>Approve & Publish</PrimaryButton>
                  <DangerButton disabled>Reject Prediction</DangerButton>
                </div>
              </div>

              <div className="px-6 pt-2">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                
                {activeTab === 'Prediction Details' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-full mb-2">
                      <h4 className="text-sm font-semibold text-text mb-2">Prediction Summary</h4>
                      <p className="text-sm text-textSecondary p-4 bg-surface border border-border rounded">
                        Model predicts a 88% probability of an anomalous volatility spike in the Asian electronics supply chain sector within the next 48 to 72 hours, driven by compounding logistical disruptions detected in underlying signals.
                      </p>
                    </div>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Confidence Level" value={selectedForecast.confidence} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Model Version" value={selectedForecast.model} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Origin Engine" value={selectedForecast.engine} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Dependencies" value="14 Signals" /></AdminCard>
                  </div>
                )}

                {activeTab === 'Forecast Validation' && (
                  <div className="space-y-6">
                    <StatGrid>
                      <MetricCard title="Prediction Quality (Historical)" value="0.92 F1" />
                      <MetricCard title="Variance" value="±4.2%" />
                      <MetricCard title="Calibration Error" value="0.03" />
                      <MetricCard title="Confidence Drift" value="+1.2%" />
                    </StatGrid>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AdminCard className="p-4">
                         <h4 className="text-sm font-semibold text-text mb-3">Quality Review Logs</h4>
                         <ul className="text-xs text-textSecondary space-y-2">
                           <li className="flex justify-between items-center bg-surface p-2 rounded"><span>False Positives (Last 30d)</span> <span className="font-medium text-text">12</span></li>
                           <li className="flex justify-between items-center bg-surface p-2 rounded"><span>False Negatives (Last 30d)</span> <span className="font-medium text-text">4</span></li>
                           <li className="flex justify-between items-center bg-surface p-2 rounded"><span>Bias Review</span> <span className="font-medium text-success">Passed</span></li>
                         </ul>
                       </AdminCard>
                       <AdminCard className="p-4 border-dashed border-border bg-transparent flex items-center justify-center text-sm text-textSecondary">
                         Ground Truth Proxy Integration Placeholder
                       </AdminCard>
                    </div>
                  </div>
                )}

                {activeTab === 'Forecast Lifecycle' && (
                  <AdminCard className="p-6">
                    <div className="flex justify-between items-center text-xs font-mono mb-4 px-8">
                      {['Created', 'Validated', 'Approved', 'Published', 'Observed', 'Closed'].map((stage, i) => (
                        <div key={stage} className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full mb-2 flex items-center justify-center ${i <= 1 ? 'bg-primary text-dariaNavy' : 'bg-surface border border-border text-muted'}`}>
                            {i <= 1 && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                          </div>
                          <span className={i <= 1 ? 'text-text font-bold' : 'text-muted'}>{stage}</span>
                        </div>
                      ))}
                    </div>
                    <div className="relative w-full h-1 bg-surface mx-8 -mt-9 mb-12 -z-10">
                      <div className="absolute top-0 left-0 h-1 bg-primary w-[20%]" />
                    </div>
                  </AdminCard>
                )}

                {activeTab === 'Reviewer Workspace' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-text mb-4">Decision Timeline</h4>
                      <AuditTimeline events={activityEvents.filter(e => e.detail.includes(selectedForecast.id))} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold text-text mb-4">Analyst Comments</h4>
                      <div className="flex-1 bg-surface border border-border rounded p-4 text-sm text-textSecondary mb-4 min-h-[150px]">
                        <p className="mb-2"><strong className="text-text">m.cole:</strong> "Checked the underlying signal cluster. Confidence seems accurate given the source reliability. Ready for secondary sign-off."</p>
                      </div>
                      <textarea className="w-full bg-surface border border-border rounded p-3 text-sm focus:outline-none focus:border-primary mb-3" placeholder="Add a review comment..." rows={3} />
                      <SecondaryButton className="self-end text-xs">Post Comment</SecondaryButton>
                    </div>
                  </div>
                )}

              </div>
            </AdminCard>
          )}
          
        </div>

        {/* BOTTOM PANEL - Recent Intelligence Activity */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Forecast Operations Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Forecasts Published (24h)" value="142" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Forecasts Rejected (24h)" value="12" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Forecast Inspector</h3>
        
        {selectedForecast ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Forecast</h4>
              <p className="font-mono text-forecast font-medium mb-2">{selectedForecast.id}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedForecast.status === 'Published' ? 'Success' : selectedForecast.status === 'Rejected' ? 'Critical' : 'Warning'} label={selectedForecast.status} /></div>
                <div className="flex justify-between"><span className="text-muted">Confidence</span><span className="text-text font-bold">{selectedForecast.confidence}</span></div>
                <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text">{selectedForecast.analyst}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Related Forecasts</h4>
              <ul className="text-xs text-primary space-y-2">
                <li className="cursor-pointer hover:underline">fc-1048 (Similar Time Window)</li>
                <li className="cursor-pointer hover:underline">fc-0992 (Historical Ground Truth)</li>
              </ul>
            </AdminCard>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a forecast to inspect.</div>
        )}
      </div>

    </div>
  );
}
