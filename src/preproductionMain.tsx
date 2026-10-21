import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './preproduction.css';
import { Preproduction } from './components/Preproduction';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preproduction />
  </StrictMode>,
);
