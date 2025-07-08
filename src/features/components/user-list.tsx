import { useState } from 'react';
  import { ChevronDown, ChevronRight } from 'lucide-react';
import { GitHubUser } from '../types/response';
import { useRepos } from '../query/useGithubSearch';
import { Repositories } from './repositories';

type UserListProps = {
  users: GitHubUser[];
};

export const UserList = ({ users }: UserListProps) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const {
    data: repositories = [],
    isLoading: reposLoading,
    error: reposError,
  } = useRepos(expandedUser || '');

  if (!users || users.length === 0) {
    return null;
  }

  const handleUserClick = (username: string) => {
    if (expandedUser === username) {
      setExpandedUser(null);
    } else {
      setExpandedUser(username);
    }
  };

  // Check if we should show loading state
  const shouldShowLoading = expandedUser && (reposLoading || (!repositories.length && !reposError));

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6 sm:mb-8 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Similar Users</h3>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => handleUserClick(user.login)}
                className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-lg text-slate-900">{user.login}</p>
                    <div className="flex items-center space-x-4">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {expandedUser === user.login ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expandable Repositories Section */}
              <Repositories
                expandedUser={expandedUser || ''}
                user={user}
                shouldShowLoading={!!shouldShowLoading}
                repositories={repositories}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 