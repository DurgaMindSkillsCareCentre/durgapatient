import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  || ''
const akey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(url, akey)

// ── Patients ──────────────────────────────────────────────────
export const db = {
  async fetchPatients(search = '') {
    let q = supabase.from('patients').select('*').order('created_at', { ascending: false })
    if (search) q = q.or(`name.ilike.%${search}%,mobile.ilike.%${search}%,diagnosis.ilike.%${search}%,patient_code.ilike.%${search}%`)
    const { data, error } = await q
    if (error) throw error
    return data || []
  },

  async addPatient(form) {
    const { data, error } = await supabase.from('patients').insert([form]).select().single()
    if (error) throw error
    return data
  },

  async updatePatient(id, form) {
    const { data, error } = await supabase.from('patients').update(form).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async deletePatient(id) {
    const { error } = await supabase.from('patients').delete().eq('id', id)
    if (error) throw error
  },

  // ── Sessions ────────────────────────────────────────────────
  async fetchSessions(patientId) {
    const { data, error } = await supabase
      .from('sessions').select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async addSession(session) {
    const { data, error } = await supabase.from('sessions').insert([session]).select().single()
    if (error) throw error
    return data
  },

  async deleteSession(id) {
    const { error } = await supabase.from('sessions').delete().eq('id', id)
    if (error) throw error
  },
}
