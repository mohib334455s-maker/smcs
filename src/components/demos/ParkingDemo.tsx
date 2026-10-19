import { parkingSessions } from '../../data/sample'
import { DataTable } from '../ui/DataTable'
import { WorkflowSteps } from './WorkflowSteps'

export function ParkingDemo() {
  const capacity = { total: 120, occupied: 87, reserved: 8 }
  const free = capacity.total - capacity.occupied - capacity.reserved

  return (
    <div className="space-y-5">
      <WorkflowSteps steps={['ورود موتر', 'ثبت اطلاعات', 'ایجاد بلیت', 'محاسبه فیس', 'دریافت وجه', 'صدور رسید', 'خروج موتر']} />
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'ظرفیت کل', value: capacity.total },
          { label: 'اشغال‌شده', value: capacity.occupied },
          { label: 'رزرو', value: capacity.reserved },
          { label: 'آزاد', value: free },
        ].map((c) => (
          <div key={c.label} className="kpi-tile" data-reveal>
            <p className="text-xs text-[var(--text-muted)]">{c.label}</p>
            <p className="text-2xl font-semibold text-[var(--color-navy)]">{c.value}</p>
          </div>
        ))}
      </div>
      <DataTable
        columns={[
          { key: 'ticket', label: 'بلیت' },
          { key: 'plate', label: 'پلیت' },
          { key: 'type', label: 'تعرفه' },
          { key: 'in', label: 'ورود' },
          { key: 'out', label: 'خروج' },
          { key: 'amount', label: 'مبلغ' },
          { key: 'status', label: 'وضعیت' },
        ]}
        rows={parkingSessions}
      />
    </div>
  )
}
