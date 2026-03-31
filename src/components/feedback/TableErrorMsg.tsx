'use client';

import { ServerOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const TableErrorMsg = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const reload = () => {
    if (isOnline) window.location.reload();
  };

  return (
    <div className="mun:flex mun:flex-col mun:items-center">
      <ServerOff size={52} className="mun:text-red-500 mun:mb-6" />
      <h2 className="mun:text-2xl mun:font-semibold mun:text-red-600 mun:mb-3">
        Failed to Load Data
      </h2>
      <p className="mun:text-sm mun:text-muted-foreground mun:mb-6 mun:text-center mun:max-w-md">
        {isOnline
          ? 'Something went wrong. Please try refreshing the page.'
          : "You're currently offline. Please check your internet connection."}
      </p>
      <Button onClick={reload} variant="outline" disabled={!isOnline}>
        {isOnline ? 'Refresh Page' : 'No Connection'}
      </Button>
    </div>
  );
};

export default TableErrorMsg;
