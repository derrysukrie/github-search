import { useQuery } from '@tanstack/react-query';
import { fetchRepos, fetchUser } from '../api';

export const useUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username),
    enabled: !!username,
    retry: false,
  });
};

export const useRepos = (username: string) => {
  const { data: user, error: userError } = useUser(username);
  return useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchRepos(username),
    enabled: !!user && !userError,
    retry: false,
  });
}; 