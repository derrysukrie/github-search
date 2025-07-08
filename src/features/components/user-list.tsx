import { useState } from 'react';
import { ChevronDown, ChevronRight, GitBranch, Star, Loader2 } from 'lucide-react';
import { GitHubUser } from '../types/response';
import { useRepos } from '../query/useGithubSearch';

type UserListProps = {
  users: GitHubUser[];
  onUserSelect: (username: string) => void;
};

export const UserList = ({ users, onUserSelect }: UserListProps) => {
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
              {expandedUser === user.login && (
                <div className="border-t border-slate-200 bg-slate-50 p-4">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                    <GitBranch className="w-4 h-4 mr-2" />
                    Repositories
                  </h4>
                  
                  {shouldShowLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                      <span className="ml-2 text-slate-600">Loading repositories...</span>
                    </div>
                  ) : repositories.length > 0 ? (
                    <div className="grid gap-3">
                      {repositories.map((repo) => (
                        <div
                          key={repo.id}
                          className="bg-white cursor-pointer rounded-lg p-3 border border-slate-200 hover:border-purple-300 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                              >
                                {repo.name}
                              </a>
                              {repo.description && (
                                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                  {repo.description}
                                </p>
                              )}
                              <div className="flex items-center space-x-4 mt-2">
                                {repo.language && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {repo.language}
                                  </span>
                                )}
                                <div className="flex items-center text-xs text-slate-500">
                                  <Star className="w-3 h-3 mr-1" />
                                  {repo.stargazers_count}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <GitBranch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No public repositories found</p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 