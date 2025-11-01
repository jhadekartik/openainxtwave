
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card } from './Card';

interface FFTChartProps {
  detectedFrequency: number;
}

const generateChartData = (peakFreq: number) => {
  const data = [];
  const baseAmplitude = 5;
  const peakAmplitude = 95;
  const peakWidth = 10; // Hz

  for (let freq = 350; freq <= 650; freq += 5) {
    let amplitude;
    if (peakFreq > 0 && freq >= peakFreq - peakWidth && freq <= peakFreq + peakWidth) {
      const distance = Math.abs(freq - peakFreq);
      amplitude = baseAmplitude + (peakAmplitude - baseAmplitude) * (1 - distance / peakWidth);
    } else {
      amplitude = baseAmplitude + Math.random() * 5;
    }
    data.push({ frequency: freq, amplitude: parseFloat(amplitude.toFixed(2)) });
  }
  return data;
};

export const FFTChart: React.FC<FFTChartProps> = ({ detectedFrequency }) => {
  const chartData = useMemo(() => generateChartData(detectedFrequency), [detectedFrequency]);

  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  return (
    <Card className="h-full" title="Acoustic Signature Analysis (FFT)" icon={<Icon />}>
      <div className="h-64 md:h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
                <linearGradient id="colorAmplitude" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d1ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00d1ff" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="frequency" unit=" Hz" stroke="#888" style={{ fontSize: '0.75rem' }}/>
            <YAxis stroke="#888" style={{ fontSize: '0.75rem' }} label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', fill: '#888', style: {textAnchor: 'middle'} }}/>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(10, 25, 47, 0.9)',
                borderColor: '#00d1ff',
                color: '#fff',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="amplitude" stroke="#00d1ff" strokeWidth={2} fill="url(#colorAmplitude)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
