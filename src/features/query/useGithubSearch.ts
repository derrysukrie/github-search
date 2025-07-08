import { useQuery } from '@tanstack/react-query';
import { fetchRepos, fetchUser, searchUsers } from '../api';

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
    retry: false,
  });
};

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