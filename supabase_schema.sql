-- ════════════════════════════════════════════════════════════════
-- Durga Psychiatric Centre – Supabase Database Schema
-- Run this ENTIRE script in Supabase → SQL Editor → New Query
-- ════════════════════════════════════════════════════════════════

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Patients ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id            UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_code  TEXT        UNIQUE,
  name          TEXT        NOT NULL,
  dob           TEXT,
  gender        TEXT,
  mobile        TEXT        NOT NULL,
  alt_mobile    TEXT,
  address       TEXT,
  city          TEXT        DEFAULT 'Chennai',
  state         TEXT        DEFAULT 'Tamil Nadu',
  pincode       TEXT,
  diagnosis     TEXT        NOT NULL,
  therapy_tmpl  TEXT        DEFAULT 'MANUAL',
  referred_by   TEXT,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Sessions ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id           UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id   UUID        REFERENCES patients(id) ON DELETE CASCADE,
  session_date TIMESTAMPTZ DEFAULT NOW(),
  template     TEXT,
  notes        TEXT,
  therapist    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Auto patient code DPC-0001, DPC-0002 … ───────────────────
CREATE SEQUENCE IF NOT EXISTS patient_seq START 1001;

CREATE OR REPLACE FUNCTION generate_patient_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.patient_code IS NULL THEN
    NEW.patient_code := 'DPC-' || LPAD(nextval('patient_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_patient_code ON patients;
CREATE TRIGGER set_patient_code
  BEFORE INSERT ON patients
  FOR EACH ROW EXECUTE FUNCTION generate_patient_code();

-- ── Auto updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS patients_updated_at ON patients;
CREATE TRIGGER patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Row Level Security (open read/write – clinic is internal) ─
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "patients_all" ON patients;
CREATE POLICY "patients_all" ON patients FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "sessions_all" ON sessions;
CREATE POLICY "sessions_all" ON sessions FOR ALL USING (true) WITH CHECK (true);

-- ── Indexes for fast search ───────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_patients_name    ON patients (name);
CREATE INDEX IF NOT EXISTS idx_patients_mobile  ON patients (mobile);
CREATE INDEX IF NOT EXISTS idx_sessions_patient ON sessions (patient_id);

-- Done!
SELECT 'DPC Database Ready ✓' AS status;
