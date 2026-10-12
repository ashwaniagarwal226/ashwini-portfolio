import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
  root,
  configFile: false,
  plugins: [react()],
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const rendered = renderToString(App ? (await import('react')).createElement(App) : null);
  const outputPath = path.join(root, 'dist', 'index.html');
  const html = await readFile(outputPath, 'utf8');
  const rootMarkup = `<div id="root">${rendered}</div>`;
  if (!/<div id="root"><\/div>/.test(html)) {
    throw new Error('Could not find the empty #root element in dist/index.html; prerender was not applied.');
  }
  await writeFile(outputPath, html.replace(/<div id="root"><\/div>/, rootMarkup), 'utf8');
  console.log('Prerendered portfolio HTML into dist/index.html');
} finally {
  await server.close();
}
