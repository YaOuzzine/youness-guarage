import type { Metadata } from 'next';
import LegalContent from './LegalContent';

export const metadata: Metadata = {
  title: 'Legal Center',
  description:
    'Privacy Policy, Terms of Service, Cookie Policy, and Liability Disclaimer for Youness Garage.',
};

export default function LegalPage() {
  return <LegalContent />;
}
