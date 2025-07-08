import { GitBranch, Loader2, Star } from "lucide-react";
import { GitHubUser, Repository } from "../types/response";

type RepositoriesProps = {
  expandedUser: string;
  user: GitHubUser;
  shouldShowLoading: boolean;
  repositories: Repository[];
};

export const Repositories = ({
  expandedUser,
  user,
  shouldShowLoading,
  repositories,
}: RepositoriesProps) => {
  return (
    <div>
      {expandedUser === user.login && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
            <GitBranch className="w-4 h-4 mr-2" />
            Repositories
          </h4>

          {shouldShowLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              <span className="ml-2 text-slate-600">
                Loading repositories...
              </span>
            </div>
          ) : repositories.length > 0 ? (
            <div className="space-y-3">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white cursor-pointer rounded-lg p-4 border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="space-y-3">
                    {/* Repository Name and Link */}
                    <div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-purple-700 hover:text-purple-900 hover:underline block"
                      >
                        {repo.name}
                      </a>
                    </div>

                    {/* Repository Description */}
                    {repo.description && (
                      <div>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {repo.description}
                        </p>
                      </div>
                    )}

                    {/* Repository Metadata */}
                    <div className="flex items-center gap-4 pt-1">
                      {repo.language && (
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {repo.language}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-slate-500">
                        <Star className="w-4 h-4 mr-1.5 text-yellow-500" />
                        <span className="font-medium">
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="ml-1">stars</span>
                      </div>

                      {repo.forks_count > 0 && (
                        <div className="flex items-center text-sm text-slate-500">
                          <GitBranch className="w-4 h-4 mr-1.5" />
                          <span className="font-medium">
                            {repo.forks_count.toLocaleString()}
                          </span>
                          <span className="ml-1">forks</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium mb-1">No public repositories</p>
              <p className="text-sm">
                This user hasn't created any public repositories yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
