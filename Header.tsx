
import React from 'react';
import type { View } from '../App';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  simulationRunning: boolean;
  toggleSimulation: () => void;
}

const NavButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      active
        ? 'bg-brand-green text-brand-bg shadow-lg shadow-brand-green/20'
        : 'bg-gray-700/50 hover:bg-gray-600/70 text-gray-300'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, setView, simulationRunning, toggleSimulation }) => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-brand-card/50 backdrop-blur-xl border-b border-brand-border sticky top-0 z-50 animate-fade-in">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 7c-.55 0-1 .45-1 1v3.42l-2.24 2.24c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.83V8c0-.55-.45-1-1-1zm5.12 1.45l-1.06 1.06c.33.56.54 1.2.54 1.89 0 .55-.1.08-.23 1.58-.2 1.5-1.5 2.8-3.03 3.03-.5.08-1.03.18-1.58.23l-2.06 2.06c2.91.44 5.4-1.56 6.34-4.22.1-.3.17-.61.21-.92l1.06-1.06c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z"/>
        </svg>
        <h1 className="text-xl font-bold text-white tracking-wide">AI Mosquito Defence</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center bg-gray-800/70 rounded-lg p-1 space-x-1">
          <NavButton active={currentView === 'home'} onClick={() => setView('home')}>Home Simulation</NavButton>
          <NavButton active={currentView === 'area'} onClick={() => setView('area')}>Area Dashboard</NavButton>
        </div>
        <button onClick={toggleSimulation} className={`p-2 rounded-full transition-colors ${simulationRunning ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-green-500/80 hover:bg-green-600/80'}`}>
          {simulationRunning ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
