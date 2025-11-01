
import React from 'react';
import { Card } from './Card';

interface StatsPanelProps {
  temp_c: number;
  humidity: number;
  battery_v: number;
  captures: number;
}

const StatItem: React.FC<{ label: string; value: string | number; unit: string; icon: React.ReactNode }> = ({ label, value, unit, icon }) => (
    <div className="flex items-center gap-3">
        <div className="text-brand-cyan">{icon}</div>
        <div>
            <div className="text-xs text-gray-400">{label}</div>
            <div className="text-lg font-bold font-mono text-white">
                {value} <span className="text-sm font-sans text-gray-400">{unit}</span>
            </div>
        </div>
    </div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({ temp_c, humidity, battery_v, captures }) => {

    const batteryPercentage = Math.round(((battery_v - 7.2) / (8.4 - 7.2)) * 100);

    const icons = {
        temp: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V8a4 4 0 00-8 0v8a4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a2.5 2.5 0 00-5 0z" /></svg>,
        humidity: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>,
        battery: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        captures: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    };

    return (
        <Card>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <StatItem label="Temperature" value={temp_c.toFixed(1)} unit="°C" icon={icons.temp} />
                <StatItem label="Humidity" value={humidity} unit="%" icon={icons.humidity}/>
                <StatItem label="Battery" value={batteryPercentage} unit="%" icon={icons.battery}/>
                <StatItem label="Captures" value={captures} unit="Total" icon={icons.captures}/>
            </div>
        </Card>
    );
};
