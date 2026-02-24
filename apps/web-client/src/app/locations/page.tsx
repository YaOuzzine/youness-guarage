import type { Metadata } from 'next';
import LocationsContent from './LocationsContent';

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Find Youness Garage premium parking locations near major airports including LAX, SFO, and JFK.',
};

export default function LocationsPage() {
  return <LocationsContent />;
}
