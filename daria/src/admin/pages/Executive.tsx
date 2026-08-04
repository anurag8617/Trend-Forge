import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  MetricCard, KPIBlock, Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  StatGrid, SeverityPill
} from '../components/ui';

export default function Executive() {
  const [activeTab, setActiveTab] = useState('Executive Overview');

  const tabs = [
    { id: 'Executive Overview', label: 'Executive Overview' },
    { id: 'Business Health', label: 'Business Health' },
    { id: 'AI Performance', label: 'AI Performance' },
    { id: 'Customer Success', label: 'Customer Success' },
    { id: 'Product Adoption', label: 'Product Adoption' },
    { id: 'Operational KPIs', label: 'Operational KPIs' },
    { id: 'Revenue Forecast', label: 'Revenue Forecast' },
  ];

  const activityEvents = [
    { time: '14:20 PM', user: 'system', action: 'WIN', detail: 'Closed $2.1M Enterprise contract with Global Media' },
    { time: '12:00 PM', user: 'system', action: 'RENEWAL', detail: 'Nexus Trading renewed annual contract for $412k' },
    { time: 'Yesterday', user: 'system', action: 'COMPLIANCE', detail: 'Achieved ISO 27001 recertification milestone' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Executive Operations' }, { label: 'Strategic Intelligence' }]} />
          <PageHeader 
            title="Executive Analytics" 
            subtitle="Business intelligence, strategic KPIs, and global operational health." 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Executive Overview' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Annual Recurring Revenue" value="$50.4M" isPositive={true} change="+15% YoY" />
                <MetricCard title="Monthly Recurring Revenue" value="$4.2M" isPositive={true} change="+2.1% MoM" />
                <MetricCard title="Net Revenue Retention (NRR)" value="124%" isPositive={true} change="Top Quartile" />
                <MetricCard title="Gross Revenue Retention" value="98.2%" isPositive={true} change="Stable" />
              </StatGrid>
              <StatGrid>
                <MetricCard title="Enterprise Revenue" value="$38.1M" />
                <MetricCard title="Government Revenue" value="$12.3M" />
                <MetricCard title="Expansion Revenue (YTD)" value="$2.4M" />
                <MetricCard title="Avg Customer LTV" value="$1.2M" />
              </StatGrid>
            </div>
          )}

          {activeTab === 'Business Health' && (
            <div className="space-y-6">
               <StatGrid>
                 <MetricCard title="Total Organizations" value="1,241" />
                 <MetricCard title="Enterprise Accounts" value="142" />
                 <MetricCard title="Government Accounts" value="12" />
                 <MetricCard title="Active Users" value="14,241" />
               </StatGrid>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Provisioned Seats" value="28,412" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Growth Rate" value="14% MoM" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Customer Retention" value="99.1%" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Account Expansion" value="42% of Cohort" /></AdminCard>
               </div>
            </div>
          )}

          {activeTab === 'AI Performance' && (
            <div className="space-y-6">
               <AdminCard className="p-6">
                 <SectionHeader title="Core Engine KPIs" />
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                   <KPIBlock label="Signals Processed (YTD)" value="1.4 Billion" />
                   <KPIBlock label="Forecast Accuracy" value="94.2% (Validated)" />
                   <KPIBlock label="Prediction Success Rate" value="91.8%" />
                   <KPIBlock label="Evidence Packs Generated" value="4.2 Million" />
                   <KPIBlock label="Ghost Mode Activity" value="14.2M Sessions" />
                   <KPIBlock label="Quantum Guess Accuracy" value="96.4% F1 Score" />
                 </div>
               </AdminCard>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Bio-Feel Throughput" value="142k / sec" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="HoloBidder Executions" value="$14.2B Volume" /></AdminCard>
               </div>
            </div>
          )}

          {activeTab === 'Customer Success' && (
            <div className="space-y-6">
               <StatGrid>
                 <MetricCard title="Global Health Score" value="94/100" isPositive={true} change="Healthy" />
                 <MetricCard title="Upcoming Renewals (90d)" value="42" />
                 <MetricCard title="Open Enterprise Risks" value="3" isPositive={false} change="High Priority" />
                 <MetricCard title="Enterprise Satisfaction (CSAT)" value="4.8/5.0" />
               </StatGrid>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Support Load" value="Normal (1.2h Avg TTL)" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Expansion Opportunities" value="$1.4M Pipeline" /></AdminCard>
               </div>
            </div>
          )}

          {activeTab === 'Product Adoption' && (
            <AdminCard className="p-6">
               <SectionHeader title="Module Utilization Matrix" />
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                 <KPIBlock label="API Adoption" value="84% of Accounts" />
                 <KPIBlock label="Engine Adoption (Multi)" value="62% use >2 Engines" />
                 <KPIBlock label="Evidence Usage" value="91% of Analysts" />
                 <KPIBlock label="Exports Volume" value="14.2k / month" />
                 <KPIBlock label="White Label Usage" value="42 Enterprises" />
                 <KPIBlock label="Government Adoption" value="100% FedRAMP" />
                 <KPIBlock label="DisinfoDefender" value="High Growth (+14%)" />
               </div>
            </AdminCard>
          )}

          {activeTab === 'Operational KPIs' && (
            <div className="space-y-6">
               <StatGrid>
                 <MetricCard title="Platform Availability" value="99.995%" />
                 <MetricCard title="MTTR (Resolution)" value="14m" />
                 <MetricCard title="MTTD (Detection)" value="2m" />
                 <MetricCard title="Security Events" value="0 Critical" />
               </StatGrid>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Incident Volume" value="Down 42% YoY" /></AdminCard>
                  <AdminCard className="p-4 bg-card"><KPIBlock label="Deployments (YTD)" value="1,412 Releases" /></AdminCard>
               </div>
            </div>
          )}

          {activeTab === 'Revenue Forecast' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Forward-Looking Revenue Pipeline Placeholder (Q3/Q4 Projections)
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Executive Timeline" />
          <div className="grid grid-cols-1 mt-4">
            <ActivityFeed>
              <AuditTimeline events={activityEvents} />
            </ActivityFeed>
          </div>
        </div>

      </div>
    </div>
  );
}
