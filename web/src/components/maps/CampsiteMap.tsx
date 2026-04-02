'use client';

import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '@/lib/supabase';

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcon = () => {
  // @ts-expect-error - Leaflet icon internals
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

interface CampsiteMapProps {
  region?: string;
  province?: string;
  district?: string;
}

export default function CampsiteMap({ region = "ทั้งหมด", province = "ทั้งหมด", district = "ทั้งหมด" }: CampsiteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const fetchMarkers = useCallback(async () => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    let query = supabase
      .from('campsites')
      .select(`id, name_th, province_th, district_th, region_th, location`);

    if (region !== "ทั้งหมด") query = query.eq('region_th', region);
    if (province !== "ทั้งหมด") query = query.eq('province_th', province);
    if (district !== "ทั้งหมด") query = query.eq('district_th', district);

    const { data, error } = await query;

    if (error) return;

    data?.forEach((site) => {
      // Mocking coordinates for MVP visualization
      const siteIdSum = site.id.split('-').join('').split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      const siteLat = 13.7367 + ((siteIdSum % 100) / 100 - 0.5) * 8;
      const siteLng = 100.5231 + ((siteIdSum % 50) / 50 - 0.5) * 5;

      const marker = L.marker([siteLat, siteLng]).addTo(map.current!);
      
      marker.bindPopup(`
        <div class="p-4 font-mono text-[var(--foreground)] bg-[var(--background)] min-w-[200px]">
          <h3 class="font-bold text-sm uppercase mb-1">${site.name_th}</h3>
          <p class="text-[10px] opacity-60 uppercase mb-4">${site.province_th} / ${site.district_th}</p>
          <a href="/campsites/${site.id}" class="inline-block text-[9px] font-bold uppercase tracking-widest border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors no-underline">
            View Details
          </a>
        </div>
      `, {
        className: 'custom-leaflet-popup'
      });

      markersRef.current.push(marker);
    });

    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.current.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 10 });
    } else if (region === "ทั้งหมด") {
      map.current.setView([13.7367, 100.5231], 6);
    }
  }, [region, province, district]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainer.current) return;

    if (!map.current) {
      fixLeafletIcon();
      map.current = L.map(mapContainer.current).setView([13.7367, 100.5231], 6);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map.current);
    }

    fetchMarkers();
  }, [fetchMarkers]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] border border-[var(--border)] overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      <div className="absolute top-4 left-4 bg-[var(--background)] border border-[var(--border)] p-2 text-[10px] font-bold uppercase tracking-widest z-[1000] shadow-sm pointer-events-none">
        discovery layer v2.0 (open source)
      </div>
    </div>
  );
}
