'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Database } from '@/types/supabase';

type CampsiteType = Database['public']['Enums']['campsite_type'];

export default function SuggestCampsite() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    name_th: '',
    name_en: '',
    region_th: '',
    province_th: '',
    district_th: '',
    type: 'private' as CampsiteType,
    description_th: '',
    lat: '',
    lng: '',
    amenities: [] as string[]
  });

  const amenitiesOptions = ['electricity', 'water', 'toilet', 'shower', 'wifi', 'pet_friendly', 'parking', 'bbq', 'restaurant'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from('campsites').insert([
        {
          name_th: formData.name_th,
          name_en: formData.name_en,
          region_th: formData.region_th,
          province_th: formData.province_th,
          district_th: formData.district_th,
          type: formData.type,
          description_th: formData.description_th,
          amenities: formData.amenities,
          location: `POINT(${formData.lng} ${formData.lat})`,
          is_verified: false
        }
      ]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Telemetry received. Basecamp suggested for verification.' });
      setTimeout(() => router.push('/'), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessage({ type: 'error', text: `Transmission failed: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (name: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(name) 
        ? prev.amenities.filter(a => a !== name) 
        : [...prev.amenities, name]
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono p-4 md:p-8">
      <nav className="max-w-3xl mx-auto mb-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
          <ChevronLeft className="w-4 h-4" /> Back to Terminal
        </Link>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">Module: Contribution_v1.0</span>
      </nav>

      <main className="max-w-3xl mx-auto border border-[var(--border)] p-8 md:p-16">
        <header className="mb-16 border-b border-[var(--border)] pb-8">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Suggest Basecamp</h1>
          <p className="text-[10px] opacity-60 uppercase tracking-widest leading-relaxed">
            Submit new coordinates and data for validation. All entries remain unverified until system audit.
          </p>
        </header>

        {message && (
          <div className={`mb-12 p-4 text-[10px] font-bold uppercase tracking-widest border ${
            message.type === 'success' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 01: Identification */}
          <section className="space-y-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--border)]" /> 01 / Identification
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Name (Thai)*</label>
                <input 
                  required
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs focus:ring-1 focus:ring-black outline-none"
                  placeholder="ชื่อลานกางเต็นท์"
                  value={formData.name_th}
                  onChange={e => setFormData({...formData, name_th: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Name (English)</label>
                <input 
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs focus:ring-1 focus:ring-black outline-none"
                  placeholder="Campsite Name"
                  value={formData.name_en}
                  onChange={e => setFormData({...formData, name_en: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Section 02: Geolocation */}
          <section className="space-y-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--border)]" /> 02 / Geolocation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Region</label>
                <select 
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none appearance-none"
                  value={formData.region_th}
                  onChange={e => setFormData({...formData, region_th: e.target.value})}
                >
                  <option value="">Select Region</option>
                  <option value="เหนือ">เหนือ</option>
                  <option value="กลาง">กลาง</option>
                  <option value="ตะวันตก">ตะวันตก</option>
                  <option value="ตะวันออกเฉียงเหนือ">ตะวันออกเฉียงเหนือ</option>
                  <option value="ใต้">ใต้</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Province</label>
                <input 
                  required
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none"
                  placeholder="จังหวัด"
                  value={formData.province_th}
                  onChange={e => setFormData({...formData, province_th: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">District</label>
                <input 
                  required
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none"
                  placeholder="อำเภอ"
                  value={formData.district_th}
                  onChange={e => setFormData({...formData, district_th: e.target.value})}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Latitude</label>
                <input 
                  required
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none"
                  placeholder="13.7367"
                  value={formData.lat}
                  onChange={e => setFormData({...formData, lat: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Longitude</label>
                <input 
                  required
                  className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none"
                  placeholder="100.5231"
                  value={formData.lng}
                  onChange={e => setFormData({...formData, lng: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Section 03: Data */}
          <section className="space-y-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--border)]" /> 03 / Metadata
            </h2>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Description (Thai)</label>
              <textarea 
                rows={4}
                className="w-full bg-[var(--muted)] border-none p-4 text-xs outline-none resize-none"
                placeholder="รายละเอียดสถานที่..."
                value={formData.description_th}
                onChange={e => setFormData({...formData, description_th: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleAmenity(opt)}
                    className={`text-[9px] uppercase tracking-widest border p-3 transition-colors ${
                      formData.amenities.includes(opt) 
                        ? 'bg-black text-white border-black' 
                        : 'border-[var(--border)] opacity-40 hover:opacity-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary uppercase tracking-[0.3em] text-[10px] py-6 flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? 'Transmitting...' : <><Send className="w-4 h-4" /> Initiate Upload</>}
          </button>
        </form>
      </main>
    </div>
  );
}
