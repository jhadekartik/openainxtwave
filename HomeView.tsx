import React, { useState, useEffect } from 'react';
import type { DeviceData } from '../types';
import { FFTChart } from './FFTChart';
import { StatsPanel } from './StatsPanel';
import { AIPanel } from './AIPanel';
import { ZoneIndicator } from './ZoneIndicator';
import { Waveform } from './Waveform';
import { DebugControls } from './DebugControls';

interface HomeViewProps {
  device: DeviceData;
  simulationRunning: boolean;
  allPosters: { prompt: string; url: string; }[];
}

export const HomeView: React.FC<HomeViewProps> = ({ device, simulationRunning, allPosters }) => {
  const [manualFrequency, setManualFrequency] = useState<number>(device.detected_freq);
  const [isVisualizationPaused, setVisualizationPaused] = useState<boolean>(!simulationRunning);

  // Effect to update local pause state when global simulation state changes
  useEffect(() => {
    setVisualizationPaused(!simulationRunning);
  }, [simulationRunning]);

  // Effect to update the manual frequency from the simulation *only if* visualization is not paused
  useEffect(() => {
    if (!isVisualizationPaused) {
      setManualFrequency(device.detected_freq);
    }
  }, [device.detected_freq, isVisualizationPaused]);

  const toggleVisualizationPause = () => {
    setVisualizationPaused(prev => !prev);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 h-full">
      {/* Left Column */}
      <div className="lg:col-span-2 grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 lg:gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <ZoneIndicator zone={device.zone} mas={device.mas} />
            <StatsPanel 
                temp_c={device.temp_c}
                humidity={device.humidity}
                battery_v={device.battery_v}
                captures={device.captures}
            />
        </div>
        <FFTChart detectedFrequency={manualFrequency} />
        <DebugControls 
          manualFrequency={manualFrequency}
          setManualFrequency={setManualFrequency}
          isPaused={isVisualizationPaused}
          togglePause={toggleVisualizationPause}
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <AIPanel
          title="AI Whisper"
          iconName="whisper"
          content={device.ai_whisper}
          color="cyan"
        />
        <AIPanel
          title="AI GPT"
          iconName="gpt"
          content={device.ai_gpt}
          color="green"
        />
        <AIPanel
          title="AI DALL·E"
          iconName="dalle"
          content={device.ai_dalle.prompt}
          imageUrl={device.ai_dalle.url}
          color="purple"
          simulationRunning={simulationRunning}
          allPosters={allPosters}
        >
          <Waveform detectedFrequency={manualFrequency} />
        </AIPanel>
      </div>
    </div>
  );
};