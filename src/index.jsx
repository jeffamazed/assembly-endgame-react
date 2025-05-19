import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AssemblyEndgame } from './AssemblyEndgame.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AssemblyEndgame />
  </StrictMode>,
)
