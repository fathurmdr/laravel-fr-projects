import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './bootstrap';
// import '../css/ck-editor.css';
import '../css/index.css';
import useColorMode from './hooks/useColorMode';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    function InitialApp() {
      useColorMode();
      return <App {...props} />;
    }
    createRoot(el).render(<InitialApp />);
  },
  progress: {
    color: '#4B5563',
  },
});
