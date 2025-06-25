import axios from 'axios';
import type { AuthUser } from '../hooks/useAuthUser';

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const res = await axios.get('/.auth/me');
    return res.data;
  } catch {
    return null;
  }
}
