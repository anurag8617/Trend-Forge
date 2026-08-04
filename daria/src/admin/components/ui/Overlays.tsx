import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, footer }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <button onClick={onClose} className="text-textSecondary hover:text-text"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 text-sm text-textSecondary overflow-y-auto">{children}</div>
        {footer && <div className="p-4 border-t border-border bg-surface flex justify-end space-x-3">{footer}</div>}
      </div>
    </div>
  );
};

export const ConfirmDialog = (props: React.ComponentProps<typeof Modal>) => <Modal {...props} />;

export const DeleteDialog = ({ isOpen, onClose, onConfirm, itemName }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, itemName: string }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" footer={
    <>
      <button onClick={onClose} className="px-4 py-2 text-sm text-textSecondary hover:text-text">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-danger text-white rounded text-sm font-medium hover:bg-danger/90">Delete Permanently</button>
    </>
  }>
    <p>Are you absolutely sure you want to delete <span className="font-semibold text-text">{itemName}</span>? This action cannot be undone and will be permanently recorded in the audit log.</p>
  </Modal>
);

export const Drawer = ({ isOpen, onClose, position = 'right', children }: { isOpen: boolean, onClose: () => void, position?: 'left' | 'right', children: React.ReactNode }) => {
  if (!isOpen) return null;
  const posClasses = position === 'right' ? 'right-0 border-l' : 'left-0 border-r';
  return (
    <div className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm flex">
      <div className="flex-1" onClick={onClose} />
      <div className={`fixed top-0 bottom-0 ${posClasses} w-96 bg-card border-border shadow-2xl animate-in slide-in-from-${position}`}>
        {children}
      </div>
    </div>
  );
};

export const SlideOver = (props: React.ComponentProps<typeof Drawer>) => <Drawer {...props} />;

export const Toast = ({ message, type = 'info' }: { message: string, type?: 'info' | 'success' | 'error' | 'warning' }) => {
  const styles = { info: 'bg-surface border-border text-text', success: 'bg-success/10 border-success/30 text-success', error: 'bg-danger/10 border-danger/30 text-danger', warning: 'bg-warning/10 border-warning/30 text-warning' };
  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded border shadow-lg flex items-center space-x-3 z-50 ${styles[type]}`}>
      <span className="text-sm font-medium">{message}</span>
      <button className="text-current opacity-70 hover:opacity-100"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
    </div>
  );
};
