
import React from 'react';
import { DeviceData, Zone } from '../types';
import { Card } from './Card';

const zoneColors = {
  [Zone.SAFE]: 'bg-green-500/80 border-green-400',
  [Zone.MEDIUM]: 'bg-yellow-500/80 border-yellow-400',
  [Zone.HIGH]: 'bg-red-500/80 border-red-400',
};

const zonePulseColors = {
  [Zone.SAFE]: 'shadow-green-500/30',
  [Zone.MEDIUM]: 'shadow-yellow-500/40 animate-pulse-fast',
  [Zone.HIGH]: 'shadow-red-500/50 animate-ping-slow',
}

const DeviceNode: React.FC<{ device: DeviceData }> = ({ device }) => (
  <div className="relative group flex flex-col items-center justify-center">
     <div className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${zoneColors[device.zone]} ${zonePulseColors[device.zone]}`}></div>
     <span className="mt-2 text-xs text-gray-400 truncate w-24 text-center">{device.location}</span>
     <div className="absolute bottom-full mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-10">
      <p className="font-bold">{device.location} ({device.device_id})</p>
      <p>MAS: {device.mas.toFixed(2)}</p>
      <p>Captures: {device.captures}</p>
      <p>Risk: <span className={`${device.zone === Zone.HIGH ? 'text-red-400' : device.zone === Zone.MEDIUM ? 'text-yellow-400' : 'text-green-400'}`}>{device.zone}</span></p>
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
     </div>
  </div>
);

export const AreaView: React.FC<{ devices: DeviceData[] }> = ({ devices }) => {
  const highRiskCount = devices.filter(d => d.zone === Zone.HIGH).length;
  const mediumRiskCount = devices.filter(d => d.zone === Zone.MEDIUM).length;
  
  return (
    <div className="flex flex-col h-full gap-6 animate-fade-in">
        <Card>
            <div className="flex flex-wrap justify-around text-center">
                <div className="p-2">
                    <h4 className="text-2xl font-bold text-white">{devices.length}</h4>
                    <p className="text-sm text-gray-400">Total Devices</p>
                </div>
                 <div className="p-2">
                    <h4 className="text-2xl font-bold text-red-500">{highRiskCount}</h4>
                    <p className="text-sm text-gray-400">High Risk Zones</p>
                </div>
                <div className="p-2">
                    <h4 className="text-2xl font-bold text-yellow-500">{mediumRiskCount}</h4>
                    <p className="text-sm text-gray-400">Medium Risk Zones</p>
                </div>
                <div className="p-2">
                    <h4 className="text-2xl font-bold text-green-500">{devices.length - highRiskCount - mediumRiskCount}</h4>
                    <p className="text-sm text-gray-400">Safe Zones</p>
                </div>
            </div>
        </Card>
        <Card className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12 p-4 md:p-8">
            {devices.map(device => (
                <DeviceNode key={device.device_id} device={device} />
            ))}
            </div>
        </Card>
    </div>
  );
};
