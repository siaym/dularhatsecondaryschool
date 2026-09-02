import { SettingsForm } from '@/components/admin/SettingsForm'
import { createClient } from '@/utils/supabase/server'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  
  // We only ever have one settings row (id = 1)
  const { data: settings } = await supabase
    .from('school_settings')
    .select('*')
    .eq('id', 1)
    .single()

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">School Settings</h1>
        <p className="text-gray-500 mt-1">Manage global school information, contact details, and site configurations.</p>
      </div>
      
      <SettingsForm settings={settings || undefined} />
    </div>
  )
}
