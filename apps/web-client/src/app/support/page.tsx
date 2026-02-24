import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with your Youness Garage parking bookings, shuttle service, billing, and more.',
};

export default function SupportPage() {
  return <SupportContent />;
}
