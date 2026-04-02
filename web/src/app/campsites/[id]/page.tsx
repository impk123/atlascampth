'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { Tent, MapPin, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Campsite = Tables<'campsites'>;

export default function CampsiteDetail() {
  const params = useParams();
  const [site, setSite] = useState<Campsite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSite() {
      if (!params.id) return;
      const { data, error } = await supabase
        .from('campsites')
        .select('*')
        .eq('id', params.id as string)
        .single();

      if (!error) setSite(data);
      setLoading(false);
    }
    fetchSite();
  }, [params.id]);

  if (loading) return <div className="p-24 uppercase tracking-widest text-[10px] opacity-40 font-mono">Fetching Basecamp Data...</div>;
  if (!site) return <div className="p-24 uppercase tracking-widest text-[10px] font-mono border border-red-500 text-red-500">Spot not found.</div>;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
            <ChevronLeft className="w-4 h-4" /> Back to Explore
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">System Online</span>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Minimal Hero Header */}
        <section className="grid lg:grid-cols-2 border-b border-[var(--border)]">
          <div className="p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] border border-[var(--foreground)] px-2 py-1">
                {site.type?.replace('_', ' ')}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                ID: {site.id.slice(0, 8)}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-none">
              {site.name_th}
            </h1>
            <p className="text-lg opacity-60 uppercase tracking-widest mb-12">
              {site.name_en}
            </p>
            <div className="flex flex-wrap gap-8 items-center border-t border-[var(--border)] pt-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Region</p>
                <p className="text-xs font-bold uppercase">{site.region_th}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Province</p>
                <p className="text-xs font-bold uppercase">{site.province_th}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">District</p>
                <p className="text-xs font-bold uppercase">{site.district_th}</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            {site.images && site.images.length > 0 ? (
              <Image src={site.images[0]} alt={site.name_th} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[var(--muted)] flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-20 text-center px-12">No visual telemetry found for this basecamp.</span>
              </div>
            )}
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto grid md:grid-cols-3">
          {/* Detailed Info */}
          <div className="md:col-span-2 p-8 md:p-16 border-b md:border-b-0 md:border-r border-[var(--border)]">
            <div className="space-y-24">
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-12 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--border)]" /> 01 / Description
                </h2>
                <p className="text-2xl leading-relaxed opacity-90 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                  {site.description_th}
                </p>
              </section>

              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-12 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--border)]" /> 02 / Amenities
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-[var(--border)]">
                  {Array.isArray(site.amenities) && (site.amenities as string[]).map((item, i) => (
                    <div key={i} className="border-r border-b border-[var(--border)] p-6 flex flex-col gap-4 group hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">Item {String(i + 1).padStart(2, '0')}</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="p-8 md:p-16 bg-[var(--muted)] space-y-12">
            <div className="space-y-8">
              <div className="border-b border-[var(--border)] pb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Navigation
                </h3>
                <button className="w-full btn-primary uppercase tracking-widest text-[10px] py-4 flex items-center justify-center gap-3">
                  Open Coordinates
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
                  <Tent className="w-3 h-3" /> Alerts
                </h3>
                <div className="border border-[var(--border)] p-4 text-[9px] uppercase tracking-widest opacity-60 leading-loose">
                  Ensure you check seasonal accessibility before departure. Wild camping requires local permits in some zones.
                </div>
              </div>
            </div>

            <div className="pt-12">
               <div className="aspect-square border border-[var(--border)] flex items-center justify-center text-center p-8">
                  <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 italic">Detailed topographic data coming soon in module v3.0</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-12 px-4 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Tent className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tighter uppercase">atlascampth</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2026 atlascampth / minimal detail view
          </p>
        </div>
      </footer>
    </div>
  );
}
