import { BASE_URL } from '../../../constant/baseURL';
import { GitHubUser, Repository } from '../types/response';


export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  if (!query) return [];
  const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=5`);
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  const data = await response.json();
  return data.items;
};

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
