import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent parking plans from Youness Garage. Standard, Premium, and VIP tiers with flexible options for every traveler.',
};

export default function PricingPage() {
  return <PricingContent />;
}
