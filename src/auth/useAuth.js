import { useContext } from 'react';
import { AuthContext } from './contextAuth'

export function useAuth() {
  const value = useContext(AuthContext)

  return value;
}