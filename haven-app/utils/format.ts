export function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\+91)(\d{5})(\d{5})/, '$1 XXXXX$3');
}

export function formatPolicyNumber(planCode: string, workerId: string): string {
  const year = new Date().getFullYear();
  const idSuffix = workerId.split('-').pop() || '000000';
  return `GS-${year}-${planCode.substring(0, 3).toUpperCase()}-${idSuffix}`;
}

export function daysRemaining(targetDate: string): number {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
