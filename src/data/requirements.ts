import type { Requirement } from '../types'

export const requirements: Requirement[] = [
  { id: 'REQ-001', module: 'عمومی', description: 'تعریف سازمان، شعبه، بلاک، طبقه و واحد', priority: 'P0', acceptance: 'ایجاد ساختار فیزیکی بدون تداخل کد واحد' },
  { id: 'REQ-002', module: 'کاربران', description: 'کنترل دسترسی کامل مبتنی بر نقش', priority: 'P0', acceptance: 'کاربر بدون مجوز به بخش‌های حساس دسترسی نداشته باشد' },
  { id: 'REQ-003', module: 'قراردادها', description: 'ایجاد، تأیید و تمدید قرارداد', priority: 'P0', acceptance: 'نسخه و تاریخچه تغییرات قابل مشاهده باشد' },
  { id: 'REQ-004', module: 'کرایه', description: 'صدور صورت‌حساب و پرداخت جزئی', priority: 'P0', acceptance: 'مانده دقیق پس از هر پرداخت' },
  { id: 'REQ-005', module: 'کرایه', description: 'جلوگیری از تراکنش تکراری', priority: 'P0', acceptance: 'پرداخت تکراری با همان کلید رد شود' },
  { id: 'REQ-006', module: 'حسابداری', description: 'ثبت دوطرفه اسناد مالی', priority: 'P0', acceptance: 'بدهکار و بستانکار متوازن باشند' },
  { id: 'REQ-007', module: 'اعلان‌ها', description: 'یادآوری سررسید قابل تنظیم', priority: 'P1', acceptance: 'زمان‌بندی 7/3/0/+3 قابل تغییر باشد' },
  { id: 'REQ-008', module: 'پارکینگ', description: 'ثبت ورود/خروج و بستن شیفت', priority: 'P1', acceptance: 'اختلاف صندوق ثبت شود' },
  { id: 'REQ-009', module: 'رستورانت', description: 'نقطه فروش با محاسبه مالیات و تخفیف', priority: 'P1', acceptance: 'جمع سفارش با مالیات صحیح باشد' },
  { id: 'REQ-010', module: 'گدام', description: 'گردش درخواست تا تطبیق فاکتور', priority: 'P1', acceptance: 'بدون تأیید، سفارش نهایی نشود' },
  { id: 'REQ-011', module: 'پورتال', description: 'داشبورد مستأجر با ایزوله‌سازی داده', priority: 'P1', acceptance: 'داده مستأجر دیگر قابل دسترسی نباشد' },
  { id: 'REQ-012', module: 'تعمیرات', description: 'ثبت و پیگیری درخواست خرابی', priority: 'P1', acceptance: 'اولویت و مهلت قابل گزارش باشد' },
  { id: 'REQ-013', module: 'منابع بشری', description: 'محاسبه و تأیید معاش', priority: 'P2', acceptance: 'کسورات و خالص پرداختی شفاف باشد' },
  { id: 'REQ-014', module: 'نقشه', description: 'نمای دوبعدی وضعیت واحدها', priority: 'P2', acceptance: 'کلیک واحد جزئیات مرتبط را باز کند' },
  { id: 'REQ-015', module: 'موبایل', description: 'رابط واکنش‌گرا برای عملیات کلیدی', priority: 'P1', acceptance: 'جداول و فرم‌ها در موبایل قابل استفاده باشند' },
  { id: 'REQ-016', module: 'پشتیبان', description: 'پشتیبان‌گیری و بازیابی زمان‌بندی‌شده', priority: 'P0', acceptance: 'بازیابی آزمایشی موفق مستند شود' },
  { id: 'REQ-017', module: 'گزارش‌ها', description: 'خروجی فایل از گزارش‌های نمونه یا واقعی', priority: 'P1', acceptance: 'فایل از داده فعلی تولید شود' },
  { id: 'REQ-018', module: 'هوش مصنوعی', description: 'دستیار تحلیلی متصل به لایه گزارش', priority: 'P3', acceptance: 'بدون اتصال مدل، حالت مفهومی مشخص باشد' },
  { id: 'REQ-019', module: 'یکپارچه‌سازی', description: 'آمادگی پیامک، واتساپ و ایمیل', priority: 'P2', acceptance: 'پیکربندی کانال بدون فعال‌سازی اجباری' },
  { id: 'REQ-020', module: 'امنیت', description: 'ثبت تاریخچه برای عملیات حساس', priority: 'P0', acceptance: 'لغو، برگشت وجه و تغییر نقش ثبت شوند' },
]

