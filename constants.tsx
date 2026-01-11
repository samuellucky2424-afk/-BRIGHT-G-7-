
import React from 'react';
import { OfficeLocation, ServiceItem } from './types';

export const OFFICES: OfficeLocation[] = [
  { city: 'Dubai', country: 'United Arab Emirates', address: 'Business Bay, One Tower, Suite 402', phone: '+971 4 123 4567', type: 'HQ' },
  { city: 'Lagos', country: 'Nigeria', address: 'Victoria Island, Landmark Center Rd', phone: '+234 800 123 4567', type: 'Branch' },
  { city: 'London', country: 'United Kingdom', address: 'Canary Wharf, 25 Canada Square', phone: '+44 20 7946 0000', type: 'Branch' },
  { city: 'New York', country: 'United States', address: 'Financial District, 1 World Trade Center', phone: '+1 212 555 0199', type: 'Branch' },
  { city: 'Toronto', country: 'Canada', address: 'Bay Street, Financial District', phone: '+1 416 555 0101', type: 'Branch' },
  { city: 'Tokyo', country: 'Japan', address: 'Shinjuku, Nomura Building', phone: '+81 3 1234 5678', type: 'Branch' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'air',
    title: 'Air Cargo Logistics',
    description: 'Fast and reliable air freight solutions for time-sensitive international shipments.',
    icon: '✈️'
  },
  {
    id: 'sea',
    title: 'Sea Freight',
    description: 'Cost-effective container shipping and ocean freight services for bulk cargo worldwide.',
    icon: '🚢'
  },
  {
    id: 'land',
    title: 'Land Transportation',
    description: 'Door-to-door trucking and last-mile delivery services across continents.',
    icon: '🚛'
  },
  {
    id: 'cross',
    title: 'Cross-Border Shipping',
    description: 'Seamless customs clearance and documentation for international trade lanes.',
    icon: '🌍'
  }
];
