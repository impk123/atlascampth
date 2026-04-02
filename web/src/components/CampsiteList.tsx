'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import Image from 'next/image';

type Campsite = Tables<'campsites'>;

interface CampsiteListProps {
  region?: string;
  province?: string;
  district?: string;
}

export default function CampsiteList({ region = "ทั้งหมด", province = "ทั้งหมด", district = "ทั้งหมด" }: CampsiteListProps) {
  const [campsites, setCampsites] = useState<Campsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampsites() {
      try {
        setLoading(true);
        let query = supabase
          .from('campsites')
          .select('*')
          .order('name_th');

        if (region !== "ทั้งหมด") query = query.eq('region_th', region);
        if (province !== "ทั้งหมด") query = query.eq('province_th', province);
        if (district !== "ทั้งหมด") query = query.eq('district_th', district);

        const { data, error } = await query;

        if (error) throw error;
        setCampsites(data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCampsites();
  }, [region, province, district]);

  if (loading) return <div className="p-4 uppercase tracking-widest text-xs opacity-40">Loading basecamps...</div>;
  if (error) return <div className="p-4 text-xs uppercase text-red-500 border border-red-500">Error: {error}</div>;

  if (campsites.length === 0) {
    return (
      <div className="py-24 border-t border-[var(--border)] text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">No basecamps found for this selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-[var(--border)]">
      {campsites.map((site) => (
        <Link key={site.id} href={`/campsites/${site.id}`} className="border-r border-b border-[var(--border)] group hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors block">
          <div className="h-64 transition-all duration-500 overflow-hidden relative">
            {site.images && site.images.length > 0 ? (
              <Image src={site.images[0]} alt={site.name_th} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-[var(--muted)] flex items-center justify-center border-b border-[var(--border)]">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-30">No Imagery</span>
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-2xl tracking-tighter uppercase">{site.name_th}</h3>
            </div>
            <div className="mb-6 opacity-40">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{site.region_th} / {site.province_th} / {site.district_th}</p>
            </div>
            <p className="text-sm leading-relaxed opacity-80 mb-8 line-clamp-2">{site.description_th}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {Array.isArray(site.amenities) && (site.amenities as string[]).slice(0, 3).map((amenity, idx) => (
                <span key={idx} className="text-[9px] uppercase tracking-widest border border-current px-2 py-1 opacity-60">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
