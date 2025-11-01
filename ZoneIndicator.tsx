
import React from 'react';
import { Zone } from '../types';
import { Card } from './Card';

interface ZoneIndicatorProps {
  zone: Zone;
  mas: number;
}

const zoneConfig = {
  [Zone.SAFE]: {
    label: "SAFE",
    color: "text-green-400",
    pulseColor: "bg-green-500",
    shadow: "shadow-green-500/50",
    animation: "",
  },
  [Zone.MEDIUM]: {
    label: "MEDIUM",
    color: "text-yellow-400",
    pulseColor: "bg-yellow-500",
    shadow: "shadow-yellow-500/50",
    animation: "animate-pulse-fast",
  },
  [Zone.HIGH]: {
    label: "HIGH",
    color: "text-red-400",
    pulseColor: "bg-red-500",
    shadow: "shadow-red-500/60",
    animation: "animate-ping-slow",
  },
};

export const ZoneIndicator: React.FC<ZoneIndicatorProps> = ({ zone, mas }) => {
  const config = zoneConfig[zone];

  return (
    <Card className="flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center w-24 h-24">
            <div className={`absolute w-full h-full rounded-full ${config.pulseColor} opacity-75 ${config.animation}`}></div>
            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center bg-brand-bg shadow-inner`}>
                <span className={`text-2xl font-bold font-mono ${config.color}`}>
                    {mas.toFixed(2)}
                </span>
            </div>
        </div>
        <h4 className="mt-4 text-sm text-gray-400">Mosquito Activity Score</h4>
        <p className={`text-xl font-bold tracking-widest ${config.color}`}>{config.label}</p>
    </Card>
  );
};
