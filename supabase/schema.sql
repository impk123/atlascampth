-- 1. Enable PostGIS for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Create 'profiles' table (synced with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 3. Create 'campsites' table (Using Thai as primary language)
CREATE TYPE campsite_type AS ENUM ('national_park', 'private', 'glamping', 'wild_camping', 'caravan_park');

CREATE TABLE IF NOT EXISTS public.campsites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name_th TEXT NOT NULL,
  name_en TEXT,
  description_th TEXT,
  description_en TEXT,
  province_th TEXT NOT NULL,
  location GEOGRAPHY(POINT) NOT NULL,
  type campsite_type DEFAULT 'private',
  amenities JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT '{}'::text[],
  is_verified BOOLEAN DEFAULT false,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 4. Create 'reviews' table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  campsite_id UUID REFERENCES public.campsites(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  images TEXT[] DEFAULT '{}'::text[]
);

-- 5. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campsites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User can update their own
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Campsites: Public read, Only admins or verified users can create (Simplified for MVP)
CREATE POLICY "Campsites are viewable by everyone." ON public.campsites FOR SELECT USING (true);
CREATE POLICY "Logged in users can suggest campsites." ON public.campsites FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Reviews: Public read, Logged in users can create, Owners can delete/update
CREATE POLICY "Reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews." ON public.reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own reviews." ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews." ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- 6. Helper for updating 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_campsites_modtime
    BEFORE UPDATE ON public.campsites
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
