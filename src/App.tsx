import { useState, useCallback } from "react";
import { Github } from "lucide-react";
import {
  useRepos,
  useUser,
  useSearchUsers,
  SearchSection,
  UserSection,
  EmptyState,
  Error,
  UserList,
} from "./features/home";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useUser(submittedQuery);

  const {
    data: searchedUsers,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchUsers(searchQuery);

  const {
    data: repositories = [],
    error: reposError,
    isLoading: reposLoading,
  } = useRepos(submittedQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSubmittedQuery("");
  }, []);

  const error = userError || reposError || searchError;
  const loading = userLoading || reposLoading || searchLoading;

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
                <p className="text-xs sm:text-sm text-slate-600">
                  Discover GitHub profiles and repositories
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Section */}
        <SearchSection
          key={searchQuery}
          initialQuery={searchQuery}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error State */}
        <Error error={error} />

        {/* User Search Results */}
        {searchedUsers && searchedUsers.length > 0 && (
          <UserList users={searchedUsers} />
        )}

        {/* User Profile */}
        {user && <UserSection user={user} repositories={repositories} />}

        {/* Empty State */}
        <EmptyState
          user={!!user || !!(searchedUsers && searchedUsers.length > 0)}
          loading={loading}
          error={!!error}
        />
      </main>
    </div>
  );
}

export default App;
