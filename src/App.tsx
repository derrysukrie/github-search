import { useState } from 'react';
import { 
  Search, 
  Github, 
  MapPin, 
  Link as LinkIcon, 
  Building, 
  Calendar,
  Users,
  BookOpen,
  Star,
  GitFork,
  Loader2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchUser = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setUser(null);
    setRepositories([]);

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${searchQuery}`);
      if (!userResponse.ok) {
        throw new Error('User not found');
      }
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${searchQuery}/repos?sort=updated&per_page=12`);
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        setRepositories(reposData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchUser();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-orange-500',
      'C++': 'bg-pink-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      PHP: 'bg-purple-500',
      Ruby: 'bg-red-500',
      Swift: 'bg-orange-400',
      HTML: 'bg-red-400',
      CSS: 'bg-blue-400',
      Vue: 'bg-green-400',
      React: 'bg-cyan-400',
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GitHub User Search
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">Discover GitHub profiles and repositories</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6 sm:mb-8 overflow-hidden">
          <div className="text-center px-4 sm:px-6 pt-8 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">Find GitHub Users</h2>
            <p className="text-base sm:text-lg text-slate-600">
              Enter a GitHub username to explore their profile and repositories
            </p>
          </div>
          <div className="px-4 sm:px-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter GitHub username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 sm:py-4 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    disabled={loading}
                  />
                </div>
              </div>
              <button 
                onClick={searchUser} 
                disabled={loading || !searchQuery.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg mb-6 sm:mb-8 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
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
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{user.name || user.login}</h2>
                      <p className="text-lg sm:text-xl text-slate-600">@{user.login}</p>
                    </div>
                    
                    {user.bio && (
                      <p className="text-base sm:text-lg leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl">{user.bio}</p>
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
                          <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="hover:text-purple-600 transition-colors truncate">
                            {user.blog}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center bg-slate-100 px-3 py-1 rounded-lg">
                        <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="hidden sm:inline">Joined {formatDate(user.created_at)}</span>
                        <span className="sm:hidden">Joined {new Date(user.created_at).getFullYear()}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                      <div className="text-center bg-purple-50 p-4 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-purple-600">{user.public_repos}</div>
                        <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden sm:inline">Repositories</span>
                          <span className="sm:hidden">Repos</span>
                        </div>
                      </div>
                      <div className="text-center bg-blue-50 p-4 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{user.followers}</div>
                        <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Followers
                        </div>
                      </div>
                      <div className="text-center bg-green-50 p-4 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{user.following}</div>
                        <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center mt-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Following
                        </div>
                      </div>
                      <div className="text-center bg-orange-50 p-4 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{user.public_gists}</div>
                        <div className="text-xs sm:text-sm text-slate-600 mt-1">Gists</div>
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
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Recent Repositories</h3>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {repositories.length} shown
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6">
                  {repositories.map((repo) => (
                    <div key={repo.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden">
                      <div className="p-4 sm:p-6 flex-shrink-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold truncate mb-2">
                              <a href={repo.html_url} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="hover:text-purple-600 transition-colors">
                                {repo.name}
                              </a>
                            </h4>
                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {repo.description || 'No description available'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-3">
                          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                            {repo.language && (
                              <div className="flex items-center min-w-0">
                                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 flex-shrink-0 ${getLanguageColor(repo.language)}`}></div>
                                <span className="truncate text-xs">{repo.language}</span>
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
                            <span className="hidden sm:inline">Updated {formatDate(repo.updated_at)}</span>
                            <span className="sm:hidden">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
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

        {/* Empty State */}
        {!user && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 text-center py-8 sm:py-12 overflow-hidden">
            <div className="p-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Github className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">Ready to explore GitHub?</h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Enter a GitHub username above to discover their profile, repositories, and contributions to the open source community.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;