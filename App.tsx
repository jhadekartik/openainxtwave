import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { AreaView } from './components/AreaView';
import { Header } from './components/Header';
import { HardwareView } from './components/HardwareView';
import { useMosquitoSimulation, DALLE_POSTERS } from './hooks/useMosquitoSimulation';

export type View = 'home' | 'area' | 'hardware';

const App: React.FC = () => {
  const [view, setView] = useState<View>('area');
  const { devices, simulationRunning, toggleSimulation } = useMosquitoSimulation(12); // Simulate 12 devices for the area view

  return (
    <div className="min-h-screen bg-brand-bg bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          currentView={view} 
          setView={setView} 
          simulationRunning={simulationRunning} 
          toggleSimulation={toggleSimulation}
        />
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          {view === 'home' && devices[0] && (
            <HomeView 
              device={devices[0]} 
              simulationRunning={simulationRunning}
              allPosters={DALLE_POSTERS}
            />
          )}
          {view === 'area' && <AreaView devices={devices} />}
          {view === 'hardware' && <HardwareView />}
        </main>
        <footer className="text-center p-4 text-xs text-gray-500">
          AI Mosquito Killer Robot — Web Simulation Platform | Jhade Kartik & Team
        </footer>
      </div>
      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(0, 255, 155, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 155, 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
    </div>
  );
};

export default App;