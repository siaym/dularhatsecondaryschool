'use client'

import { updateSettings } from '@/app/admin/(dashboard)/settings/actions'
import { useState } from 'react'
import { SchoolSettings } from '@/types'
import { Settings, Phone, Mail, MapPin, ExternalLink, MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SettingsForm({ settings }: { settings?: SchoolSettings }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          await updateSettings(formData)
          router.refresh()
        } finally {
          setIsSubmitting(false)
        }
      }} 
      className="space-y-8"
    >
      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <Settings size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">General Information</h2>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="school_name_bn" className="block text-sm font-medium text-gray-700">School Name (Bengali) *</label>
            <input type="text" id="school_name_bn" name="school_name_bn" defaultValue={settings?.school_name_bn || 'দুলারহাট মাধ্যমিক বিদ্যালয়'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="school_name_en" className="block text-sm font-medium text-gray-700">School Name (English)</label>
            <input type="text" id="school_name_en" name="school_name_en" defaultValue={settings?.school_name_en || 'Dularhat Secondary School'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="eiin" className="block text-sm font-medium text-gray-700">EIIN Number</label>
            <input type="text" id="eiin" name="eiin" defaultValue={settings?.eiin || '101297'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="established_year" className="block text-sm font-medium text-gray-700">Established Year</label>
            <input type="number" id="established_year" name="established_year" defaultValue={settings?.established_year || 1963} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <Phone size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Contact Information</h2>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" name="phone" defaultValue={settings?.phone || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email" defaultValue={settings?.email || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="address_bn" className="block text-sm font-medium text-gray-700">Address (Bengali)</label>
            <input type="text" id="address_bn" name="address_bn" defaultValue={settings?.address_bn || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="address_en" className="block text-sm font-medium text-gray-700">Address (English)</label>
            <input type="text" id="address_en" name="address_en" defaultValue={settings?.address_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <ExternalLink size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Social Links</h2>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700">Facebook URL</label>
            <input type="url" id="facebook_url" name="facebook_url" defaultValue={settings?.facebook_url || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700">YouTube URL</label>
            <input type="url" id="youtube_url" name="youtube_url" defaultValue={settings?.youtube_url || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Administration Messages</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="headmaster_message_bn" className="block text-sm font-medium text-gray-700">Headmaster Message (BN)</label>
              <textarea id="headmaster_message_bn" name="headmaster_message_bn" rows={6} defaultValue={settings?.headmaster_message_bn || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
            </div>
            <div className="space-y-2">
              <label htmlFor="headmaster_message_en" className="block text-sm font-medium text-gray-700">Headmaster Message (EN)</label>
              <textarea id="headmaster_message_en" name="headmaster_message_en" rows={6} defaultValue={settings?.headmaster_message_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="chairman_message_bn" className="block text-sm font-medium text-gray-700">Chairman Message (BN)</label>
              <textarea id="chairman_message_bn" name="chairman_message_bn" rows={6} defaultValue={settings?.chairman_message_bn || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
            </div>
            <div className="space-y-2">
              <label htmlFor="chairman_message_en" className="block text-sm font-medium text-gray-700">Chairman Message (EN)</label>
              <textarea id="chairman_message_en" name="chairman_message_en" rows={6} defaultValue={settings?.chairman_message_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving Settings...' : 'Save All Settings'}
        </button>
      </div>
    </form>
  )
}
