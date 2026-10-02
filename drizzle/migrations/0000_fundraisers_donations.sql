CREATE TABLE public.fundraisers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  category text NOT NULL,
  story text NOT NULL,
  goal integer NOT NULL,
  image_url text,
  organizer text NOT NULL,
  raised integer NOT NULL DEFAULT 0,
  donors integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fundraisers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fundraisers TO authenticated;
GRANT ALL ON public.fundraisers TO service_role;
ALTER TABLE public.fundraisers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view fundraisers" ON public.fundraisers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users create own fundraisers" ON public.fundraisers FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id AND raised = 0 AND donors = 0);
CREATE POLICY "Users delete own fundraisers" ON public.fundraisers FOR DELETE TO authenticated USING (auth.uid() = owner_id);

CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fundraiser_id text NOT NULL,
  donor_id uuid,
  amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  checkout_ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Donors see own donations" ON public.donations FOR SELECT TO authenticated USING (auth.uid() = donor_id);

CREATE POLICY "Public read covers" ON storage.objects FOR SELECT USING (bucket_id = 'covers');
CREATE POLICY "Users upload own covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'covers' AND (storage.foldername(name))[1] = auth.uid()::text);