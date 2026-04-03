'use client';

import Image from "next/image";
import { Search, Tent, ChevronRight } from "lucide-react";
import CampsiteList from "@/components/CampsiteList";
import ThemeToggle from "@/components/ThemeToggle";
import dynamic from "next/dynamic";
const CampsiteMap = dynamic(() => import("@/components/maps/CampsiteMap"), { ssr: false });
import { useState, useMemo } from "react";
import Link from "next/link";

const REGIONS: Record<string, Record<string, string[]>> = {
  "ทั้งหมด": {},
  "เหนือ": {
    "ทั้งหมด": [],
    "เชียงใหม่": ["ทั้งหมด", "จอมทอง", "แม่ริม", "หางดง"],
    "เพชรบูรณ์": ["ทั้งหมด", "หล่มเก่า", "เขาค้อ"],
    "เชียงราย": ["ทั้งหมด", "แม่สาย", "เมือง"]
  },
  "กลาง": {
    "ทั้งหมด": [],
    "นครราชสีมา": ["ทั้งหมด", "ปากช่อง", "วังน้ำเขียว"],
    "สระบุรี": ["ทั้งหมด", "มวกเหล็ก", "แก่งคอย"]
  },
  "ตะวันตก": {
    "ทั้งหมด": [],
    "กาญจนบุรี": ["ทั้งหมด", "ศรีสวัสดิ์", "สังขละบุรี"],
    "ราชบุรี": ["ทั้งหมด", "สวนผึ้ง", "จอมบึง"],
    "เพชรบุรี": ["ทั้งหมด", "แก่งกระจาน", "ชะอำ"]
  }
};

export default function Home() {
  const [region, setRegion] = useState("ทั้งหมด");
  const [province, setProvince] = useState("ทั้งหมด");
  const [district, setDistrict] = useState("ทั้งหมด");

  const provinces = useMemo(() => {
    return region === "ทั้งหมด" ? ["ทั้งหมด"] : Object.keys(REGIONS[region]);
  }, [region]);

  const districts = useMemo(() => {
    return (region === "ทั้งหมด" || province === "ทั้งหมด") 
      ? ["ทั้งหมด"] 
      : REGIONS[region][province];
  }, [region, province]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tent className="w-6 h-6" />
            <span className="text-lg font-bold tracking-tighter uppercase">atlascampth</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest">
            <a href="#" className="hover:opacity-60 transition-opacity">ค้นหา</a>
            <a href="#" className="hover:opacity-60 transition-opacity">อุทยาน</a>
            <Link href="/suggest" className="hover:opacity-60 transition-opacity">Suggest Spot</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="text-xs font-bold uppercase tracking-widest hover:opacity-60">Login</button>
            <button className="btn-primary text-xs uppercase tracking-widest">Join</button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center border-b border-[var(--border)] bg-[var(--muted)]">
          <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tighter uppercase">
                Discover<br />Thailand<br />Wild
              </h1>
              <p className="text-lg mb-10 max-w-md opacity-80 leading-relaxed">
                Minimalist basecamp discovery. Filter by Region, Province, and District.
              </p>
              
              <div className="flex border border-[var(--foreground)] max-w-md">
                <div className="flex-1 flex items-center px-4 h-12">
                  <Search className="w-4 h-4 mr-3 opacity-40" />
                  <input 
                    type="text" 
                    placeholder="Search location..."
                    className="w-full bg-transparent focus:outline-none text-sm uppercase tracking-wider"
                  />
                </div>
                <button className="bg-[var(--foreground)] text-[var(--background)] px-6 text-xs font-bold uppercase tracking-widest">
                  Find
                </button>
              </div>
            </div>
            <div className="hidden md:block relative h-[40vh] border border-[var(--border)]">
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop"
                alt="Camping in Thailand"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Discovery Filter Bar */}
        <section className="sticky top-16 z-40 bg-[var(--background)] border-b border-[var(--border)] py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Region:</span>
              <select 
                value={region} 
                onChange={(e) => { setRegion(e.target.value); setProvince("ทั้งหมด"); setDistrict("ทั้งหมด"); }}
                className="bg-transparent border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 focus:outline-none hover:border-black appearance-none"
              >
                {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className={`flex items-center gap-2 ${region === "ทั้งหมด" ? "opacity-20" : ""}`}>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Province:</span>
              <select 
                value={province} 
                disabled={region === "ทั้งหมด"}
                onChange={(e) => { setProvince(e.target.value); setDistrict("ทั้งหมด"); }}
                className="bg-transparent border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 focus:outline-none hover:border-black appearance-none disabled:cursor-not-allowed"
              >
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className={`flex items-center gap-2 ${province === "ทั้งหมด" ? "opacity-20" : ""}`}>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">District:</span>
              <select 
                value={district} 
                disabled={province === "ทั้งหมด"}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-transparent border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 focus:outline-none hover:border-black appearance-none disabled:cursor-not-allowed"
              >
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="ml-auto hidden lg:flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold">
              <span className="opacity-40">Path:</span>
              <span className="flex items-center gap-2">
                {region} <ChevronRight className="w-3 h-3 opacity-20" /> 
                {province} <ChevronRight className="w-3 h-3 opacity-20" /> 
                {district}
              </span>
            </div>
          </div>
        </section>

        {/* Discovery Map */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="border border-[var(--border)]">
            <CampsiteMap region={region} province={province} district={district} />
          </div>
        </section>

        {/* Featured Campsites */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-16 border-b border-[var(--border)] pb-8">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Spot Results</h2>
              <p className="opacity-60 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                Filtered: {region} / {province} / {district}
              </p>
            </div>
          </div>
          <CampsiteList region={region} province={province} district={district} />
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Tent className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tighter uppercase">atlascampth</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2026 atlascampth / minimalist discovery v2
          </p>
        </div>
      </footer>
    </div>
  );
}
