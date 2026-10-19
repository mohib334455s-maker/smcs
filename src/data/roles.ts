import type { RoleDef } from '../types'

export const allPermissions = [
  'مشاهده',
  'ایجاد',
  'ویرایش',
  'تأیید',
  'لغو',
  'برگشت وجه',
  'گزارش‌گیری',
  'مدیریت کاربران',
]

export const roles: RoleDef[] = [
  {
    id: 'super',
    name: 'مدیر کل سیستم',
    nameEn: 'Super Administrator',
    permissions: allPermissions,
  },
  {
    id: 'owner',
    name: 'مالک',
    nameEn: 'Owner',
    permissions: ['مشاهده', 'گزارش‌گیری', 'تأیید'],
  },
  {
    id: 'gm',
    name: 'مدیر عمومی',
    nameEn: 'General Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید', 'گزارش‌گیری'],
  },
  {
    id: 'finance',
    name: 'مدیر مالی',
    nameEn: 'Finance Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید', 'برگشت وجه', 'گزارش‌گیری'],
  },
  {
    id: 'accountant',
    name: 'حسابدار',
    nameEn: 'Accountant',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'گزارش‌گیری'],
  },
  {
    id: 'rent',
    name: 'مدیر کرایه',
    nameEn: 'Rent Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید', 'گزارش‌گیری'],
  },
  {
    id: 'leasing',
    name: 'کارمند اجاره',
    nameEn: 'Leasing Officer',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش'],
  },
  {
    id: 'rest-mgr',
    name: 'مدیر رستورانت',
    nameEn: 'Restaurant Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید', 'گزارش‌گیری'],
  },
  {
    id: 'rest-cash',
    name: 'صندوق‌دار رستورانت',
    nameEn: 'Restaurant Cashier',
    permissions: ['مشاهده', 'ایجاد'],
  },
  {
    id: 'park-mgr',
    name: 'مدیر پارکینگ',
    nameEn: 'Parking Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'لغو', 'گزارش‌گیری'],
  },
  {
    id: 'park-op',
    name: 'اپراتور پارکینگ',
    nameEn: 'Parking Operator',
    permissions: ['مشاهده', 'ایجاد'],
  },
  {
    id: 'hr',
    name: 'مدیر منابع بشری',
    nameEn: 'HR Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید', 'گزارش‌گیری'],
  },
  {
    id: 'maint',
    name: 'مدیر تعمیرات',
    nameEn: 'Maintenance Manager',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش', 'تأیید'],
  },
  {
    id: 'proc',
    name: 'کارمند خرید',
    nameEn: 'Procurement Officer',
    permissions: ['مشاهده', 'ایجاد', 'ویرایش'],
  },
  {
    id: 'tenant',
    name: 'مستأجر',
    nameEn: 'Tenant',
    permissions: ['مشاهده'],
  },
  {
    id: 'auditor',
    name: 'حسابرس',
    nameEn: 'Auditor',
    permissions: ['مشاهده', 'گزارش‌گیری'],
  },
]
