-- Seed Data for atlascampth (Sample Thai Campsites)

-- 1. Insert sample campsites
INSERT INTO public.campsites (name_th, name_en, province_th, location, type, amenities, description_th)
VALUES
(
  'อุทยานแห่งชาติเขาใหญ่ (ผากล้วยไม้)',
  'Khao Yai National Park (Pha Kluai Mai)',
  'นครราชสีมา',
  ST_GeographyFromText('POINT(101.4081 14.4392)'),
  'national_park',
  '["electricity", "toilets", "showers", "restaurant", "visitor_center"]'::jsonb,
  'ลานกางเต็นท์ยอดนิยมในเขาใหญ่ บรรยากาศร่มรื่น ใกล้น้ำตกผากล้วยไม้ มีโอกาสเห็นกวางและนกเงือก'
),
(
  'ดอยอินทนนท์ (ลานกางเต็นท์ดงสน)',
  'Doi Inthanon (Dong Son Campsite)',
  'เชียงใหม่',
  ST_GeographyFromText('POINT(98.5303 18.5888)'),
  'national_park',
  '["toilets", "showers", "parking", "cold_weather"]'::jsonb,
  'จุดกางเต็นท์บนดอยที่สูงที่สุดในไทย อากาศหนาวเย็นตลอดปี ล้อมรอบด้วยสนเขาเขียวขจี'
),
(
  'สวนผึ้ง ป่าสน (Private)',
  'Suan Phueng Pine Forest',
  'ราชบุรี',
  ST_GeographyFromText('POINT(99.2155 13.5489)'),
  'private',
  '["electricity", "wifi", "cafe", "pet_friendly", "bbq"]'::jsonb,
  'ลานกางเต็นท์เอกชน บรรยากาศส่วนตัว ถ่ายรูปสวยเหมือนอยู่ต่างประเทศ มีสิ่งอำนวยความสะดวกครบครัน'
);

-- Note: Review seeding requires an existing user ID in auth.users.
-- Run the following after you have created your first user:
/*
INSERT INTO public.reviews (campsite_id, user_id, rating, comment)
SELECT 
  id, 
  (SELECT id FROM auth.users LIMIT 1), 
  5, 
  'บรรยากาศดีมากครับ อากาศเย็นสบาย'
FROM public.campsites 
WHERE name_th = 'อุทยานแห่งชาติเขาใหญ่ (ผากล้วยไม้)';
*/
