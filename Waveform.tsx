import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface WaveformProps {
  detectedFrequency: number;
}

const generateWaveformData = (isActive: boolean) => {
  const data = [];
  const points = 100;
  for (let i = 0; i < points; i++) {
    let amplitude;
    if (isActive) {
      // Generate a sine wave with some noise for an active signal
      amplitude = Math.sin(i * (Math.PI / 8)) * 15 + (Math.random() - 0.5) * 5;
    } else {
      // Generate a mostly flat line with minimal noise for an idle signal
      amplitude = (Math.random() - 0.5) * 2;
    }
    data.push({ time: i, amplitude: parseFloat(amplitude.toFixed(2)) });
  }
  return data;
};

export const Waveform: React.FC<WaveformProps> = ({ detectedFrequency }) => {
  const isActive = detectedFrequency > 0;
  const chartData = useMemo(() => generateWaveformData(isActive), [isActive]);
  
  const WaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 012-2h3.945" />
    </svg>
  );

  return (
    <div className="mt-4">
      <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">
        <WaveIcon />
        <span>Raw Audio Input</span>
      </h4>
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9b" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#00ff9b" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Tooltip
                contentStyle={{ display: 'none' }}
            />
            <YAxis domain={[-25, 25]} hide={true} />
            <XAxis dataKey="time" hide={true} />
            <Area type="monotone" dataKey="amplitude" stroke="#00ff9b" strokeWidth={1.5} fill="url(#colorWave)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};