
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface WorldMapProps {
  origin?: [number, number];
  destination?: [number, number];
  current?: [number, number];
}

const WorldMap: React.FC<WorldMapProps> = ({ origin, destination, current }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 450;

    const projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.4]);

    const pathGenerator = d3.geoPath().projection(projection);

    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((data: any) => {
        // Base Map
        svg.append('g')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .attr('fill', '#0f172a')
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 0.8);

        if (origin && destination) {
          const originPx = projection([origin[1], origin[0]]);
          const destPx = projection([destination[1], destination[0]]);

          if (originPx && destPx) {
            // Glowing route path (Arc)
            const midX = (originPx[0] + destPx[0]) / 2;
            const midY = (originPx[1] + destPx[1]) / 2 - 50; // Curve upward

            const arcPath = `M ${originPx[0]},${originPx[1]} Q ${midX},${midY} ${destPx[0]},${destPx[1]}`;

            // Path shadow/glow
            svg.append('path')
              .attr('d', arcPath)
              .attr('fill', 'none')
              .attr('stroke', '#f97316')
              .attr('stroke-width', 4)
              .attr('stroke-linecap', 'round')
              .style('opacity', 0.15)
              .style('filter', 'blur(4px)');

            svg.append('path')
              .attr('d', arcPath)
              .attr('fill', 'none')
              .attr('stroke', '#f97316')
              .attr('stroke-width', 1.5)
              .attr('stroke-dasharray', '4,4')
              .style('opacity', 0.8);

            // Origin Marker
            svg.append('circle')
              .attr('cx', originPx[0])
              .attr('cy', originPx[1])
              .attr('r', 4)
              .attr('fill', '#f97316')
              .style('filter', 'drop-shadow(0 0 4px #f97316)');

            // Destination Marker
            svg.append('circle')
              .attr('cx', destPx[0])
              .attr('cy', destPx[1])
              .attr('r', 5)
              .attr('fill', '#3b82f6')
              .style('filter', 'drop-shadow(0 0 6px #3b82f6)');

            if (current) {
              const currentPx = projection([current[1], current[0]]);
              if (currentPx) {
                // Airplane Icon (simulated with SVG path or simple shape)
                const planeG = svg.append('g')
                  .attr('transform', `translate(${currentPx[0]}, ${currentPx[1]})`);
                
                planeG.append('circle')
                  .attr('r', 12)
                  .attr('fill', 'rgba(249, 115, 22, 0.2)')
                  .append('animate')
                  .attr('attributeName', 'r')
                  .attr('from', 8)
                  .attr('to', 24)
                  .attr('dur', '2s')
                  .attr('repeatCount', 'indefinite');

                planeG.append('circle')
                  .attr('r', 4)
                  .attr('fill', '#f97316')
                  .style('filter', 'drop-shadow(0 0 8px #f97316)');
                
                svg.append('text')
                  .attr('x', currentPx[0] + 10)
                  .attr('y', currentPx[1] - 10)
                  .text('ACTIVE TRANSIT')
                  .attr('fill', '#f97316')
                  .style('font-size', '10px')
                  .style('font-weight', 'bold')
                  .style('font-family', 'Montserrat');
              }
            }
          }
        }
      });
  }, [origin, destination, current]);

  return (
    <div className="bg-slate-950 rounded-3xl p-1 overflow-hidden border border-slate-800 shadow-2xl relative w-full aspect-[4/3] sm:aspect-video flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      <svg
        ref={svgRef}
        viewBox="0 0 800 450"
        className="w-full h-full relative z-10"
        preserveAspectRatio="xMidYMid meet"
      />
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-slate-900/80 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-700 flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] font-bold tracking-widest text-slate-400">
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500"></span> ORIGIN</div>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></span> DESTINATION</div>
      </div>
    </div>
  );
};

export default WorldMap;
