'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const ProtectedRoute = ({ children }) => {
  const { isConnected, isReconnecting, isConnecting } = useAccount();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only redirect if we are mounted, not connecting, not reconnecting, and not connected.
    if (isMounted && !isConnecting && !isReconnecting && !isConnected) {
      router.push('/');
    }
  }, [isConnected, isConnecting, isReconnecting, router, isMounted]);

  // Show nothing or loading while determining state
  if (!isMounted || isConnecting || isReconnecting) {
    return (
      <div className="preload preload-container">
        <div className="preload-logo" />
      </div>
    );
  }

  // If not connected (and not connecting/reconnecting), we are redirecting, so return null/loader
  if (!isConnected) {
    return null;
  }

  return children;
};

export default ProtectedRoute;