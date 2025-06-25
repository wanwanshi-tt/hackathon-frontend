import { useEffect, useState } from 'react';
import { getAuthUser } from '../api/auth';

export interface AuthUser {
  clientPrincipal?: {
    userId: string;
    userDetails: string;
    identityProvider: string;
    userRoles: string[];
  };
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { user, loading };
}
