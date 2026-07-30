import { motion } from 'framer-motion';
import { typography, colors } from '../lib/tokens';

const TEAM_MEMBERS = [
  { id: 1, name: 'Andrew Holmberg', role: 'Owner', email: 'holmbergandrew95@gmail.com', status: 'Active' },
  { id: 2, name: 'Sagar Jain', role: 'Admin', email: 'sagar@inceptrasolutions.com', status: 'Active' },
  { id: 3, name: 'Daniel Manning', role: 'Strategic Advisor', email: 'dmanning@trendforge.com', status: 'Active' },
  { id: 4, name: 'Compliance Auditor', role: 'Viewer', email: 'pending...', status: 'Invited' },
];

export default function Team() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full max-w-5xl mx-auto pt-4 pb-12"
    >
      <div className="mb-8 border-b border-border pb-6 flex justify-between items-end">
        <div>
          <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Workspace</h2>
          <h1 className="text-4xl font-light tracking-tight text-white">Team Management</h1>
          <p className={`${typography.textTertiary} mt-2 text-sm`}>
            Manage organizational access, roles, and compliance clearances.
          </p>
        </div>
        <button className="px-4 py-2 bg-accent text-background rounded text-sm font-semibold hover:bg-white transition-colors">
          + Invite Member
        </button>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-4 py-4 px-6 border-b border-border bg-surface/20">
          <span className={`${typography.microLabel} ${typography.textSecondary} col-span-2`}>User</span>
          <span className={`${typography.microLabel} ${typography.textSecondary}`}>Role</span>
          <span className={`${typography.microLabel} ${typography.textSecondary}`}>Status</span>
        </div>

        <div className="flex flex-col divide-y divide-[#1A1B41]/50">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="grid grid-cols-4 py-4 px-6 items-center hover:bg-surface/10 transition-colors">
              <div className="flex flex-col col-span-2">
                <span className="text-white text-sm font-medium">{member.name}</span>
                <span className={`${typography.textTertiary} text-xs mt-0.5`}>{member.email}</span>
              </div>
              <div>
                <span className="px-2.5 py-1 rounded bg-surface text-gray-300 text-xs border border-border">
                  {member.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-accent' : 'bg-gray-500'}`}></div>
                <span className={`${typography.textSecondary} text-sm`}>{member.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}