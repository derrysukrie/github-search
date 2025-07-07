import { useState, useCallback } from "react";
import { Github, AlertCircle } from "lucide-react";
import { useRepos, useUser } from "./features/hooks/useGithubSearch";
import { SearchSection } from "./features/components/search-section";
import { UserSection } from "./features/components/user-section";

function App() {
  const [submittedQuery, setSubmittedQuery] = useState("");

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useUser(submittedQuery);

  const {
    data: repositories = [],
    error: reposError,
    isLoading: reposLoading,
  } = useRepos(submittedQuery);

  const handleSearch = useCallback((query: string) => {
    setSubmittedQuery(query);
  }, []);

  const error = userError || reposError;
  const loading = userLoading || reposLoading;

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
          key={submittedQuery}
          initialQuery={submittedQuery}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg mb-6 sm:mb-8 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base font-medium">
                  {error instanceof Error ? error.message : "An error occurred"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        <UserSection user={user} repositories={repositories} />

        {/* Empty State */}
        {!user && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 text-center py-8 sm:py-12 overflow-hidden">
            <div className="p-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Github className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
                Ready to explore GitHub?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Enter a GitHub username above to discover their profile,
                repositories, and contributions to the open source community.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
