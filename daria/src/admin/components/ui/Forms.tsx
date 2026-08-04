import React from 'react';

const BaseInputClass = "w-full bg-surface border border-border rounded text-sm text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed";

export const TextInput = ({ label, error, ...props }: { label?: string, error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 text-sm font-medium text-textSecondary">{label}</label>}
    <input className={`${BaseInputClass} px-3 py-2 ${error ? 'border-danger focus:border-danger focus:ring-danger' : ''}`} {...props} />
    {error && <span className="mt-1 text-xs text-danger">{error}</span>}
  </div>
);

export const SearchInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative w-full">
    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    <input className={`${BaseInputClass} pl-9 pr-3 py-2`} type="text" {...props} />
  </div>
);

export const Select = ({ label, options, ...props }: { label?: string, options: { value: string, label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 text-sm font-medium text-textSecondary">{label}</label>}
    <select className={`${BaseInputClass} px-3 py-2 appearance-none`} {...props}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export const MultiSelect = () => <div className="p-2 border border-border rounded bg-surface text-sm text-textSecondary">MultiSelect Placeholder</div>;

export const Checkbox = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" className="w-4 h-4 rounded border-border bg-surface text-primary focus:ring-1 focus:ring-primary focus:ring-offset-background" {...props} />
    <span className="text-sm text-text">{label}</span>
  </label>
);

export const Toggle = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label?: string }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <div className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface border border-border'}`} onClick={onChange}>
      <div className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${checked ? 'translate-x-5 bg-dariaNavy' : 'translate-x-0 bg-muted'}`} />
    </div>
    {label && <span className="text-sm text-text">{label}</span>}
  </label>
);

export const Radio = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input type="radio" className="w-4 h-4 border-border bg-surface text-primary focus:ring-1 focus:ring-primary focus:ring-offset-background" {...props} />
    <span className="text-sm text-text">{label}</span>
  </label>
);

export const TextArea = ({ label, ...props }: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 text-sm font-medium text-textSecondary">{label}</label>}
    <textarea className={`${BaseInputClass} px-3 py-2 min-h-[100px]`} {...props} />
  </div>
);

export const DatePicker = () => <div className={`${BaseInputClass} px-3 py-2 flex items-center text-textSecondary`}><svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Select Date...</div>;

export const FileUpload = () => (
  <div className="w-full p-8 border-2 border-dashed border-border rounded-lg bg-surface flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
    <svg className="w-8 h-8 text-muted mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
    <span className="text-sm text-text font-medium">Click to upload or drag and drop</span>
    <span className="text-xs text-textSecondary mt-1">CSV, JSON, XML (max. 10MB)</span>
  </div>
);
