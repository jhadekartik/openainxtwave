
import { useState, useEffect, useCallback, useRef } from 'react';
// FIX: Import LocationType to resolve missing property error.
import { DeviceData, Zone, LocationType } from '../types';

// FIX: Update LOCATIONS to be an array of objects with name and type to support locationType property.
const LOCATIONS: { name: string; type: LocationType }[] = [
  { name: "Main Street", type: LocationType.STREET },
  { name: "Oak Avenue", type: LocationType.STREET },
  { name: "Elm Court", type: LocationType.STREET },
  { name: "Cedar Lane", type: LocationType.STREET },
  { name: "Pine Plaza", type: LocationType.PLAZA },
  { name: "Maple Drive", type: LocationType.STREET },
  { name: "Central Park", type: LocationType.PARK },
  { name: "Riverbank", type: LocationType.WATERFRONT },
  { name: "South Market", type: LocationType.MARKET },
  { name: "North Plaza", type: LocationType.PLAZA },
  { name: "West End", type: LocationType.MARKET },
  { name: "East Gate", type: LocationType.PLAZA }
];

// FIX: Added WARDS array to logically group devices.
const WARDS = ["Alpha", "Bravo", "Charlie", "Delta"];

const GPT_INSIGHTS = {
  [Zone.SAFE]: [
    "Mosquito activity is low. Keep up the good work!",
    "Environment is stable. Continue monitoring.",
    "No immediate threats detected. System is nominal."
  ],
  [Zone.MEDIUM]: [
    "Moderate risk. Close balcony doors during dusk.",
    "Slight increase in humidity. Check for stagnant water.",
    "Activity detected. Consider using a repellent if outdoors."
  ],
  [Zone.HIGH]: [
    "High mosquito presence. Run Night Mode for 2 hours.",
    "Significant activity detected near windows. Ensure they are sealed.",
    "High risk alert! Advise draining all stagnant water sources immediately."
  ]
};

const DALLE_POSTERS = [
  { prompt: "Stay Safe from Dengue", url: "https://picsum.photos/seed/dengue/400/300" },
  { prompt: "Protect Your Family from Mosquitoes", url: "https://picsum.photos/seed/family/400/300" },
  { prompt: "AI is Watching for Mosquitoes", url: "https://picsum.photos/seed/ai/400/300" },
  { prompt: "Clean Water, No Mosquitoes", url: "https://picsum.photos/seed/water/400/300" },
];

// FIX: Updated function to accept totalDevices to calculate ward and added the missing 'ward' property.
const generateInitialDevice = (index: number, totalDevices: number): DeviceData => {
  const devicesPerWard = Math.ceil(totalDevices / WARDS.length);
  const wardIndex = Math.floor(index / devicesPerWard);
  const ward = WARDS[wardIndex % WARDS.length];
  // FIX: Use the new LOCATIONS structure to get location name and type.
  const locationData = LOCATIONS[index % LOCATIONS.length];
  
  return {
    device_id: `R-${String(index + 1).padStart(2, '0')}`,
    ward: `Ward ${ward}`,
    // FIX: Assign location name from the locationData object.
    location: locationData.name,
    // FIX: Add the missing locationType property.
    locationType: locationData.type,
    mas: 0.2,
    zone: Zone.SAFE,
    detected_freq: 0,
    captures: 0,
    temp_c: 28.0,
    humidity: 65,
    battery_v: 8.4,
    ai_whisper: "System standby. Awaiting detection...",
    ai_gpt: "System initialized. Monitoring for threats.",
    ai_dalle: DALLE_POSTERS[0],
  };
};

export const useMosquitoSimulation = (deviceCount: number) => {
  // FIX: Passed deviceCount to generateInitialDevice to allow for ward calculation.
  const [devices, setDevices] = useState<DeviceData[]>(() => Array.from({ length: deviceCount }, (_, i) => generateInitialDevice(i, deviceCount)));
  const [simulationRunning, setSimulationRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const runSimulationTick = useCallback(() => {
    setDevices(prevDevices => prevDevices.map(device => {
      const newMAS = Math.min(1, Math.max(0, device.mas + (Math.random() - 0.45) * 0.1));
      
      let newZone: Zone;
      if (newMAS > 0.7) newZone = Zone.HIGH;
      else if (newMAS > 0.4) newZone = Zone.MEDIUM;
      else newZone = Zone.SAFE;

      const detected_freq = newZone !== Zone.SAFE ? 400 + Math.random() * 200 : 0;
      const species = detected_freq > 500 ? "Culex" : "Aedes aegypti";

      return {
        ...device,
        mas: newMAS,
        zone: newZone,
        detected_freq: parseFloat(detected_freq.toFixed(2)),
        captures: newZone !== Zone.SAFE && Math.random() > 0.8 ? device.captures + 1 : device.captures,
        temp_c: parseFloat((device.temp_c + (Math.random() - 0.5) * 0.2).toFixed(1)),
        humidity: Math.round(Math.min(95, Math.max(50, device.humidity + (Math.random() - 0.5) * 2))),
        battery_v: parseFloat(Math.max(7.2, device.battery_v - 0.001).toFixed(2)),
        ai_whisper: detected_freq > 0 ? `Detected ${newZone === Zone.HIGH ? 'female ' : ''}${species} at ${detected_freq.toFixed(0)} Hz` : "No significant acoustic signals detected.",
        ai_gpt: GPT_INSIGHTS[newZone][Math.floor(Math.random() * GPT_INSIGHTS[newZone].length)],
        ai_dalle: DALLE_POSTERS[Math.floor(Math.random() * DALLE_POSTERS.length)],
      };
    }));
  }, []);

  useEffect(() => {
    if (simulationRunning) {
      intervalRef.current = window.setInterval(runSimulationTick, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulationRunning, runSimulationTick]);

  const toggleSimulation = () => {
    setSimulationRunning(prev => !prev);
  };

  return { devices, simulationRunning, toggleSimulation };
};
