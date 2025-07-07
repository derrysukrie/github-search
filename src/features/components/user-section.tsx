import {
  BookOpen,
  Building,
  Calendar,
  ExternalLink,
  GitFork,
  Github,
  LinkIcon,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { formatDate } from "../../utils/format-date";
import { LanguageColors } from "../../constant/languageColors";
import { GitHubUser, Repository } from "../types/response";

type UserSectionProps = {
  user: GitHubUser | undefined;
  repositories: Repository[];
};

export const UserSection = ({ user, repositories }: UserSectionProps) => {
  const getLanguageColor = (language: string) => {
    return (
      LanguageColors[language as keyof typeof LanguageColors] || "bg-gray-500"
    );
  };

  return (
    <div>
      {user && (
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden mb-4 shadow-lg ring-4 ring-white">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {user.name || user.login}
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600">
                      @{user.login}
                    </p>
                  </div>

                  {user.bio && (
                    <p className="text-base sm:text-lg leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl">
                      {user.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-slate-600">
                    {user.company && (
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-lg">
                        <Building className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="truncate">{user.company}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-lg">
                        <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="truncate">{user.location}</span>
                      </div>
                    )}
                    {user.blog && (
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-lg min-w-0">
                        <LinkIcon className="w-4 h-4 mr-2 text-slate-500 flex-shrink-0" />
                        <a
                          href={
                            user.blog.startsWith("http")
                              ? user.blog
                              : `https://${user.blog}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-600 transition-colors truncate"
                        >
                          {user.blog}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center bg-slate-100 px-3 py-1 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="hidden sm:inline">
                        Joined {formatDate(user.created_at)}
                      </span>
                      <span className="sm:hidden">
                        Joined {new Date(user.created_at).getFullYear()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div className="text-center bg-purple-50 p-4 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600">
                        {user.public_repos}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">Repositories</span>
                        <span className="sm:hidden">Repos</span>
                      </div>
                    </div>
                    <div className="text-center bg-blue-50 p-4 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        {user.followers}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Followers
                      </div>
                    </div>
                    <div className="text-center bg-green-50 p-4 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">
                        {user.following}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Following
                      </div>
                    </div>
                    <div className="text-center bg-orange-50 p-4 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-orange-600">
                        {user.public_gists}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 mt-1">
                        Gists
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repositories */}
          {repositories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Recent Repositories
                </h3>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  {repositories.length} shown
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6">
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 flex-shrink-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-semibold truncate mb-2">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-600 transition-colors"
                            >
                              {repo.name}
                            </a>
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {repo.description || "No description available"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                          {repo.language && (
                            <div className="flex items-center min-w-0">
                              <div
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 flex-shrink-0 ${getLanguageColor(
                                  repo.language
                                )}`}
                              ></div>
                              <span className="truncate text-xs">
                                {repo.language}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center">
                            <GitFork className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-slate-100 pt-3">
                        <div className="text-xs text-slate-500">
                          <span className="hidden sm:inline">
                            Updated {formatDate(repo.updated_at)}
                          </span>
                          <span className="sm:hidden">
                            Updated{" "}
                            {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
