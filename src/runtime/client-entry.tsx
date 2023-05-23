import { createRoot } from 'react-dom/client';
import { App } from './app';
import siteData from 'island:site-data';
console.log(siteData);

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(<App />);
}

renderInBrowser();
