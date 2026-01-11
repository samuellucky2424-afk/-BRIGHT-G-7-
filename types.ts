
export enum ShipmentStatus {
  ORDER_RECEIVED = 'Order Received',
  IN_TRANSIT = 'In Transit',
  CUSTOMS_CLEARANCE = 'Customs Clearance',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  PENDING = 'Pending',
  DELAYED = 'Delayed'
}

export interface TrackingPoint {
  location: string;
  timestamp: string;
  status: ShipmentStatus;
  description: string;
}

export interface ShipmentData {
  trackingId: string;
  origin: string;
  destination: string;
  currentStatus: ShipmentStatus;
  estimatedDelivery: string;
  history: TrackingPoint[];
  originCoords: [number, number]; // [lat, lng]
  destCoords: [number, number];
  currentCoords: [number, number];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  type: 'HQ' | 'Branch';
}
