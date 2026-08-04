const fs = require('fs');
const path = require('path');

const pages = ['Dashboard', 'Users', 'Organizations', 'Engines', 'Signals', 'Forecasts', 'DARIA', 'Compliance', 'Security', 'Billing', 'Monitoring', 'Settings'];

const template = (title) => `import React from 'react';
import AdminPageLayout from '../components/AdminPageLayout';

export default function ${title}() {
  return <AdminPageLayout title="${title}" />;
}
`;

const dir = path.join(__dirname, 'src', 'admin', 'pages');
fs.mkdirSync(dir, { recursive: true });

pages.forEach(page => {
  fs.writeFileSync(path.join(dir, `${page}.tsx`), template(page));
});
