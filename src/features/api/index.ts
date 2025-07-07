import { GitHubUser, Repository } from '../types/response';
import { BASE_URL } from '../../constant/baseURL';

export const fetchUser = async (username: string): Promise<GitHubUser> => {
  if (!username) throw new Error('Username cannot be empty');
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

export const fetchRepos = async (username: string): Promise<Repository[]> => {
  if (!username) return [];
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=12`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};
