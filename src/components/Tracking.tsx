'use client';

import { useEffect } from 'react';
import { captureUtms } from '@/lib/tracking';

export function Tracking() {
  useEffect(() => {
    captureUtms();
  }, []);
  return null;
}
