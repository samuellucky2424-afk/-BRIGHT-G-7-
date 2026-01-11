# BRIGHT G-7 LTD - Global Logistics Website

## Overview
A premium global logistics company website for BRIGHT G-7 LTD, built with React, TypeScript, and Vite. Features AI-powered logistics consulting via Gemini API, shipment tracking, and a modern responsive design.

## Project Structure
```
├── components/          # React components
│   ├── AIConsultant.tsx # AI-powered logistics consultant chat
│   ├── TrackingSection.tsx # Shipment tracking feature
│   └── WorldMap.tsx     # Interactive world map
├── services/            # Business logic services
│   ├── geminiService.ts # Google Gemini AI integration
│   └── trackingService.ts # Tracking functionality
├── App.tsx              # Main application component
├── constants.tsx        # App constants (services, offices data)
├── index.html           # HTML entry point
├── index.tsx            # React entry point
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Technology Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **AI**: Google Gemini API (@google/genai)
- **Visualization**: D3.js

## Running the Application
- **Development**: `npm run dev` - Runs on port 5000
- **Build**: `npm run build` - Creates production build in `dist/`
- **Preview**: `npm run preview` - Preview production build

## Environment Variables
- `GEMINI_API_KEY`: Required for AI consultant feature

## Deployment
Configured for static deployment with Vite build output.

## Recent Changes
- January 2026: Initial import and Replit environment setup
  - Configured Vite to use port 5000 with allowedHosts
  - Added module script entry point to index.html
  - Set up static deployment configuration
