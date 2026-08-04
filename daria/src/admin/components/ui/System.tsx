import React from 'react';

export const AuditTimeline = ({ events }: { events: { time: string, user: string, action: string, detail: string }[] }) => (
  <div className="space-y-4">
    {events.map((e, i) => (
      <div key={i} className="flex relative">
        <div className="w-12 text-xs text-muted font-mono pt-0.5 shrink-0">{e.time}</div>
        <div className="relative mx-4 flex-shrink-0 flex items-start justify-center">
          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shadow-[0_0_5px_rgba(38,231,255,0.8)]" />
          {i !== events.length - 1 && <div className="absolute top-3 w-px h-full bg-border" />}
        </div>
        <div className="flex-1 pb-4">
          <p className="text-sm text-text">
            <span className="font-semibold">{e.user}</span> executed <span className="font-mono text-execute bg-execute/10 px-1 rounded">{e.action}</span>
          </p>
          <p className="text-xs text-textSecondary mt-1">{e.detail}</p>
        </div>
      </div>
    ))}
  </div>
);

export const ActivityFeed = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col">
    <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4 border-b border-border pb-2">Activity Stream</h3>
    <div className="flex-1 overflow-y-auto space-y-3">{children}</div>
  </div>
);

export const JSONViewer = ({ data }: { data: any }) => (
  <pre className="bg-[#0A0F1C] border border-border p-4 rounded text-xs font-mono text-primarySoft overflow-x-auto">
    <code>{JSON.stringify(data, null, 2)}</code>
  </pre>
);

export const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => (
  <div className="relative">
    <span className="absolute top-2 right-2 text-[10px] uppercase font-bold text-muted">{language}</span>
    <pre className="bg-[#0A0F1C] border border-border p-4 rounded text-xs font-mono text-text overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

export const LogViewer = ({ logs }: { logs: string[] }) => (
  <div className="bg-[#0A0F1C] border border-border rounded p-3 h-64 overflow-y-auto font-mono text-xs">
    {logs.map((log, i) => (
      <div key={i} className="py-0.5 border-b border-white/5 break-words">
        <span className="text-muted mr-2">[{new Date().toISOString().split('T')[1].slice(0, -1)}]</span>
        <span className={log.includes('ERROR') ? 'text-danger' : log.includes('WARN') ? 'text-warning' : 'text-textSecondary'}>{log}</span>
      </div>
    ))}
  </div>
);
