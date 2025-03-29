'use client';

import { useEffect } from 'react';
import BetaNotice from '../ui/BetaNotice';

// This component handles client-side-only functionality
export default function ClientLayout({ children }) {
  return (
    <>
      <BetaNotice />
      {children}
    </>
  );
} 