
import { ShipmentData, ShipmentStatus } from '../types';

const MOCK_SHIPMENTS: Record<string, ShipmentData> = {
  'BRG-778899': {
    trackingId: 'BRG-778899',
    origin: 'Dubai, UAE',
    destination: 'London, UK',
    currentStatus: ShipmentStatus.IN_TRANSIT,
    estimatedDelivery: '2025-05-24',
    originCoords: [25.2048, 55.2708],
    destCoords: [51.5074, -0.1278],
    currentCoords: [40.7128, 20.0000], // Somewhere mid-flight/journey
    history: [
      {
        status: ShipmentStatus.ORDER_RECEIVED,
        location: 'Dubai HQ',
        timestamp: '2025-05-18 09:00 AM',
        description: 'Shipment has been registered and picked up from the warehouse.'
      },
      {
        status: ShipmentStatus.IN_TRANSIT,
        location: 'Dubai International Airport',
        timestamp: '2025-05-19 14:30 PM',
        description: 'Package arrived at sorting facility and is being processed for air transit.'
      },
      {
        status: ShipmentStatus.IN_TRANSIT,
        location: 'In Transit - Air',
        timestamp: '2025-05-20 02:15 AM',
        description: 'Shipment departed from origin airport.'
      }
    ]
  },
  'BRG-112233': {
    trackingId: 'BRG-112233',
    origin: 'Tokyo, JP',
    destination: 'Lagos, NG',
    currentStatus: ShipmentStatus.DELIVERED,
    estimatedDelivery: '2025-05-15',
    originCoords: [35.6762, 139.6503],
    destCoords: [6.5244, 3.3792],
    currentCoords: [6.5244, 3.3792],
    history: [
      {
        status: ShipmentStatus.ORDER_RECEIVED,
        location: 'Tokyo Office',
        timestamp: '2025-05-01',
        description: 'Cargo received.'
      },
      {
        status: ShipmentStatus.DELIVERED,
        location: 'Lagos Residence',
        timestamp: '2025-05-15',
        description: 'Package successfully delivered to recipient.'
      }
    ]
  }
};

export const fetchTrackingData = (id: string): Promise<ShipmentData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SHIPMENTS[id] || null);
    }, 800);
  });
};
