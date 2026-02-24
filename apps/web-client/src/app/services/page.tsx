import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Premium garage services from Youness Garage: VIP Valet, EV Charging, and Professional Detailing.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
