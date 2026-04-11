# 🏥 Durga Psychiatric Centre – Patient Records System
## Complete Deployment Guide

**Created for:** D. Durga | DPN, DAHM, BBA, MBA, MSW | Founder & CEO, DPC Chennai

---

## What You Get
- Patient records: Name, Address, Mobile, Diagnosis + more
- 32 therapy templates including LGBTQ+, Porn Addiction, PE, ED, Pre/Postmarital, Couple, Elderly, Postpartum, etc.
- Add / Edit / Delete / Search patients – fully accessible by psychologist
- Session notes per patient with structured clinical templates
- Admin panel with CSV export
- D. Durga profile photo in header with credentials
- Mobile-responsive (works perfectly on phone)
- Permanent database via Supabase (free)

---

## STEP 1 — Set Up Free Database (Supabase) [5 minutes]

1. Go to **https://supabase.com**
2. Click **"Start your project"** → Sign up with Google (free)
3. Click **"New Project"**
   - Name: `dpc-patient-records`
   - Database Password: Choose a strong password (save it!)
   - Region: **Southeast Asia (Singapore)** ← closest to Chennai
   - Click **Create new project** (wait ~2 minutes)

4. Once ready, go to: **SQL Editor** (left sidebar → icon that looks like `</>`
5. Click **"New Query"**
6. **Copy the ENTIRE contents** of `supabase_schema.sql` (file included in this package)
7. Paste it and click **"Run"** (green button)
8. You should see: `DPC Database Ready ✓`

9. Go to **Settings → API** (gear icon in left sidebar)
10. Copy these two values:
    - **Project URL** → looks like `https://abcdefgh.supabase.co`
    - **anon public** key → long string starting with `eyJ...`

---

## STEP 2 — Configure Your App [2 minutes]

1. Open the `.env.example` file (in the downloaded zip)
2. **Rename it** to `.env` (remove `.example`)
3. Fill in your values:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...your-key-here

VITE_PSY_PASS=YourPsychologistPassword
VITE_ADMIN_PASS=YourAdminPassword
```

4. Save the file

---

## STEP 3 — Deploy to Netlify [5 minutes]

### Option A: Drag and Drop (Easiest!)

1. Open your **Terminal** (Mac/Linux) or **Command Prompt** (Windows)
2. Go into the project folder:
   ```
   cd dpc-patient-records
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Build the app:
   ```
   npm run build
   ```
   This creates a `dist/` folder.

5. Go to **https://netlify.com** → Sign up (free)
6. On your dashboard, find the box that says **"Drag and drop your site folder here"**
7. Drag the **`dist/`** folder into that box
8. Your site goes live instantly! ✅
9. You get a URL like `https://random-name-123.netlify.app`

### Option B: GitHub (Recommended for auto-updates)

1. Create a free account at **https://github.com**
2. Upload the project folder to a new GitHub repository
3. Go to Netlify → **"Add new site" → "Import from Git"**
4. Connect GitHub → Select your repository
5. Build settings (Netlify auto-detects from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in **Netlify → Site Settings → Environment Variables**:
   - Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PSY_PASS`, `VITE_ADMIN_PASS`
7. Click **Deploy** → Your site is live!

---

## STEP 4 — Custom Domain (Optional, Free!)

1. In Netlify → **Domain Management → Add custom domain**
2. You can use: `dpc-records.netlify.app` (free) or your own domain

---

## Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Psychologist | `psychologist` | Your `VITE_PSY_PASS` value |
| Admin (D. Durga) | `admin` | Your `VITE_ADMIN_PASS` value |

**Psychologist Access:** Add, Edit, Delete, Search all patients + Session notes
**Admin Access:** Everything + Export CSV + View credentials panel

---

## Therapy Templates Included (32 Total)

### General (18)
Manual · CBT · DBT · ACT · MBCT · EMDR · Person-Centered · Psychodynamic · SFBT · Gestalt · Narrative · IPT · REBT · EFT · CPT · Motivational Interviewing · Behavioral Activation · Grief · Child/Adolescent · Addiction

### Relationship (5)
Family Systems · Couples Therapy · Premarital · Postmarital · Pregnant & Postpartum

### Sexual Health (6)
LGBTQ+ Affirmative · Sexual Health & Intimacy · Premature Ejaculation · Erectile Dysfunction · Porn Addiction · Masturbation Addiction

### Specialty (2)
Elderly/Geriatric · Substance Use & Addiction

---

## Supabase Free Tier Notes

✅ Free forever (no credit card needed)
✅ 500 MB database storage (enough for thousands of patients)
✅ Unlimited API requests
⚠️ Free projects **pause after 1 week of inactivity** (no one visits the site)
   → Just visit the site once a week to keep it active
   → Or upgrade to $25/month Pro plan for no pausing

---

## Support & Contact

Durga Psychiatric Centre | Chennai
📞 +91 93422 65841 | +91 73959 44527
🌐 www.durgacounselingcentre.com | www.durgamindskillcare.in
