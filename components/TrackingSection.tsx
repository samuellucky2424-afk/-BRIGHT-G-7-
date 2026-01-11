
import React, { useState } from 'react';
import { fetchTrackingData } from '../services/trackingService';
import { ShipmentData, ShipmentStatus } from '../types';
import WorldMap from './WorldMap';

const TrackingSection: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    
    setLoading(true);
    setError('');
    const data = await fetchTrackingData(trackingId.trim());
    if (data) {
      setShipment(data);
    } else {
      setError('ID verification failed. Ensure the format matches BRG-XXXXXX.');
      setShipment(null);
    }
    setLoading(false);
  };

  const stages = [
    ShipmentStatus.ORDER_RECEIVED,
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.CUSTOMS_CLEARANCE,
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.DELIVERED
  ];

  const currentStageIndex = shipment ? stages.indexOf(shipment.currentStatus) : -1;

  return (
    <section id="tracking" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Real-time visibility</span>
          <h2 className="text-4xl md:text-6xl font-brand font-black text-slate-950 mt-4 tracking-tighter">Command Center.</h2>
          <p className="mt-6 text-lg text-slate-500 font-medium max-w-xl mx-auto">
            Get instant end-to-end visibility on your global cargo with our encrypted tracking system.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <input
              id="tracking-input"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="ENTER TRACKING NUMBER (e.g. BRG-778899)"
              className="flex-1 px-8 py-5 text-sm font-bold tracking-widest border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 uppercase"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50 shadow-lg"
            >
              {loading ? 'SYSTEM SEARCHING...' : 'SYNC SHIPMENT'}
            </button>
          </form>
          {error && <p className="mt-6 text-red-600 text-center text-xs font-black uppercase tracking-widest animate-pulse">{error}</p>}
        </div>

        {shipment && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* Left Column: Data */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">REFERENCE ID</h3>
                    <p className="text-2xl font-brand font-black text-slate-950">{shipment.trackingId}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">STATUS</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter ring-1 ring-blue-100">
                      {shipment.currentStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</span>
                    <span className="text-xs font-bold text-slate-900">{shipment.origin}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</span>
                    <span className="text-xs font-bold text-slate-900">{shipment.destination}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ETA Window</span>
                    <span className="text-xs font-bold text-orange-600">{shipment.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Event Logs</h4>
                <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                  {shipment.history.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-slate-950 ${idx === shipment.history.length - 1 ? 'bg-orange-500 ring-4 ring-orange-500/20' : 'bg-slate-700'}`} />
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1">{item.timestamp}</p>
                        <h5 className="text-sm font-black text-white leading-none mb-2">{item.status}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="lg:col-span-8 space-y-8">
              <WorldMap 
                origin={shipment.originCoords} 
                destination={shipment.destCoords} 
                current={shipment.currentCoords}
              />
              
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
                <div className="flex justify-between items-center mb-10">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Transit Progress</h4>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                        {Math.round((currentStageIndex / (stages.length - 1)) * 100)}% Complete
                    </span>
                </div>
                <div className="relative pt-2 pb-8">
                  <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                  <div 
                    className="absolute top-4 left-0 h-1 bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                  ></div>
                <div className="flex flex-wrap justify-between relative gap-y-8">
                    {stages.map((stage, idx) => (
                      <div key={stage} className="flex flex-col items-center w-1/3 sm:w-auto">
                        <div className={`w-4 h-4 rounded-full border-4 border-white shadow-md z-10 transition-colors duration-500 ${idx <= currentStageIndex ? 'bg-orange-500' : 'bg-slate-200'}`} />
                        <p className={`mt-4 text-[9px] font-black uppercase tracking-tighter text-center w-20 leading-tight ${idx <= currentStageIndex ? 'text-slate-900' : 'text-slate-400'}`}>
                          {stage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackingSection;
