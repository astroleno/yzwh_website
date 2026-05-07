import React from "react";
import { Radio, ScanLine, Thermometer, Waypoints } from "lucide-react";
import { assetAlts, assetPaths, flightLayers, flightPoints } from "../data/storySections";

const icons = [Waypoints, ScanLine, Thermometer, Radio];

export const FlightPathScene: React.FC = () => {
  return (
    <div data-scroll-scene="flight" className="story-media relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-2xl">
      <img src={assetPaths.flightBuilding} alt={assetAlts.flightBuilding} className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-slate-950/80" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-flight-route
          d="M160 470 C260 280 420 190 610 240 C760 280 825 180 900 92"
          fill="none"
          stroke="rgba(96,210,190,0.85)"
          strokeWidth="3"
          strokeDasharray="12 14"
        />
      </svg>
      {flightPoints.map((point) => (
        <div
          key={point.label}
          data-flight-point
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/80 bg-cyan-100 shadow-[0_0_24px_rgba(96,210,190,0.72)]"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          aria-label={`采集点：${point.label}`}
        />
      ))}
      <div
        data-flight-drone
        className="absolute left-[54%] top-[36%] rounded-full border border-cyan-100/30 bg-cyan-100/10 px-4 py-2 text-xs font-semibold text-cyan-50 backdrop-blur-md"
      >
        无人机采集中
      </div>
      <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-4">
        {flightLayers.map((layer, index) => {
          const Icon = icons[index];
          return (
            <div
              key={layer.value}
              data-flight-layer
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/56 p-4 backdrop-blur-lg"
            >
              <Icon className="h-5 w-5 text-cyan-200" />
              <div>
                <p className="text-sm font-semibold text-white">{layer.label}</p>
                <p className="text-xs text-white/50">{layer.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
